import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsModule } from './patients/patients.module';
import { DiagnosesModule } from './diagnoses/diagnoses.module';
import { AdmissionsModule } from './admissions/admissions.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MedicationsModule } from './medications/medications.module'; // <-- AÑADIR
import { MedicalIndicationsModule } from './medical-indications/medical-indications.module'; // <-- AÑADIR
import { ProgressNotesModule } from './progress-notes/progress-notes.module';


@Module({
  imports: [
    // Módulos de funcionalidades
    PatientsModule,
    DiagnosesModule,
    AdmissionsModule,
    UsersModule,
    AuthModule,
    MedicationsModule,          
    MedicalIndicationsModule,
    ProgressNotesModule,   

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
        logging: true,
      }),
      inject: [ConfigService],
    }),

    ProgressNotesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}