import User "User";
module {
    public type Status = {
        #Rejected;
        #Canceled;
        #Pending;
        #Accepted;
    };

    public type ExperienceRequest = {
        principal_user_id:Text;
        status: Status;
        data: User.Experience;
    };
}