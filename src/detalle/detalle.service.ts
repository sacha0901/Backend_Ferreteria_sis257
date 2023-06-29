import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetalleDto } from './dto/create-detalle.dto';
import { UpdateDetalleDto } from './dto/update-detalle.dto';
import { DetalleEntity } from './entities/detalle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DetalleService {
  constructor(
    @InjectRepository(DetalleEntity)
    private detalleRepository: Repository<DetalleEntity>,
  ) {}

  async create(createDetalleDto: CreateDetalleDto): Promise<DetalleEntity> {
    const existe = await this.detalleRepository.findOneBy({
      idVenta: createDetalleDto.idVenta,
      idProducto: createDetalleDto.idProducto,
      total: createDetalleDto.total,

    });

    if (existe) {
      throw new ConflictException(
        `El detalle ${createDetalleDto.total} ya existe para la detalle.`,
      );
    }

    return this.detalleRepository.save({
      idVenta: createDetalleDto.idVenta,
      idProducto: createDetalleDto.idProducto,
      cantidad: createDetalleDto.cantidad,
      precioUnitario: createDetalleDto.precioUnitario,
      total: createDetalleDto.total,
    });
  }

  async findAll(): Promise<DetalleEntity[]> {
    return this.detalleRepository.find({ relations: { venta:true, producto:true} }); 
  }

  async findOne(id: number): Promise<DetalleEntity> {
    const detalle = await this.detalleRepository.findOne({ where: {id}, relations: { venta:true, producto:true}});

    if (!detalle) {
      throw new NotFoundException(`El detalle ${id} no existe.`);
    }

    return detalle;
  }

  async update(id: number, updateDetalleDto: UpdateDetalleDto) {
    const detalle = await this.detalleRepository.findOneBy({id});

    if (!detalle) {
      throw new NotFoundException(`El detalle ${id} no existe.`);
    }

    const detalleUpdate = Object.assign(detalle, updateDetalleDto);
    return this.detalleRepository.save(detalleUpdate);
  }

  async remove(id: number) {
    const existe = await this.detalleRepository.findOneBy({id});

    if (!existe) {
      throw new NotFoundException(`El detalle ${id} no existe.`);
    }

    return this.detalleRepository.delete(id);
  }
}
