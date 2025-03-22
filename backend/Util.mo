module {
    
    public type Response<T> = {
        #Ok : T;
        #Err : Text;
    };

};