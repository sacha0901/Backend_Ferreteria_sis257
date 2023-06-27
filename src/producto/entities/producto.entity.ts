import { CategoriaEntity } from "src/categoria/entities/categoria.entity";
import { UnidadEntity } from "src/unidad/entities/unidad.entity";
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

  @Column({name:'id_unidad'})
  idUnidad: number;

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

  @ManyToOne(() => UnidadEntity, (unidad) => unidad.productos)
  @JoinColumn({ name: 'id_unidad', referencedColumnName: 'id' })
  unidad: UnidadEntity;
}
