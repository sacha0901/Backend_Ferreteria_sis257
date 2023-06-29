import { Module } from '@nestjs/common';
import { DetalleService } from './detalle.service';
import { DetalleController } from './detalle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleEntity } from './entities/detalle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleEntity])],
  controllers: [DetalleController],
  providers: [DetalleService]
})
export class DetalleModule {}
