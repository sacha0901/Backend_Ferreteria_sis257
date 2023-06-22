import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClienteEntity } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(ClienteEntity)
    private clienteRepository: Repository<ClienteEntity>,
  ) {}

  async create(
    createClienteDto: CreateClienteDto,
  ): Promise<ClienteEntity> {
    const existe = await this.clienteRepository.findOneBy({
      cedulaIdentidad: createClienteDto.cedulaIdentidad.trim(),
      idVendedor: createClienteDto.idVendedor,
    });

    if (existe) {
      throw new ConflictException(`El cliente ${createClienteDto.cedulaIdentidad} ya existe.`);
    }

    return this.clienteRepository.save({
      cedulaIdentidad: createClienteDto.cedulaIdentidad.trim(),
      nombre: createClienteDto.nombre.trim(),
      apellidoPaterno: createClienteDto.apellidoPaterno.trim(),
      apellidoMaterno: createClienteDto.apellidoMaterno.trim(),
      direccion: createClienteDto.direccion.trim(),
      limiteCredito: createClienteDto.limiteCredito,
      fechaAsignacion: createClienteDto.fechaAsignacion,
      idVendedor: createClienteDto.idVendedor,
    });
  }

  async findAll(): Promise<ClienteEntity[]> {
    return this.clienteRepository.find({relations:{vendedor:true}});
  }

  async findOne(id: number): Promise<ClienteEntity> {
    const cliente = await this.clienteRepository.findOne({ where: {id}, relations: {vendedor: true}});
    if (!cliente) {
      throw new NotFoundException(`El cliente ${id} no existe.`);
    }

    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.clienteRepository.findOneBy({id});

    if (!cliente) {
      throw new NotFoundException(`El cliente ${id} no existe.`);
    }

    const clienteUpdate = Object.assign(cliente, updateClienteDto);
    return this.clienteRepository.save(clienteUpdate);
  }

  async remove(id: number) {
    const existe = await this.clienteRepository.findOneBy({id});

    if (!existe) {
      throw new NotFoundException(`El cliente ${id} no existe.`);
    }

    return this.clienteRepository.delete(id);
  }
}
