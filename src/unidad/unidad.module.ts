import { Module } from '@nestjs/common';
import { UnidadService } from './unidad.service';
import { UnidadController } from './unidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadEntity } from './entities/unidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UnidadEntity])],
  controllers: [UnidadController],
  providers: [UnidadService]
})
export class UnidadModule {}
