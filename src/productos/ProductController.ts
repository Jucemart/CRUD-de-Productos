import { Controller, Post, Body, Get, Param, Delete, Put} from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { ProductosService } from './ProductService';
import { Producto } from './producto.entity';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('productos')
export class ProductosController {

constructor(private productosService : ProductosService) {}

    @Get()
    getProductos() {
        return this.productosService.getProductos();
    }

    @Get(':id')
    getProducto(@Param('id') id: string): Promise<Producto> {
      console.log(id); // Para depuración
      return this.productosService.getProducto(id);
    }
  

    @Post()
    createProducto(@Body() newProducto : CreateProductoDto){
        this.productosService.createProducto(newProducto);
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
      return this.productosService.updateProducto(id, producto);
    }
}
