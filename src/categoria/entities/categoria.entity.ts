import { ProductoEntity } from "src/producto/entities/producto.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('categorias')
export class CategoriaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 30})
    descripcion: string;

    @CreateDateColumn({ name: 'fecha_creacion' })
    fechaCreacion: Date;

    @UpdateDateColumn({ name: 'fecha_modificacion' })
    fechaModificacion: Date;

    @OneToMany(() => ProductoEntity, producto => producto.categoria)
    productos: ProductoEntity[];
}
