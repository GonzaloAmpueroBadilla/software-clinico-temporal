import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdmissionsService } from './admissions.service';
import { CreateAdmissionDto } from './dto/create-admission.dto';
import { UpdateAdmissionDto } from './dto/update-admission.dto';

@Controller('admissions')
export class AdmissionsController {
  constructor(private readonly admissionsService: AdmissionsService) {}

  @Post()
  create(@Body() createAdmissionDto: CreateAdmissionDto) {
    return this.admissionsService.create(createAdmissionDto);
  }

  @Get()
  findAll() {
    return this.admissionsService.findAll();
  }

  // --- OBTENER HOSPITALIZACIONES POR ID DE PACIENTE ---
// El decorador @Get define una sub-ruta. La URL final será /admissions/by-patient/:patientId
@Get('by-patient/:patientId')
findByPatient(@Param('patientId') patientId: string) {
  // Usamos el '+' para convertir el patientId de string (de la URL) a número.
  return this.admissionsService.findByPatient(+patientId);
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.admissionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdmissionDto: UpdateAdmissionDto) {
    // Dejamos la lógica de actualización para después.
    return this.admissionsService.update(id, updateAdmissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.admissionsService.remove(id);
  }

  // --- GENERAR EPICRISIS ---
@Get(':id/epicrisis')
generateEpicrisis(@Param('id') id: string) {
  return this.admissionsService.generateEpicrisis(id);
}
}