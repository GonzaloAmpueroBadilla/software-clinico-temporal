import { Container, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import PatientTable from './PatientTable'; // <-- IMPORTAR EL NUEVO COMPONENTE

export default function PatientsPage() {
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
      <PatientTable /> {/* <-- USAR EL NUEVO COMPONENTE AQUÍ */}
    </Container>
  );
}