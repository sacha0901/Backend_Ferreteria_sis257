import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UnidadService } from './unidad.service';
import { CreateUnidadDto } from './dto/create-unidad.dto';
import { UpdateUnidadDto } from './dto/update-unidad.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UnidadEntity } from './entities/unidad.entity';

@ApiTags('unidades')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('unidades')
export class UnidadController {
  constructor(private readonly unidadService: UnidadService) {}

  @Post()
  @ApiCreatedResponse({ type: UnidadEntity })
  @ApiOperation({ summary: 'Crea un nuevo unidad' })
  create(@Body() createUnidadDto: CreateUnidadDto) {
    return this.unidadService.create(createUnidadDto);
  }

  @Get()
  @ApiOkResponse({ type: UnidadEntity, isArray: true })
  @ApiOperation({ summary: 'Obtiene la lista de unidads' })
  findAll() {
    return this.unidadService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UnidadEntity })
  @ApiOperation({ summary: 'Obtiene una unidad con base al identificador' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.unidadService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UnidadEntity })
  @ApiOperation({
    summary: 'Actualiza los datos de una unidad con base al identificador',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUnidadDto: UpdateUnidadDto,
  ) {
    return this.unidadService.update(id, updateUnidadDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiOperation({ summary: 'Elimina una unidad con base al identificador' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.unidadService.remove(id);
  }
}
