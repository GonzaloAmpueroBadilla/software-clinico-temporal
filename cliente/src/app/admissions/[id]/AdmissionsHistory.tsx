'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { api } from '@/lib/api';
import type { Admission } from '@/types';

export default function AdmissionsHistory({ patientId }: { patientId: number }) {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAdmissions = async () => {
      if (!patientId) return;
      try {
        const data = await api.get(`/admissions/by-patient/${patientId}`);
        setAdmissions(data);
      } catch (error) {
        console.error("Error al buscar hospitalizaciones:", error);
      }
    };
    fetchAdmissions();
  }, [patientId]);

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>Historial de Hospitalizaciones</Typography>
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
  );
}