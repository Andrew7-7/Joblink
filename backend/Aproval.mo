import User "Experience";
module {
    public type Status = {
        #Rejected;
        #Canceled;
        #Pending;
        #Accepted;
    };

    public type ExperienceRequest = {
        status: Status;
        data: User.Experience;
    };
}