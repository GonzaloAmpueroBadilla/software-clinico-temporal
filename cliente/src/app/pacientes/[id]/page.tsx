'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import Link from 'next/link';
import { api } from '@/lib/api';

// --- Interfaces de Datos ---
interface Patient {
  id: number;
  uuid: string;
  name: string;
  rut: string;
}
interface Diagnosis {
  code: string;
  name: string;
}
interface Admission {
  id: string;
  admission_date: string;
  discharge_date: string | null;
  diagnosis: Diagnosis;
}

export default function PatientDetailPage() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const patientUuid = params.id as string;

  useEffect(() => {
    const fetchData = async () => {
      if (!patientUuid) return;
      try {
        const patientData = await api.get(`/patients/${patientUuid}`);
        setPatient(patientData);

        if (patientData) {
          const admissionsData = await api.get(`/admissions/by-patient/${patientData.id}`);
          setAdmissions(admissionsData);
        }
      } catch (error) {
        console.error("Error al buscar los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [patientUuid]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!patient) {
    return <Container><Typography>Paciente no encontrado o acceso no autorizado.</Typography></Container>;
  }

  return (
    <Container maxWidth="lg">
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
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          component={Link}
          href={`/pacientes/${patient.uuid}/admision/nueva`}
        >
          Iniciar Nueva Hospitalización
        </Button>
      </Box>

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
                <TableRow
                  key={admission.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/admissions/${admission.id}`)}
                >
                  <TableCell>{new Date(admission.admission_date).toLocaleString('es-CL')}</TableCell>
                  <TableCell>{admission.diagnosis.name} ({admission.diagnosis.code})</TableCell>
                  <TableCell>{admission.discharge_date ? new Date(admission.discharge_date).toLocaleString('es-CL') : 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
