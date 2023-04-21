export class CreateOrderDto {
    uuid: string;
    timestamp: any;
    products: any[];
    email: string;
    status: string;
    constructor(timestamp,email,products) {
        this.timestamp = timestamp;
        this.email = email;
        this.products = products;
        this.status = "generada";
    }
}
