import Time "mo:base/Time";
import Text "mo:base/Text";

module {
  public type Experience = {
        principal_user_id:Text;
        position: Text;
        start_date: Time.Time;
        end_date: ?Time.Time;
        description: Text;
    };
}