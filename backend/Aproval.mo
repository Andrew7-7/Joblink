import User "User";
module {
    public type ExperienceRequest = {
        principal_user_id:Text;
        status: Text;
        data: User.Experience;
    };
}