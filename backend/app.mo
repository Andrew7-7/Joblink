import Text "mo:base/Text";
import b "./Biodata";
import RBTree "mo:base/RBTree";
import Time "mo:base/Time";
import Buffer "mo:base/Buffer";
import Random = "mo:base/Random";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Bool "mo:base/Bool";

actor class ExpLink() = this {

  public type Experience = {
        principal_user_id:Text;
        position: Text;
        start_date: Time.Time;
        end_date: ?Time.Time;
        description: Text;
  };

  public type Status = {
        #Rejected;
        #Pending;
        #Accepted;
    };

    public type ExperienceRequest = {
        status: Status;
        data: Experience;
    };
  
  let tree = RBTree.RBTree<Text, b.Biodata>(Text.compare);
  let expTree = RBTree.RBTree<Text, [Experience]>(Text.compare);
  let approvalTree = RBTree.RBTree<Text, [ExperienceRequest]>(Text.compare);

  public shared func seed(): async b.Response<Null>{
    var users:[Text] = ["Andrew","Charles Darwin","Anthony","Freddy","Alex Kurniawawn"];
    var companies:[Text] = ["Google","Twitter","IBM","Meta","Microsoft", "OpenAI", "Nvidia", "Netflix"];
    var exps:Buffer.Buffer<Text> = Buffer.fromArray<Text>(["Frontend Developer", "Backend Engineer", "AI Engineer", "Cloud Solution Technician", "Data Analyst", "DevOps Engineer", "Project Manager"]);
    var desc:Buffer.Buffer<Text> = Buffer.fromArray<Text>([
      "Designs, builds, and optimizes user-friendly web interfaces.",
      "Develops, maintains, and optimizes server-side application logic.",
      "Builds, trains, and deploys machine learning models efficiently.",
      "Implements, manages, and secures cloud-based infrastructure solutions.",
      "Collects, processes, and interprets data for actionable insights.",
      "Automates, integrates, and manages CI/CD and cloud infrastructure.",
      "Plans, coordinates, and executes projects within defined constraints."
    ]);
    var num:Nat = 1; 
    for (name in users.vals()){
      tree.put(Nat.toText(num),{
        name=name;
        email=Text.replace(Text.toLowercase(name),#char ' ', ".") # "@gmail.com";
        profile_pic="/User.png";
        principal_id=Nat.toText(num);
        role = "User";
      });
      let random = Random.Finite(await Random.blob());
      var list = Buffer.Buffer<Experience>(5);
      var list_app = Buffer.Buffer<ExperienceRequest>(5);
      var number = random.range(32);
        switch(number){
          case (null){};
          case (?rand){
            var number = rand % exps.size();
            var exp = {
              position=exps.get(number);
              principal_user_id=Nat.toText(num + 5);
              description=desc.get(number);
              start_date=Time.now() /1000000;
              end_date=null;
            };
            var approval = {
              data=exp;
              status=#Accepted;
            };
            list_app.add(approval);            
            list.add(exp);
            expTree.put(Nat.toText(num), Buffer.toArray(list));
            approvalTree.put(Nat.toText(num + 5),Buffer.toArray(list_app));
          };
        };
    
      num += 1;
    };
    for (name in companies.vals()){
      tree.put(Nat.toText(num),{
        name=name;
        email=Text.replace(Text.toLowercase(name),#char ' ', ".") # "@email.com";
        profile_pic="/Company.png";
        principal_id=Nat.toText(num);
        role = "Company";
      });
      num += 1;
    };
    #Ok(null);
  };

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
  }): async b.Response<Null> {
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
    
  }):async b.Response<Null> {
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
  }):async b.Response<Null>{
    var comp = tree.get(principal_company_id);

    switch(comp) {
      case(null) { return #Err("Company not found!") };
      case(?comp) {
        switch(comp.role) {
          case("User") { return #Err("Not a company!") };
          case("Company") { 
                var new_request:ExperienceRequest = {
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
                    var list = Buffer.Buffer<ExperienceRequest>(4);
                    list.add(new_request);
                    approvalTree.put(principal_company_id, Buffer.toArray(list));
                  };
                  case(?approvals){
                    var list = Buffer.fromArray<ExperienceRequest>(approvals);
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
    status: Status;
  }):async b.Response<Null>{
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
                var updated:ExperienceRequest = {
                  data = res.get(index).data;
                  status = status;
                };
                var list = Buffer.fromArray<ExperienceRequest>(res);
                list.put(index, updated);
                approvalTree.put(principal_company_id, Buffer.toArray(list));
                switch(status) {
                  case(#Accepted) { 
                    var exp = expTree.get(res.get(index).data.principal_user_id);
                    switch(exp) {
                      case(?exp) { 
                            var list = Buffer.fromArray<Experience>(exp);
                            var new_exp = res.get(index).data;
                            list.add({
                              principal_user_id=principal_company_id;
                              position=new_exp.position;
                              start_date=new_exp.start_date;
                              end_date=new_exp.end_date;
                              description=new_exp.description;
                            });
                            expTree.put(res.get(index).data.principal_user_id, Buffer.toArray(list));
                       };
                      case(null) { 
                            var list = Buffer.Buffer<Experience>(5);
                            var new_exp = res.get(index).data;
                            list.add({
                              principal_user_id=principal_company_id;
                              position=new_exp.position;
                              start_date=new_exp.start_date;
                              end_date=new_exp.end_date;
                              description=new_exp.description;
                            });
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
  }):async [ExperienceRequest] {
    var res = approvalTree.get(principal_company_id);
    switch(res){
      case (null) { [] };
      case (?res) { res }
    }
  };
  public shared func get_company_user({
    principal_company_id:Text;
    is_active:Bool
  }):async [ExperienceRequest] {
    var res = approvalTree.get(principal_company_id);
    switch(res){
      case (null) { [] };
      case (?res) {
          Array.filter<ExperienceRequest>(res, func x = (x.data.end_date == null) == is_active and x.status == #Accepted);
      };
    }
  };

  public shared func feed({principal_user_id:Text}): async [Experience] {
    var result:Buffer.Buffer<Experience> = Buffer.Buffer(5);
    for (entry in expTree.entries()){
      var list = Buffer.fromArray<Experience>(entry.1);
      for (i in Iter.range(0, list.size()-1)){
        result.add(list.get(i));
      }
    };
    result.filterEntries(func(_,x) = x.principal_user_id != principal_user_id);
    result.sort(func (a, b) = Nat.compare(Int.abs(b.start_date),Int.abs(a.start_date)));
    Buffer.toArray(result);
  };

  public shared func get_user_experiences({principal_user_id:Text}): async [Experience] {
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
