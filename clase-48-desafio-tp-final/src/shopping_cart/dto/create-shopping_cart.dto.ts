export class CreateShoppingCartDto {
    uuid: string;
    timestamp: any;
    products: any[];
    email: string;
    constructor(timestamp,email) {
        this.timestamp = timestamp;
        this.email = email;
        this.products = [];
    }
}
