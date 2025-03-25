import Biodata "Biodata";
import Aproval "Aproval";
import AssocList "mo:base/AssocList";
module {
   public type Company = Biodata.Biodata and {
      aprovals:AssocList.AssocList<Text, Aproval.ExperienceRequest>;
   };
};