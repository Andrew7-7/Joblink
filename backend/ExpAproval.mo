import User "User";
module {
    public type ExperienceApproval = {
        principal_user_id:Text;
        principal_company_id:Text;
        data: User.Experience;
    };
}