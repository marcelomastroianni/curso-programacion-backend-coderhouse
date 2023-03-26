export class CreateShoppingCartDto {
    uuid: string;
    timestamp: any;
    products: any[];
    constructor(timestamp) {
        this.timestamp = timestamp;
        this.products = [];
    }
}
