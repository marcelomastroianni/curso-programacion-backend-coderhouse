import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('api/productos')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('category/:category')
  findAllByCategory(@Param('category') category: string) {
    return this.productService.findAllByCategory(category);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.productService.findOne(uuid);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(uuid, updateProductDto);
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.productService.remove(uuid);
  }
}
