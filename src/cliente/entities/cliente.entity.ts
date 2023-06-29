
import { VentaEntity } from 'src/venta/entities/venta.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('clientes')
export class ClienteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nit: string;

  @Column()
  razonSocial: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @OneToMany(() => VentaEntity, venta => venta.cliente)
    ventas: VentaEntity[];

}
