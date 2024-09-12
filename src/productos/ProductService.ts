import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './producto.entity';
import { Repository } from 'typeorm';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {

  constructor(
    @InjectRepository(Producto) 
    private productoRepository: Repository<Producto>
  ) {}

  async createProducto(producto: CreateProductoDto): Promise<Producto> {
    const existingProducto = await this.productoRepository.findOne({
      where: { nombre: producto.nombre },
    });
    if (existingProducto) {
      throw new HttpException(`Producto con nombre ${producto.nombre} ya existe.`, 409);
    }
    
    const newProducto = this.productoRepository.create(producto);
    return this.productoRepository.save(newProducto);
  }

  async getProductos(): Promise<Producto[]> {
    return this.productoRepository.find();
  }

  async getProducto(id: string): Promise<Producto> {
    const producto = await this.productoRepository.findOne({ where: { id } });
    if (!producto) {
      throw new HttpException(`Producto con id ${id} no encontrado.`, 404);
    }
    return producto;
  }

  async deleteProducto(id: string): Promise<void> {
    const producto = await this.getProducto(id); 
    await this.productoRepository.remove(producto);
  }

  async updateProducto(id: string, producto: UpdateProductoDto): Promise<Producto> {
    const existingProducto = await this.getProducto(id); 

    Object.assign(existingProducto, producto);
    return this.productoRepository.save(existingProducto);
  }
}
