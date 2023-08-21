class followers {
    public user_id: number;
    public vacation_id: number;
    
    constructor(vacation_id: number , user_id:number) {

        this.user_id = user_id;
        this.vacation_id = vacation_id;
    }

}

export default followers;