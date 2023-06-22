import { Module } from '@nestjs/common';
import { VendedorService } from './vendedor.service';
import { VendedorController } from './vendedor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendedorEntity } from './entities/vendedor.entity';
@Module({
  imports: [TypeOrmModule.forFeature([VendedorEntity])],
  controllers: [VendedorController],
  providers: [VendedorService]
})
export class VendedorModule {}
