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
import Nat "mo:base/Nat";
import Array "mo:base/Array";

actor class ExpLink() = this {

  
  let tree = RBTree.RBTree<Text, b.Biodata>(Text.compare);
  let expTree = RBTree.RBTree<Text, Buffer.Buffer<u.Experience>>(Text.compare);
  let approvalTree = RBTree.RBTree<Text, Buffer.Buffer<Aproval.ExperienceRequest>>(Text.compare);

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
                    approvalTree.put(principal_company_id, list);
                  };
                  case(?approvals){
                    approvals.add(new_request);
                    approvalTree.put(principal_company_id, approvals);
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
    principal_user_id:Text;
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
                // var updated:?Aproval.ExperienceRequest = ?{
                //   data = res.data;
                //   status = status;
                // };
                // var new_aprovals : AssocList.AssocList<Text, Aproval.ExperienceRequest> = List.nil();
                // new_aprovals := AssocList.replace<Text, Aproval.ExperienceRequest>(new_aprovals, principal_user_id, Text.equal, updated).0;
                // var company = #Company{
                //     name=comp.name;
                //     email=comp.email;
                //     profile_pic=comp.profile_pic;
                //     principal_id=comp.principal_id;
                //     aprovals=new_aprovals;
                // };
                // tree.put(principal_company_id, company); 
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
      case (?res) {Buffer.toArray(res)}
    }
  };
  public shared func get_companies():async util.Response<[b.Biodata]> {
    var result:Buffer.Buffer<b.Biodata> = Buffer.Buffer(5);
    for (entry in tree.entries()){
      switch(entry.1.role) {
          case("Company") {
            result.add(entry.1);
          };
          case("User"){ };
          case(_){ };
        };
      };
    #Ok(Buffer.toArray(result));
  };
};
