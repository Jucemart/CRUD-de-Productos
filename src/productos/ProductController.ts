import { Controller, Post, Body, Get, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { ProductosService } from './ProductService';
import { Producto } from './producto.entity';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('productos')
export class ProductosController {

  constructor(private productosService: ProductosService) {}

  @Get()
  async getProductos(): Promise<Producto[]> {
    return this.productosService.getProductos();
  }

  @Get(':id')
  async getProducto(@Param('id') id: string): Promise<Producto> {
    const producto = await this.productosService.getProducto(id);
    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado.`);
    }
    return producto;
  }

  @Post()
  async createProducto(@Body() newProducto: CreateProductoDto): Promise<Producto> {
    return this.productosService.createProducto(newProducto);
  }

  @Delete(':id')
  async deleteProducto(@Param('id') id: string): Promise<void> {
    await this.productosService.deleteProducto(id);
  }

  @Put(':id')
  async updateProducto(
    @Param('id') id: string,
    @Body() producto: UpdateProductoDto
  ): Promise<Producto> {
    const updatedProducto = await this.productosService.updateProducto(id, producto);
    if (!updatedProducto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado.`);
    }
    return updatedProducto;
  }
}

