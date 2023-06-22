import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VentaEntity } from './entities/venta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(VentaEntity)
    private ventaRepository: Repository<VentaEntity>,
  ) {}

  async create(
    createVentaDto: CreateVentaDto,
  ): Promise<VentaEntity> {
    const existe = await this.ventaRepository.findOneBy({
      idUsuario: createVentaDto.idUsuario,
      idCliente: createVentaDto.idCliente,
      transaccion: createVentaDto.transaccion.trim(),
    });

    if (existe) {
      throw new ConflictException(`El venta ${createVentaDto.transaccion} ya existe.`);
    }

    return this.ventaRepository.save({
      transaccion: createVentaDto.transaccion.trim(),
      fecha: createVentaDto.fecha,
      idUsuario: createVentaDto.idUsuario,
      idCliente: createVentaDto.idCliente,

    });
  }

  async findAll(): Promise<VentaEntity[]> {
    return this.ventaRepository.find();
  }

  async findOne(id: number): Promise<VentaEntity> {
    const venta = await this.ventaRepository.findOneBy({id});

    if (!venta) {
      throw new NotFoundException(`El venta ${id} no existe.`);
    }

    return venta;
  }

  async update(id: number, updateVentaDto: UpdateVentaDto) {
    const venta = await this.ventaRepository.findOneBy({id});

    if (!venta) {
      throw new NotFoundException(`El venta ${id} no existe.`);
    }

    const ventaUpdate = Object.assign(venta, updateVentaDto);
    return this.ventaRepository.save(ventaUpdate);
  }

  async remove(id: number) {
    const existe = await this.ventaRepository.findOneBy({id});

    if (!existe) {
      throw new NotFoundException(`El venta ${id} no existe.`);
    }

    return this.ventaRepository.delete(id);
  }
}
