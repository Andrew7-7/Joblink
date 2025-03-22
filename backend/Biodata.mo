import Text "mo:base/Text";
import Blob "mo:base/Blob";
import util "./Util";
module {
    public type Biodata = {
        principal_id: Text;
        name: Text;
        email: Text;
        profile_pic: Blob;
    };
    public func validate_biodata({
        username: Text;
        email: Text;
        profile_pic: Blob;
    }): util.Response<Null>{
        if (username.size() < 1){
            return #Err("username cant be empty!");
        };
        if (Text.endsWith(email,#text "@gmail.com") == false){
            return #Err("email must ends with @gmail.com!");
        };
        if (profile_pic.size() < 1){
            return #Err("you must have a profile picture");
        };
        return #Ok(null);
    };
}