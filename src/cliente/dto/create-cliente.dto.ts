import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDefined, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo cedulaIdentidad no debe ser vacío' })
  @IsString({ message: 'El campo cedulaIdentidad debe ser de tipo cadena' })
  @MaxLength(12, {
    message: 'El campo cedulaIdentidad no debe ser mayor a 20 caracteres',
  })
  readonly cedulaIdentidad: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre no debe ser vacío' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(20, {
    message: 'El campo nombre no debe ser mayor a 20 caracteres',
  })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo apellido_paterno no debe ser vacío' })
  @IsString({ message: 'El campo apellido_paterno debe ser de tipo cadena' })
  @MaxLength(20, {
    message: 'El campo apellido_paterno no debe ser mayor a 20 caracteres',
  })
  readonly apellidoPaterno: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo apellido_materno no debe ser vacío' })
  @IsString({ message: 'El campo apellido_materno debe ser de tipo cadena' })
  @MaxLength(20, {
    message: 'El campo apellido_materno no debe ser mayor a 20 caracteres',
  })
  readonly apellidoMaterno: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo direccion no debe ser vacío' })
  @IsString({ message: 'El campo direccion deber ser de tipo cadena' })
  @MaxLength(30, {
    message: 'El campo direccion no debe ser mayor a 10 caracteres',
  })
  readonly direccion: string;
  
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo limiteCredito no debe ser vacío' })
  @IsNumber({}, { message: 'El campo limiteCredito deber ser de tipo numérico' })
  readonly limiteCredito: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo fechaAsignacion no debe ser vacío' })
  @IsDefined({ message: 'El campo fechaAsignacion debe estar definido' })
  @IsDateString(
    {},
    { message: 'El campo fechaAsignacion deber ser de tipo fecha' },
  )
  readonly fechaAsignacion: Date;

  @ApiProperty()
  @IsDefined({ message: 'El campo idVendedor debe estar definido' })
  @IsNumber({}, { message: 'El campo idVendedor debe ser de tipo numérico' })
  readonly idVendedor: number;

}
