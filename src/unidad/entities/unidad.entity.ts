import { ProductoEntity } from "src/producto/entities/producto.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('unidades')
export class UnidadEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descripcion: string;

    @CreateDateColumn({ name: 'fecha_creacion' })
    fechaCreacion: Date;

    @UpdateDateColumn({ name: 'fecha_modificacion' })
    fechaModificacion: Date;

    @OneToMany(() => ProductoEntity, producto => producto.unidad)
    productos: ProductoEntity[];
}
