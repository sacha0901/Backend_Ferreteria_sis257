import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { VendedorService } from './vendedor.service';
import { CreateVendedorDto } from './dto/create-vendedor.dto';
import { UpdateVendedorDto } from './dto/update-vendedor.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { VendedorEntity } from './entities/vendedor.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@ApiTags('vendedores')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('vendedores')
export class VendedorController {
  constructor(private readonly vendedorService: VendedorService) {}

  @Post()
  @ApiCreatedResponse({ type: VendedorEntity })
  @ApiOperation({ summary: 'Crea un nuevo vendedor' })
  create(@Body() createVendedorDto: CreateVendedorDto) {
    return this.vendedorService.create(createVendedorDto);
  }

  @Get()
  @ApiOkResponse({ type: VendedorEntity, isArray: true })
  @ApiOperation({ summary: 'Obtiene la lista de vendedores' })
  findAll() {
    return this.vendedorService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: VendedorEntity })
  @ApiOperation({ summary: 'Obtiene un vendedor con base al identificador' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vendedorService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: VendedorEntity })
  @ApiOperation({
    summary: 'Actualiza los datos de un vendedor con base al identificador',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVendedorDto: UpdateVendedorDto,
  ) {
    return this.vendedorService.update(id, updateVendedorDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiOperation({ summary: 'Elimina un vendedor con base al identificador' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.vendedorService.remove(id);
  }
}
