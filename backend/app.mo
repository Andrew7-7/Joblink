import Text "mo:base/Text";
import u "./User";
import c "./Company";
import b "./Biodata";
import util "./Util";
import RBTree "mo:base/RBTree";
import Company "Company";

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
};
