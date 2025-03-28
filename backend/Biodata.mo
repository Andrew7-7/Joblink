import Text "mo:base/Text";
module {
    public type Response<T> = {
        #Ok : T;
        #Err : Text;
    };
    public type Biodata = {
        principal_id: Text;
        name: Text;
        email: Text;
        profile_pic: Text;
        role: Text;
    };
    public type Role = {
        #UserRole;
        #CompanyRole;
    };
    public func validate_biodata({
        username: Text;
        email: Text;
        profile_pic: Text;
    }): Response<Null>{
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