import { ProductoEntity } from "src/producto/entities/producto.entity";
import { VentaEntity } from "src/venta/entities/venta.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity('detalles')
export class DetalleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cantidad: number;
  
    @Column()
    precioUnitario: number;

    @Column()
    total: number;

    @Column({ name: 'id_venta' })
    idVenta: number;
  
    @Column({name:'id_producto'})
    idProducto: number;
  
    @CreateDateColumn({ name: 'fecha_creacion' })
    fechaCreacion: Date;
  
    @UpdateDateColumn({ name: 'fecha_modificacion' })
    fechaModificacion: Date;
  
    @ManyToOne(() => VentaEntity, (venta) => venta.detalles)
    @JoinColumn({ name: 'id_venta', referencedColumnName: 'id' })
    venta: VentaEntity;
  
    @ManyToOne(() => ProductoEntity, (producto) => producto.detalles)
    @JoinColumn({ name: 'id_producto', referencedColumnName: 'id' })
    producto: ProductoEntity;
}
