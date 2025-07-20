'use client'; // <-- Esto lo convierte en un Componente de Cliente

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Link from 'next/link';
import { api } from '@/lib/api';

interface Patient {
  id: number;
  uuid: string;
  name: string;
  rut: string;
  birth_date: string;
}

export default function PatientTable() {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await api.get('/patients');
        setPatients(data);
      } catch (error) {
        console.error('Failed to fetch patients:', error);
        setPatients([]); // Limpia la tabla si hay un error (ej. no está logueado)
      }
    };
    fetchPatients();
  }, []);

  return (
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
  {patients.map((patient: Patient) => (
    <TableRow key={patient.uuid}>
      <TableCell>{patient.name}</TableCell>
      <TableCell>{patient.rut}</TableCell>
      <TableCell>{new Date(patient.birth_date).toLocaleDateString('es-CL')}</TableCell>
      <TableCell>
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
  );
}