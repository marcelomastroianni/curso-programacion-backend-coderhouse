import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto {

    name: string;
    description: string;
    code: string;
    price: number;
    stock: number;
    photo_url: string;

    constructor( name, description, code, price, stock, photo_url) {
        this.name = name;
        this.description = description;
        this.code = code;
        this.price = price;
        this.stock = stock;
        this.photo_url = photo_url;
      }
}
