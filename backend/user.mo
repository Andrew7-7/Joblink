import Text "mo:base/Text";
import Int "mo:base/Int";

module {   
    public type User = {
        principal_id: Text;
        name: Text;
        email: Text;
        experiences:[{
            principal_id:Text;
            position:Text;
            start_date:Int;
            end_time:Int;
        }];
    };
};