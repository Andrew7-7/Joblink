import Biodata "Biodata";
import Aproval "Aproval";
module {
   public type Company = Biodata.Biodata and {
      aprovals:[Aproval.ExperienceRequest]
   };
};