import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ProductoEntity } from './entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductoEntity)
    private productoRepository: Repository<ProductoEntity>,
  ) {}

  async create(
    createProductoDto: CreateProductoDto,
  ): Promise<ProductoEntity> {
    const existe = await this.productoRepository.findOneBy({
      codigo: createProductoDto.codigo.trim(),
    });

    if (existe) {
      throw new ConflictException(`El producto ${createProductoDto.codigo} ya existe.`);
    }

    return this.productoRepository.save({
      codigo: createProductoDto.codigo.trim(),
      descripcion: createProductoDto.descripcion.trim(),
      unidad: createProductoDto.unidad.trim(),
      precio: createProductoDto.precio,
      existenciaProducto: createProductoDto.existenciaProducto,
    });
  }

  async findAll(): Promise<ProductoEntity[]> {
    return this.productoRepository.find();
  }

  async findOne(id: number): Promise<ProductoEntity> {
    const producto = await this.productoRepository.findOneBy({id});

    if (!producto) {
      throw new NotFoundException(`El producto ${id} no existe.`);
    }

    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const producto = await this.productoRepository.findOneBy({id});

    if (!producto) {
      throw new NotFoundException(`El producto ${id} no existe.`);
    }

    const productoUpdate = Object.assign(producto, updateProductoDto);
    return this.productoRepository.save(productoUpdate);
  }

  async remove(id: number) {
    const existe = await this.productoRepository.findOneBy({id});

    if (!existe) {
      throw new NotFoundException(`El producto ${id} no existe.`);
    }

    return this.productoRepository.delete(id);
  }
}
