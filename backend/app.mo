// Use this token for testing purposes only!
// Please visit https://github.com/dfinity/ICRC-1 to find
// the latest version of the ICP token standards.

import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Buffer "mo:base/Buffer";
import Principal "mo:base/Principal";
import Option "mo:base/Option";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Nat8 "mo:base/Nat8";
import Nat64 "mo:base/Nat64";
import Text "mo:base/Text";
import u "./User";
import c "./Company";
import b "./Biodata";
import util "./Util";
import RBTree "mo:base/RBTree";

actor class Tokenmania() = this {

  let user_tree = RBTree.RBTree<Text, u.User>(Text.compare);
  let company_tree = RBTree.RBTree<Text, c.Company>(Text.compare);

  public shared func register_user({
    principal_id: Text;
    username: Text;
    email: Text;
    profile_pic: Blob;
  }): async util.Response<Null> {
    let result = b.validate_biodata({username; email; profile_pic}); 
    switch(result){
      case(#Err(error)){
        return #Err(error);
      };
      case (#Ok(_)){
        if (company_tree.get(principal_id) != null){
          return #Err("this identity is already registered as company!");
        };
        user_tree.put(principal_id, {
            name=username;
            email=email;
            profile_pic=profile_pic;
            principal_id=principal_id;
            experiences=[];
        });
        #Ok(null);
      };
    }
  };

  public shared func register_company({
    principal_id: Text;
    username: Text;
    email: Text;
    profile_pic: Blob;
  }): async util.Response<Null> {
    let result = b.validate_biodata({username; email; profile_pic}); 
    switch(result){
      case(#Err(error)){
        return #Err(error);
      };
      case (#Ok(_)){
        if (user_tree.get(principal_id) != null){
          return #Err("this identity is already registered as user!");
        };
        company_tree.put(principal_id, {
            name=username;
            email=email;
            profile_pic=profile_pic;
            principal_id=principal_id;
            aprovals=[];
        });
        #Ok(null);
      };
    }
  };

  public shared func get_user({principal_id: Text;}) : async util.Response<?u.User> {
    let user = user_tree.get(principal_id);
    #Ok(user);
  };

  public shared func get_company({principal_id: Text;}) : async util.Response<?c.Company> {
    let company = company_tree.get(principal_id);
    #Ok(company);
  };
};
