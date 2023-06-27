import { CategoriaEntity } from "src/categoria/entities/categoria.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity('productos')
export class ProductoEntity {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_categoria' })
  idCategoria: number;

  @Column()
  codigo: string;

  @Column()
  descripcion: string;

  @Column()
  unidad: string;

  @Column()
  precio: number;


  @Column({name:'existencia_producto'})
  existenciaProducto: number;

  @Column({name:'url_imagen'})
  urlImagen: string;


  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @ManyToOne(() => CategoriaEntity, (categoria) => categoria.productos)
  @JoinColumn({ name: 'id_categoria', referencedColumnName: 'id' })
  categoria: CategoriaEntity;
}
