import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nit no debe ser vacío' })
  @IsString({ message: 'El campo nit debe ser de tipo cadena' })
  @MaxLength(30, {
    message: 'El campo nit no debe ser mayor a 30 caracteres',
  })
  readonly nit: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo razonSocial no debe ser vacío' })
  @IsString({ message: 'El campo razonSocial debe ser de tipo cadena' })
  @MaxLength(30, {
    message: 'El campo razonSocial no debe ser mayor a 30 caracteres',
  })
  readonly razonSocial: string;

}
