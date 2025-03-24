import Text "mo:base/Text";
import u "./User";
import c "./Company";
import b "./Biodata";
import util "./Util";
import RBTree "mo:base/RBTree";
import Time "mo:base/Time";
import AssocList "mo:base/AssocList";
import List "mo:base/List";
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
                aprovals=null;
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
                var new_request:?Aproval.ExperienceRequest = ?{
                      status=#Pending;
                      data={
                        position=position;
                        description=description;
                        start_date=start_date;
                        end_date=end_date;
                      };
                };
                var new_aprovals : AssocList.AssocList<Text, Aproval.ExperienceRequest> = List.nil();
                new_aprovals := AssocList.replace<Text, Aproval.ExperienceRequest>(new_aprovals, principal_user_id, Text.equal, new_request).0;
                var company = #Company{
                    name=comp.name;
                    email=comp.email;
                    profile_pic=comp.profile_pic;
                    principal_id=comp.principal_id;
                    aprovals=new_aprovals;
                };

                tree.put(principal_company_id, company); 
          };
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
        switch(comp) {
          case(#User(comp)) { return #Err("Not a company!") };
          case(#Company(comp)){
            var res = AssocList.find<Text, Aproval.ExperienceRequest>(comp.aprovals,principal_user_id, Text.equal);
            switch(res) {
              case(null) { return #Err("Request not found!") };
              case(?res) { 
                var updated:?Aproval.ExperienceRequest = ?{
                  data = res.data;
                  status = status;
                };
                var new_aprovals : AssocList.AssocList<Text, Aproval.ExperienceRequest> = List.nil();
                new_aprovals := AssocList.replace<Text, Aproval.ExperienceRequest>(new_aprovals, principal_user_id, Text.equal, updated).0;
                var company = #Company{
                    name=comp.name;
                    email=comp.email;
                    profile_pic=comp.profile_pic;
                    principal_id=comp.principal_id;
                    aprovals=new_aprovals;
                };
                tree.put(principal_company_id, company); 
              };
            };
          }
        };
      };
    };

    #Ok(null);
  };
  public shared func get_experience_request({
    principal_user_id:Text;
  // }):async util.Response<Aproval.ExperienceRequest> {
  }):async util.Response<Null> {
    #Ok(null);
  };
};
