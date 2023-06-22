import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClienteEntity } from './entities/cliente.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@ApiTags('clientes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @ApiCreatedResponse({ type: ClienteEntity })
  @ApiOperation({ summary: 'Crea un nuevo cliente' })
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  @ApiOkResponse({ type: ClienteEntity, isArray: true })
  @ApiOperation({ summary: 'Obtiene la lista de clientees' })
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ClienteEntity })
  @ApiOperation({ summary: 'Obtiene un cliente con base al identificador' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clienteService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ClienteEntity })
  @ApiOperation({
    summary: 'Actualiza los datos de un cliente con base al identificador',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClienteDto: UpdateClienteDto,
  ) {
    return this.clienteService.update(id, updateClienteDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiOperation({ summary: 'Elimina un cliente con base al identificador' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clienteService.remove(id);
  }
}
