import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDefined, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
export class CreateVendedorDto {
  
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo cedulaIdentidad no debe ser vacío' })
  @IsString({ message: 'El campo cedulaIdentidad debe ser de tipo cadena' })
  @MaxLength(12, {
    message: 'El campo cedulaIdentidad no debe ser mayor a 12 caracteres',
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
  @IsNotEmpty({ message: 'El campo código no debe ser vacío' })
  @IsNumber( {} , { message: 'El campo código deber ser de tipo numérico' } )
  readonly codigo: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo sexo no debe ser vacío' })
  @IsString(  { message: 'El campo sexo deber ser de tipo cadena' } )
  @MaxLength(10, {
    message: 'El campo sexo no debe ser mayor a 10 caracteres',
  })
  readonly sexo: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo fechaContrato no debe ser vacío' })
  @IsDefined({ message: 'El campo fechaContrato debe estar definido' })
  @IsDateString( {}, { message: 'El campo fechaContrato deber ser de tipo fecha' } )
  readonly fechaContrato: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo objetivoVenta no debe ser vacío' })
  @IsNumber( {}, { message: 'El campo objetivoVenta deber ser de tipo numérico' } )
  readonly objetivoVenta: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo telefono no debe ser vacío' })
  @IsNumber( {}, { message: 'El campo telefono deber ser de tipo numérico' } )
  readonly telefono: number;
}
