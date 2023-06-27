import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnidadDto } from './dto/create-unidad.dto';
import { UpdateUnidadDto } from './dto/update-unidad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UnidadEntity } from './entities/unidad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UnidadService {
  constructor(
    @InjectRepository(UnidadEntity)
    private unidadRepository: Repository<UnidadEntity>,
  ) {}

  async create(
    createUnidadDto: CreateUnidadDto,
  ): Promise<UnidadEntity> {
    const existe = await this.unidadRepository.findOneBy({
      descripcion: createUnidadDto.descripcion.trim(),
    });

    if (existe) {
      throw new ConflictException(`La unidad ${createUnidadDto.descripcion} ya existe.`);
    }

    return this.unidadRepository.save({
      descripcion: createUnidadDto.descripcion.trim(),
    });
  }

  async findAll(): Promise<UnidadEntity[]> {
    return this.unidadRepository.find();
  }

  async findOne(id: number): Promise<UnidadEntity> {
    const unidad = await this.unidadRepository.findOneBy({id});

    if (!unidad) {
      throw new NotFoundException(`La unidad ${id} no existe.`);
    }

    return unidad;
  }

  async update(id: number, updateUnidadDto: UpdateUnidadDto) {
    const unidad = await this.unidadRepository.findOneBy({id});

    if (!unidad) {
      throw new NotFoundException(`La unidad ${id} no existe.`);
    }

    const unidadUpdate = Object.assign(unidad, updateUnidadDto);
    return this.unidadRepository.save(unidadUpdate);
  }

  async remove(id: number) {
    const existe = await this.unidadRepository.findOneBy({id});

    if (!existe) {
      throw new NotFoundException(`La unidad ${id} no existe.`);
    }

    return this.unidadRepository.delete(id);
  }
}
