import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentaEntity } from './entities/venta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VentaEntity])],
  controllers: [VentaController],
  providers: [VentaService]
})
export class VentaModule {}
