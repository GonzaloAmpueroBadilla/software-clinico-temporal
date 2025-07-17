'use client'; // Directiva para indicar que es un componente de cliente

import { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';

export default function NuevoPacientePage() {
  // Estados para guardar los valores de los campos del formulario
  const [name, setName] = useState('');
  const [rut, setRut] = useState('');
  const [birthDate, setBirthDate] = useState('');

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita que la página se recargue

    const patientData = { name, rut, birth_date: birthDate };

    try {
      const response = await fetch('http://localhost:3000/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      });

      if (!response.ok) {
        throw new Error('Error al crear el paciente');
      }

      const createdPatient = await response.json();
      alert(`Paciente creado con éxito. ID: ${createdPatient.id}`);
      
      // Limpiar el formulario
      setName('');
      setRut('');
      setBirthDate('');

    } catch (error) {
      console.error(error);
      alert('Hubo un error al crear el paciente.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Crear Nuevo Paciente
        </Typography>
        <TextField
          label="Nombre Completo"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="RUT"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={rut}
          onChange={(e) => setRut(e.target.value)}
        />
        <TextField
          label="Fecha de Nacimiento"
          type="date"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Guardar Paciente
        </Button>
      </Box>
    </Container>
  );
}