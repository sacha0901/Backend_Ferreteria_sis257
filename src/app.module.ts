import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClienteModule } from './cliente/cliente.module';
import { ProductoModule } from './producto/producto.module';
import { VentaModule } from './venta/venta.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { CategoriaModule } from './categoria/categoria.module';
import { UnidadModule } from './unidad/unidad.module';
import { DetalleModule } from './detalle/detalle.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '**/*.entity.{ts,js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ClienteModule,
    ProductoModule,
    VentaModule,
    UsuarioModule,
    AuthModule,
    CategoriaModule,
    UnidadModule,
    DetalleModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
