'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Autocomplete,
  TextField,
  CircularProgress,
} from '@mui/material';
import { useRouter } from 'next/navigation';

// Interfaces
interface Diagnosis {
  id: string;
  name: string;
  code: string;
}

export default function NuevaAdmisionPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const patientId = params.id; // Este es el UUID del paciente

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<Diagnosis | null>(null);
  const [loading, setLoading] = useState(true);

  // Efecto para cargar los diagnósticos desde la API al iniciar la página
  useEffect(() => {
    async function fetchDiagnoses() {
      try {
        const res = await fetch('http://localhost:3000/diagnoses');
        if (!res.ok) throw new Error('Failed to fetch diagnoses');
        const data = await res.json();
        setDiagnoses(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchDiagnoses();
  }, []);

// Función que se ejecuta al enviar el formulario
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault(); // Evita que la página se recargue

  if (!selectedDiagnosis) {
    alert('Por favor, seleccione un diagnóstico.');
    return;
  }

  try {
    // Lógica para guardar la hospitalización (AHORA ACTIVADA)
    const response = await fetch('http://localhost:3000/admissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patientId: patientId, // El UUID que ya tenemos de la URL
        diagnosisId: selectedDiagnosis.id,
      }),
    });

    if (!response.ok) {
      // Si el servidor da un error, lo mostramos.
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear la hospitalización');
    }

    alert('Hospitalización creada con éxito');
    router.push(`/pacientes/${patientId}`); // Vuelve a la página de detalles del paciente

} catch (error) {
  console.error(error);
  // Verificamos si el error es una instancia de la clase Error
  if (error instanceof Error) {
    alert(`Error: ${error.message}`);
  } else {
    // Si es otra cosa, mostramos un mensaje genérico
    alert('Ocurrió un error inesperado.');
  }
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
        <Typography>Paciente ID (UUID): {patientId}</Typography>
        
        <Autocomplete
          options={diagnoses}
          getOptionLabel={(option) => `${option.code} - ${option.name}`}
          onChange={(event, newValue) => {
            setSelectedDiagnosis(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Buscar Diagnóstico" margin="normal" required />
          )}
        />
        
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          Guardar Hospitalización
        </Button>
      </Box>
    </Container>
  );
}