import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';
import { VentaEntity } from 'src/venta/entities/venta.entity';
  
  @Entity('usuarios')
  export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 20 })
    usuario: string;
  
    @Column({ length: 150, select: false })
    clave: string;
  
    @Column({ length: 50 })
    email: string;
  
    @Column({ length: 20 })
    rol: string;
  
    @Column()
    premium: boolean;
  
    @CreateDateColumn({ name: 'fecha_creacion' })
    fechaCreacion: Date;
  
    @UpdateDateColumn({ name: 'fecha_modificacion' })
    fechaModificacion: Date;

    @OneToMany(() => VentaEntity, venta => venta.usuario)
    ventas: VentaEntity[];
  
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
      const salt = await bcrypt.genSalt();
      this.clave = await bcrypt.hash(this.clave, salt);
    }
  
    async validatePassword(plainPassword: string): Promise<boolean> {
      return bcrypt.compare(plainPassword, this.clave);
    }
  }