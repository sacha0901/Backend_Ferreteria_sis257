import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { VentaService } from './venta.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VentaEntity } from './entities/venta.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@ApiTags('ventas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ventas')
export class VentaController {
  constructor(private readonly ventaService: VentaService) { }

  @Post()
  @ApiCreatedResponse({ type: VentaEntity })
  @ApiOperation({ summary: 'Crea un nuevo venta' })
  create(@Body() createVentaDto: CreateVentaDto) {
    return this.ventaService.create(createVentaDto);
  }

  @Get()
  @ApiOkResponse({ type: VentaEntity, isArray: true })
  @ApiOperation({ summary: 'Obtiene la lista de ventas' })
  findAll() {
    return this.ventaService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: VentaEntity })
  @ApiOperation({ summary: 'Obtiene un venta con base al identificador' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ventaService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: VentaEntity })
  @ApiOperation({
    summary: 'Actualiza los datos de un venta con base al identificador',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVentaDto: UpdateVentaDto,
  ) {
    return this.ventaService.update(id, updateVentaDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiOperation({ summary: 'Elimina un venta con base al identificador' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ventaService.remove(id);
  }
}
