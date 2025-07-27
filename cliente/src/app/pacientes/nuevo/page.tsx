'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { api } from '@/lib/api'; // <-- IMPORTANTE: USAR NUESTRO API CLIENT

export default function NuevoPacientePage() {
  const [name, setName] = useState('');
  const [rut, setRut] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const patientData = { name, rut, birth_date: birthDate };
    try {
      // Usamos api.post para que envíe el token de autorización
      await api.post('/patients', patientData);
      alert('Paciente creado con éxito.');
      router.push('/pacientes');
    } catch (error) {
      console.error("Error al crear el paciente:", error);
      alert('Hubo un error al crear el paciente.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Crear Nuevo Paciente
        </Typography>
        <TextField label="Nombre Completo" variant="outlined" margin="normal" required fullWidth value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="RUT" variant="outlined" margin="normal" required fullWidth value={rut} onChange={(e) => setRut(e.target.value)} />
        <TextField
          label="Fecha de Nacimiento"
          type="date"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Guardar Paciente
        </Button>
      </Box>
    </Container>
  );
}