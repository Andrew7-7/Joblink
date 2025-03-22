import Text "mo:base/Text";
import Time "mo:base/Time";
import Blob "mo:base/Blob";

module {   
    public type User = {
        principal_id: Text;
        name: Text;
        email: Text;
        profile_pic: Blob;
        experiences:[{
            principal_id:Text;
            position:Text;
            description:Text;
            start_date:Time.Time;
            end_date:?Time.Time;
        }];
    };

};
