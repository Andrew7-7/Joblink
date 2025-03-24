import Text "mo:base/Text";
import u "./User";
import c "./Company";
import b "./Biodata";
import util "./Util";
import RBTree "mo:base/RBTree";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Aproval "Aproval";

actor class Tokenmania() = this {

  type Entity = {
    #User:u.User;
    #Company:c.Company;
  };
  let tree = RBTree.RBTree<Text, Entity>(Text.compare);

  public shared func register({
    principal_id: Text;
    username: Text;
    email: Text;
    profile_pic: Blob;
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
        switch(role) {
          case(#UserRole) { 
              tree.put(principal_id, #User{
                name=username;
                email=email;
                profile_pic=profile_pic;
                principal_id=principal_id;
                experiences=[];
              });
           };
          case(#CompanyRole) { 
            tree.put(principal_id, #Company{
                name=username;
                email=email;
                profile_pic=profile_pic;
                principal_id=principal_id;
                aprovals=[];
              });
          };
        };
        #Ok(null);
      };
    }
  };

  public shared func get({principal_id: Text;}) : async util.Response<?Entity> {
    let user = tree.get(principal_id);
    #Ok(user);
  };

  public shared func update_profile({
    principal_id: Text;
    username: Text;
    email: Text;
    profile_pic: Blob;
  }):async util.Response<Null> {
    let result = b.validate_biodata({username; email; profile_pic}); 
    switch(result) {
      case(#Err(error)){
        return #Err(error);
      };
      case(#Ok(_)){
        var result:?Entity = tree.get(principal_id);
        switch(result) {
          case(null) { return #Err("Not found!") };
          case(?result) {
            switch(result) {
              case(#User(user)) { 
                tree.put(principal_id, #User{
                  name=username;email=email;profile_pic=profile_pic;principal_id=principal_id;experiences=user.experiences;
                });
              };
              case(#Company(user)) {
                tree.put(principal_id, #Company{
                  name=username;email=email;profile_pic=profile_pic;principal_id=principal_id;aprovals=user.aprovals;
                });
               };
            };
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
        switch(comp) {
          case(#User(comp)) { return #Err("Not a company!") };
          case(#Company(comp)) { 
              var company = #Company{
                  name=comp.name;
                  email=comp.email;
                  profile_pic=comp.profile_pic;
                  principal_id=comp.principal_id;
                  aprovals=Array.append<Aproval.ExperienceRequest>(comp.aprovals, [{
                    principal_user_id=principal_user_id;
                    status = #Pending;
                    data= {
                      position=position;
                      description=description;
                      start_date=start_date;
                      end_date=end_date;
                    };
                  }]);
              };
              tree.put(principal_company_id, company);
              #Ok(null);
          };
        };
      };
    };

  };
};
