import Text "mo:base/Text";
import Time "mo:base/Time";
import Biodata "./Biodata";

module {  
    public type Experience = {
        position: Text;
        start_date: Time.Time;
        end_date: ?Time.Time;
        description: Text;
    };
    public type User = Biodata.Biodata and {
        experiences:[Experience];
    };
};
