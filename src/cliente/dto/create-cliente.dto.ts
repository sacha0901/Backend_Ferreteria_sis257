import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDefined, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nit no debe ser vacío' })
  @IsString({ message: 'El campo nit debe ser de tipo cadena' })
  @MaxLength(12, {
    message: 'El campo nit no debe ser mayor a 20 caracteres',
  })
  readonly nit: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo razonSocial no debe ser vacío' })
  @IsString({ message: 'El campo razonSocial debe ser de tipo cadena' })
  @MaxLength(20, {
    message: 'El campo razonSocial no debe ser mayor a 20 caracteres',
  })
  readonly razonSocial: string;

}
