import { ClienteEntity } from "src/cliente/entities/cliente.entity";
import { DetalleEntity } from "src/detalle/entities/detalle.entity";
import { UsuarioEntity } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity('ventas')
export class VentaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 20})
    transaccion: string;

    @Column()
    fecha: Date;

    @Column({name:'id_usuario'})
    idUsuario: number;

    @Column({name:'id_cliente'})
    idCliente: number;

    @CreateDateColumn({ name: 'fecha_creacion' })
    fechaCreacion: Date;

    @UpdateDateColumn({ name: 'fecha_modificacion' })
    fechaModificacion: Date;

    @ManyToOne(() => UsuarioEntity, (usuario) => usuario.ventas)
    @JoinColumn({ name: 'id_usuario', referencedColumnName: 'id' })
    usuario: UsuarioEntity;

    @ManyToOne(() => ClienteEntity, (cliente) => cliente.ventas)
    @JoinColumn({ name: 'id_cliente', referencedColumnName: 'id' })
    cliente: ClienteEntity;

    @OneToMany(() => DetalleEntity, detalle => detalle.venta)
    detalles: DetalleEntity[];
}
