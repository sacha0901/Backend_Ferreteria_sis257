import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriaEntity } from './entities/categoria.entity';
@ApiTags('categorias')
//@ApiBearerAuth()
//@UseGuards(JwtAuthGuard)
@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  @ApiCreatedResponse({ type: CategoriaEntity })
  @ApiOperation({ summary: 'Crea un nuevo categoria' })
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  @ApiOkResponse({ type: CategoriaEntity, isArray: true })
  @ApiOperation({ summary: 'Obtiene la lista de categorias' })
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: CategoriaEntity })
  @ApiOperation({ summary: 'Obtiene una categoria con base al identificador' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: CategoriaEntity })
  @ApiOperation({
    summary: 'Actualiza los datos de una categoria con base al identificador',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriaService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiOperation({ summary: 'Elimina una categoria con base al identificador' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.remove(id);
  }
}
