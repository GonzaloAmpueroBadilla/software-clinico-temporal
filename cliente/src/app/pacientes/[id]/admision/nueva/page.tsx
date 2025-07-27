'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Container,
  Typography,
  Box,
  Button,
  Autocomplete,
  TextField,
  CircularProgress,
} from '@mui/material';
import { api } from '@/lib/api';
// Ajusta la ruta según la ubicación real del archivo Diagnosis
import type { Diagnosis } from '@/types'; // Cambia la ruta según corresponda

export default function NuevaAdmisionPage() {
  const router = useRouter();
  const params = useParams();
  const patientId = params.id as string; // UUID del paciente

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<Diagnosis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const data = await api.get('/diagnoses');
        setDiagnoses(data);
      } catch (error) {
        console.error("Error al buscar diagnósticos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDiagnoses();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedDiagnosis) {
      alert('Por favor, seleccione un diagnóstico.');
      return;
    }

    try {
      await api.post('/admissions', {
        patientId: patientId, // Enviamos el UUID del paciente
        diagnosisId: selectedDiagnosis.id,
      });

      alert('Hospitalización creada con éxito');
      router.push(`/pacientes/${patientId}`); // Vuelve a la página de detalles
    } catch (error) {
      console.error("Error al crear la hospitalización:", error);
      alert('Hubo un error al crear la hospitalización.');
    }
  };

  if (loading) {
    return <Container sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Container>;
  }

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Iniciar Nueva Hospitalización
        </Typography>
        <Typography sx={{ mb: 2 }}>
          Para el paciente con ID: {patientId}
        </Typography>
        
        <Autocomplete
          options={diagnoses}
          getOptionLabel={(option) => `${option.code} - ${option.name}`}
          onChange={(event, newValue) => {
            setSelectedDiagnosis(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Buscar Diagnóstico de Ingreso" margin="normal" required />
          )}
        />
        
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          Guardar Hospitalización
        </Button>
      </Box>
    </Container>
  );
}