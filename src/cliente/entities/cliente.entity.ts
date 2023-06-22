import { VendedorEntity } from 'src/vendedor/entities/vendedor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('clientes')
export class ClienteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cedulaIdentidad: string;

  @Column()
  nombre: string;

  @Column({ name: 'apellido_paterno' })
  apellidoPaterno: string;

  @Column({ name: 'apellido_materno' })
  apellidoMaterno: string;

  @Column()
  direccion: string;

  @Column({ name: 'limite_credito' })
  limiteCredito: number;

  @Column({ name: 'fecha_asignacion' })
  fechaAsignacion: Date;

  @Column({ name: 'id_vendedor' })
  idVendedor: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  
  @ManyToOne(()=>VendedorEntity,(vendedor)=>vendedor.clientes)
  @JoinColumn({name:'id_vendedor',referencedColumnName:'id'})
  vendedor: VendedorEntity;

}
