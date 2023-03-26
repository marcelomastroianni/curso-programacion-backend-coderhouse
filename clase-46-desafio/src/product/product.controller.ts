import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('api/productos')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.productService.findOne(uuid);
  }

  @Put(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(uuid, updateProductDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.productService.remove(uuid);
  }
}
