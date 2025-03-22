import Text "mo:base/Text";
import Blob "mo:base/Blob";
module {
    public type Biodata = {
        principal_id: Text;
        name: Text;
        email: Text;
        profile_pic: Blob;
    }
}