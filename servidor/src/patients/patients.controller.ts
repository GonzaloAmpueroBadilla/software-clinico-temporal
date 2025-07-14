import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

// Este decorador define la ruta base para todas las peticiones: /patients
@Controller('patients')
export class PatientsController {
  // El constructor inyecta el servicio para poder usar sus métodos.
  constructor(private readonly patientsService: PatientsService) {}

  // Maneja peticiones POST a /patients
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
     // VAMOS A ESPIAR LOS DATOS QUE LLEGAN AQUÍ
    console.log('Datos recibidos en el controlador:', createPatientDto);
    
    return this.patientsService.create(createPatientDto);
  }

  // Maneja peticiones GET a /patients
  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  // Maneja peticiones GET a /patients/:id (ej: /patients/123-456-789)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  // Maneja peticiones PATCH a /patients/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(id, updatePatientDto);
  }

  // Maneja peticiones DELETE a /patients/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }
}