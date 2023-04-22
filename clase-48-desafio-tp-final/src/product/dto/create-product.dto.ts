export class CreateProductDto {
    uuid: string;
    name: string;
    timestamp: string;
    description: string;
    code: string;
    price: number;
    stock: number;
    photo_url: string;
    category: string;

    constructor( name, timestamp, description, code, price, stock, photo_url, category) {
        this.name = name;
        this.timestamp = timestamp;
        this.description = description;
        this.code = code;
        this.price = price;
        this.stock = stock;
        this.photo_url = photo_url;
        this.category = category;
      }
}
