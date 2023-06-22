import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity('ventas')
export class VentaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    transaccion: string;

    @Column()
    fecha: Date;

    @Column()
    idUsuario: number;
    
    @Column()
    idCliente: number;

    @CreateDateColumn({ name: 'fecha_creacion' })
    fechaCreacion: Date;

    @UpdateDateColumn({ name: 'fecha_modificacion' })
    fechaModificacion: Date;
}
