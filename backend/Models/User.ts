class User {
    public id: number;
    public user_name: string;
    public user_email: string;
    public password: string;
    public user_create: number;
    public role_type: string = 'member';


    constructor(id: number, user_name: string, user_email: string, password: string, user_create: number ,role_type:string) {
        this.id = id;
        this.user_name = user_name;
        this.user_email = user_email;
        this.password = password;
        this.user_create = user_create;
        this.role_type= role_type;
    }
}

export default User;