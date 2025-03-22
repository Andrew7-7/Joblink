import Time "mo:base/Time";
module {
    public type ExperienceApproval = {
        principal_user_id:Text;
        principal_company_id:Text;
        position: Text;
        start_date: Time.Time;
        end_date: ?Time.Time;
        description: Text;
    };
}