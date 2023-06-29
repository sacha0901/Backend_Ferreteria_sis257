import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DetalleService } from './detalle.service';
import { CreateDetalleDto } from './dto/create-detalle.dto';
import { UpdateDetalleDto } from './dto/update-detalle.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DetalleEntity } from './entities/detalle.entity';
@ApiTags('detalles')
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('detalles')
export class DetalleController {
  constructor(private readonly detalleService: DetalleService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({ type: DetalleEntity })
  create(@Body() createDetalleDto: CreateDetalleDto) {
    return this.detalleService.create(createDetalleDto);
  }

  @Get()
  @ApiOkResponse({ type: DetalleEntity, isArray: true })
  findAll() {
    return this.detalleService.findAll();
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOkResponse({ type: DetalleEntity })
  findOne(@Param('id') id: string) {
    return this.detalleService.findOne(+id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOkResponse({ type: DetalleEntity })
  update(@Param('id') id: string, @Body() updateDetalleDto: UpdateDetalleDto) {
    return this.detalleService.update(+id, updateDetalleDto);
  }

  @ApiBearerAuth()
@UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: string) {
    return this.detalleService.remove(+id);
  }
}
