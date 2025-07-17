import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material';
import Link from 'next/link';

// Interfaz para el Paciente
interface Patient {
  id: number;
  uuid: string;
  name: string;
  rut: string;
  birth_date: string;
}

// Interfaz para el Diagnóstico
interface Diagnosis {
  id: string;
  code: string;
  name: string;
}

// Interfaz para la Hospitalización
interface Admission {
  id: string;
  admission_date: string;
  discharge_date: string | null;
  diagnosis: Diagnosis;
}

// Función para obtener los detalles de un solo paciente
async function getPatientDetails(uuid: string): Promise<Patient | null> {
  try {
    const res = await fetch(`http://localhost:3000/patients/${uuid}`);
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Failed to fetch patient details:', error);
    return null;
  }
}

// Función para obtener las hospitalizaciones de un paciente
async function getAdmissionsByPatient(patientId: number): Promise<Admission[]> {
  try {
    const res = await fetch(`http://localhost:3000/admissions/by-patient/${patientId}`);
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Failed to fetch admissions:', error);
    return [];
  }
}

export default async function PatientDetailPage({ params }: { params: { id: string } }) {
  // Obtenemos los datos del paciente y sus hospitalizaciones en paralelo
  const patient = await getPatientDetails(params.id);

  // Solo si encontramos al paciente, buscamos sus hospitalizaciones
  const admissions = patient ? await getAdmissionsByPatient(patient.id) : [];

  if (!patient) {
    return <Container><Typography>Paciente no encontrado.</Typography></Container>;
  }

  return (
    <Container maxWidth="lg">
  {/* SECCIÓN DE DATOS DEL PACIENTE */}
  <Box sx={{ my: 4 }}>
    <Typography variant="h4" component="h1" gutterBottom>
      Ficha del Paciente
    </Typography>
    <Card>
      <CardContent>
        <Typography variant="h6">Nombre: {patient.name}</Typography>
        <Typography color="text.secondary">RUT: {patient.rut}</Typography>
      </CardContent>
    </Card>

    {/* --- BOTÓN AÑADIDO --- */}
    <Button
      variant="contained"
      sx={{ mt: 2 }}
      component={Link}
      href={`/pacientes/${params.id}/admision/nueva`}
    >
      Iniciar Nueva Hospitalización
    </Button>
  </Box>

      {/* SECCIÓN DE HOSPITALIZACIONES */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Historial de Hospitalizaciones
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha de Ingreso</TableCell>
                <TableCell>Diagnóstico Principal</TableCell>
                <TableCell>Fecha de Alta</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admissions.map((admission) => (
                <TableRow key={admission.id}>
                  <TableCell>
                    {new Date(admission.admission_date).toLocaleString('es-CL')}
                  </TableCell>
                  <TableCell>
                    {admission.diagnosis.name} ({admission.diagnosis.code})
                  </TableCell>
                  <TableCell>
                    {admission.discharge_date ? new Date(admission.discharge_date).toLocaleString('es-CL') : 'N/A'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}