import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from '@mui/material';
import Link from 'next/link';

// Definimos una interfaz para el tipo de dato de Paciente
interface Patient {
  id: number;
  uuid: string;
  name: string;
  rut: string;
  birth_date: string;
}

// Función para obtener los pacientes desde nuestra API
async function getPatients(): Promise<Patient[]> {
  try {
    const res = await fetch('http://localhost:3000/patients', {
      cache: 'no-store', // Le decimos a Next.js que no guarde en caché esta petición
    });

    if (!res.ok) {
      throw new Error('Failed to fetch patients');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return []; // Devuelve un array vacío si hay un error
  }
}

// Este es nuestro componente de página. Al ser 'async', se ejecuta en el servidor.
export default async function PatientsPage() {
  const patients = await getPatients();

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 4 }}>
        <Typography variant="h4" component="h1">
          Lista de Pacientes
        </Typography>
        <Button variant="contained" color="primary" component={Link} href="/pacientes/nuevo">
          Crear Nuevo Paciente
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>RUT</TableCell>
              <TableCell>Fecha de Nacimiento</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {patients.map((patient) => (
    <TableRow key={patient.uuid}>
      <TableCell>{patient.name}</TableCell>
      <TableCell>{patient.rut}</TableCell>
      <TableCell>{new Date(patient.birth_date).toLocaleDateString('es-CL')}</TableCell>
      <TableCell>
        {/* --- BOTÓN AÑADIDO --- */}
        <Button
          variant="outlined"
          size="small"
          component={Link}
          href={`/pacientes/${patient.uuid}`}
        >
          Ver Detalles
        </Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}