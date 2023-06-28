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
      nit: createClienteDto.nit.trim(),
      razonSocial: createClienteDto.razonSocial.trim(),
      
    });

    if (existe) {
      throw new ConflictException(`El cliente ${createClienteDto.nit} ya existe.`);
    }

    return this.clienteRepository.save({
      nit: createClienteDto.nit.trim(),
      razonSocial: createClienteDto.razonSocial.trim(),
    });
  }

  async findAll(): Promise<ClienteEntity[]> {
    return this.clienteRepository.find();
  }

  async findOne(id: number): Promise<ClienteEntity> {
    const cliente = await this.clienteRepository.findOneBy({ });
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
