
class vacations {
    public id: number;
    public destination: string;
     public description: string;
    public start_date: string;
    public end_date: string;
    public price: number;
    public image_url: string;
    public isFollowed: boolean; 
    public followers_count: number; 



    constructor(id: number, destination: string,description: string, start_date: string, end_date: string, price: number,image_url:string ,followers_count:number) {
        this.id = id;
        this.destination = destination;
        this.description = description
        this.start_date = start_date;
        this.end_date = end_date;
        this.price = price;
        this.image_url= image_url;
        this.followers_count= followers_count; 
    }
}

export default vacations;