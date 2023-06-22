import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVendedorDto } from './dto/create-vendedor.dto';
import { UpdateVendedorDto } from './dto/update-vendedor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VendedorEntity } from './entities/vendedor.entity';

@Injectable()
export class VendedorService {
  constructor(
    @InjectRepository(VendedorEntity)
    private vendedorRepository: Repository<VendedorEntity>,
  ) {}

  async create(
    createVendedorDto: CreateVendedorDto,
  ): Promise<VendedorEntity> {
    const existe = await this.vendedorRepository.findOneBy({
      nombre: createVendedorDto.nombre.trim(),
    });

    if (existe) {
      throw new ConflictException(`El vendedor ${createVendedorDto.nombre} ya existe.`);
    }

    return this.vendedorRepository.save({
      cedulaIdentidad: createVendedorDto.cedulaIdentidad.trim(),
      nombre: createVendedorDto.nombre.trim(),
      apellidoPaterno: createVendedorDto.apellidoPaterno.trim(),
      apellidoMaterno: createVendedorDto.apellidoMaterno.trim(),
      codigo: createVendedorDto.codigo,
      sexo: createVendedorDto.sexo.trim(),
      fechaContrato: createVendedorDto.fechaContrato,
      objetivoVenta: createVendedorDto.objetivoVenta,
      telefono: createVendedorDto.telefono,
    });
  }

  async findAll(): Promise<VendedorEntity[]> {
    return this.vendedorRepository.find();
  }

  async findOne(id: number): Promise<VendedorEntity> {
    const vendedor = await this.vendedorRepository.findOneBy({id});

    if (!vendedor) {
      throw new NotFoundException(`El vendedor ${id} no existe.`);
    }

    return vendedor;
  }

  async update(id: number, updateVendedorDto: UpdateVendedorDto) {
    const vendedor = await this.vendedorRepository.findOneBy({id});

    if (!vendedor) {
      throw new NotFoundException(`El vendedor ${id} no existe.`);
    }

    const vendedorUpdate = Object.assign(vendedor, updateVendedorDto);
    return this.vendedorRepository.save(vendedorUpdate);
  }

  async remove(id: number) {
    const existe = await this.vendedorRepository.findOneBy({id});

    if (!existe) {
      throw new NotFoundException(`El vendedor ${id} no existe.`);
    }

    return this.vendedorRepository.delete(id);
  }
}
