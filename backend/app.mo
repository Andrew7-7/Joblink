import Text "mo:base/Text";
import u "./Experience";
import b "./Biodata";
import util "./Util";
import RBTree "mo:base/RBTree";
import Time "mo:base/Time";
import Buffer "mo:base/Buffer";
import Aproval "Aproval";
import Random = "mo:base/Random";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Bool "mo:base/Bool";

actor class ExpLink() = this {
  
  let tree = RBTree.RBTree<Text, b.Biodata>(Text.compare);
  let expTree = RBTree.RBTree<Text, [u.Experience]>(Text.compare);
  let approvalTree = RBTree.RBTree<Text, [Aproval.ExperienceRequest]>(Text.compare);

  public func generateCode():async Text{
      let random = Random.Finite(await Random.blob());
      var numbers : [var Nat] = Array.init<Nat>(6, 0);

      for (i in Iter.range(0, 5)){
        var num = random.range(32);
        switch(num){
          case (null){};
          case (?num){numbers[i] := num % 10};
        };
      };
      var a:Text = "";
      for (i in Iter.range(0,5)){
          a := a # Nat.toText(numbers[i]);
      };
      a
  };

  public shared func register({
    principal_id: Text;
    username: Text;
    email: Text;
    profile_pic: Text;
    role: b.Role;
  }): async util.Response<Null> {
    let result = b.validate_biodata({username; email; profile_pic}); 
    switch(result){
      case(#Err(error)){
        return #Err(error);
      };
      case (#Ok(_)){
        if (tree.get(principal_id) != null){
          return #Err("user or company already exists");
        };
        var newRole = "";
        switch(role){
          case (#UserRole) {newRole := "User";};
          case (#CompanyRole) {newRole := "Company";};
        };
        tree.put(principal_id, {
                name=username;
                email=email;
                profile_pic=profile_pic;
                principal_id=principal_id;
                role = newRole;
        });
        #Ok(null);
      };
    }
  };

  public func get_user({principal_id: Text;}) : async ?b.Biodata {
    let user = tree.get(principal_id);
    user
  };

  public shared func update_profile({
    principal_id: Text;
    username: Text;
    email: Text;
    profile_pic: Text;
    
  }):async util.Response<Null> {
    let result = b.validate_biodata({username; email; profile_pic}); 
    switch(result) {
      case(#Err(error)){
        return #Err(error);
      };
      case(#Ok(_)){
        var result:?b.Biodata = tree.get(principal_id);
        switch(result) {
          case(null) { return #Err("Not found!") };
          case(?result) {
            tree.put(principal_id,{
                name=username;email=email;profile_pic=profile_pic;principal_id=principal_id;role=result.role;
            });
            #Ok(null);
          };
        };
      };
    };
    
  };

  public shared func create_experience({
    principal_user_id: Text;
    principal_company_id: Text;
    position: Text;
    start_date: Time.Time;
    end_date: ?Time.Time;
    description: Text;
  }):async util.Response<Null>{
    var comp = tree.get(principal_company_id);

    switch(comp) {
      case(null) { return #Err("Company not found!") };
      case(?comp) {
        switch(comp.role) {
          case("User") { return #Err("Not a company!") };
          case("Company") { 
                var new_request:Aproval.ExperienceRequest = {
                      status=#Pending;
                      data={
                        principal_user_id=principal_user_id;
                        position=position;
                        description=description;
                        start_date=start_date;
                        end_date=end_date;
                      };
                };
                var approvals = approvalTree.get(principal_company_id);
                switch(approvals){
                  case(null){
                    var list = Buffer.Buffer<Aproval.ExperienceRequest>(4);
                    list.add(new_request);
                    approvalTree.put(principal_company_id, Buffer.toArray(list));
                  };
                  case(?approvals){
                    var list = Buffer.fromArray<Aproval.ExperienceRequest>(approvals);
                    list.add(new_request);
                    approvalTree.put(principal_company_id, Buffer.toArray(list));
                  }
                }
          };
          case(_) { return #Err("Role invalid")};
        };
      };
    };
    #Ok(null);
  };
  public shared func update_experience_request({
    principal_company_id:Text;
    index:Nat;
    status: Aproval.Status;
  }):async util.Response<Null>{
    var comp = tree.get(principal_company_id);
    switch(comp){
      case(null) { return #Err("Company not found!") };
      case(?comp) {
        switch(comp.role) {
          case("User") { return #Err("Not a company!") };
          case("Company"){
            var res = approvalTree.get(principal_company_id);
            switch(res) {
              case(null) { return #Err("Request not found!") };
              case(?res) { 
                if (index >= res.size()){
                  return #Err("Index invalid!")
                };
                var updated:Aproval.ExperienceRequest = {
                  data = res.get(index).data;
                  status = status;
                };
                var list = Buffer.fromArray<Aproval.ExperienceRequest>(res);
                list.put(index, updated);
                approvalTree.put(principal_company_id, Buffer.toArray(list));
                switch(status) {
                  case(#Accepted) { 
                    var exp = expTree.get(res.get(index).data.principal_user_id);
                    switch(exp) {
                      case(?exp) { 
                            var list = Buffer.fromArray<u.Experience>(exp);
                            list.add(res.get(index).data);
                            expTree.put(res.get(index).data.principal_user_id, Buffer.toArray(list));
                       };
                      case(null) { 
                            var list = Buffer.Buffer<u.Experience>(5);
                            list.add(res.get(index).data);
                            expTree.put(res.get(index).data.principal_user_id, Buffer.toArray(list));
                      };
                    };
                  };
                  case(_){}
                };
              };
            };
          };
          case(_) { return #Err("Invalid role")}
        };
      };
    };

    #Ok(null);
  };
  public shared func get_company_experience_request({
    principal_company_id:Text;
  }):async [Aproval.ExperienceRequest] {
    var res = approvalTree.get(principal_company_id);
    switch(res){
      case (null) { [] };
      case (?res) { res }
    }
  };
  public shared func get_company_user({
    principal_company_id:Text;
    is_active:Bool
  }):async [Aproval.ExperienceRequest] {
    var res = approvalTree.get(principal_company_id);
    switch(res){
      case (null) { [] };
      case (?res) {
          Array.filter<Aproval.ExperienceRequest>(res, func x = (x.data.end_date == null) == is_active and x.status == #Accepted);
      };
    }
  };

  public shared func feed(): async [u.Experience] {
    var result:Buffer.Buffer<u.Experience> = Buffer.Buffer(5);
    for (entry in expTree.entries()){
      for (i in Iter.range(0, entry.1.size()-1)){
        result.add(entry.1.get(i));
      }
    };
    result.sort(func (a, b) = Nat.compare(Int.abs(b.start_date),Int.abs(a.start_date)));
    Buffer.toArray(result);
  };

  public shared func get_user_experiences({principal_user_id:Text}): async [u.Experience] {
    var result = expTree.get(principal_user_id);
    switch(result) {
      case(?result) { result };
      case(null) { [] };
    };
  };

  public shared func get_companies():async [b.Biodata] {
    var result:Buffer.Buffer<b.Biodata> = Buffer.Buffer(5);
    for (entry in tree.entries()){
      switch(entry.1.role) {
          case("Company") {
            result.add(entry.1);
          };
          case(_){ };
        };
      };
    Buffer.toArray(result)
  };
};
