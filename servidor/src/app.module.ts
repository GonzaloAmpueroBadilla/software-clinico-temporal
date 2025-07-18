import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsModule } from './patients/patients.module';
import { DiagnosesModule } from './diagnoses/diagnoses.module';
import { AdmissionsModule } from './admissions/admissions.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Módulos de funcionalidades
    PatientsModule,
    DiagnosesModule,   // <-- AÑADIR
    AdmissionsModule,  // <-- AÑADIR

    // Módulo de Configuración
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Módulo de Base de Datos
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    UsersModule,

    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}