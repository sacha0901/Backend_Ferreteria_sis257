import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCategoriaDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo descripcion no debe ser vacío' })
    @IsString({ message: 'El campo descripcion debe ser de tipo cadena' })
    @MaxLength(30, {
        message: 'El campo descripcion no debe ser mayor a 30 caracteres',
    })
    readonly descripcion: string;

}
