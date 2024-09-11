import { Module } from '@nestjs/common';
import { ProductosController } from './ProductController';
import { ProductosService } from './ProductService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Producto])],
  controllers: [ProductosController],
  providers: [ProductosService]
})
export class ProductosModule {}
