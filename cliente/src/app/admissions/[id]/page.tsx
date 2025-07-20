'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Button,
  Autocomplete,
} from '@mui/material';
import { api } from '@/lib/api';

// --- Interfaces de Datos ---
interface Patient { name: string; rut: string; }
interface Diagnosis { name: string; code: string; }
interface User { full_name: string; }
interface Medication { id: string; name: string; concentration: string; presentation: string; }
interface MedicalIndication { id: string; instructions: string; created_at: string; createdBy: User; medication: Medication; }
interface Admission { id: string; admission_date: string; patient: Patient; diagnosis: Diagnosis; }

// --- Componente Principal ---
export default function AdmissionDetailPage({ params }: { params: { id: string } }) {
  const [admission, setAdmission] = useState<Admission | null>(null);
  const [indications, setIndications] = useState<MedicalIndication[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const admissionId = params.id;

  // --- State for the new indication form ---
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  const [instructions, setInstructions] = useState('');

  const fetchData = async () => {
    try {
      const [admissionData, indicationsData, medicationsData] = await Promise.all([
        api.get(`/admissions/${admissionId}`),
        api.get(`/medical-indications/by-admission/${admissionId}`),
        api.get('/medications'), // Fetch the medications catalog
      ]);
      setAdmission(admissionData);
      setIndications(indicationsData);
      setMedications(medicationsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (admissionId) {
      fetchData();
    }
  }, [admissionId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedMedication) {
      alert('Por favor, seleccione un medicamento.');
      return;
    }
    try {
      await api.post('/medical-indications', {
        admissionId: admissionId,
        medicationId: selectedMedication.id,
        instructions: instructions,
      });
      alert('Indicación creada con éxito');
      // Limpiar formulario y recargar indicaciones
      setSelectedMedication(null);
      setInstructions('');
      fetchData(); // Vuelve a cargar los datos para mostrar la nueva indicación
    } catch (error) {
      console.error(error);
      alert('Error al crear la indicación.');
    }
  };

  if (loading) { /* ... */ }
  if (!admission) { /* ... */ }

  return (
    <Container maxWidth="md">
      {/* ... (Sección de datos de la hospitalización se mantiene igual) ... */}

      {/* SECCIÓN INDICACIONES MÉDICAS */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>Indicaciones Médicas</Typography>
        <Paper sx={{ mb: 3 }}>
          <List>{/* ... (Código para mostrar la lista de indicaciones se mantiene igual) ... */}</List>
        </Paper>

        {/* --- FORMULARIO PARA AÑADIR NUEVA INDICACIÓN --- */}
        <Typography variant="h6" component="h3" gutterBottom>Añadir Nueva Indicación</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Autocomplete
            options={medications}
            getOptionLabel={(option) => `${option.name} ${option.concentration} ${option.presentation}`}
            value={selectedMedication}
            onChange={(event, newValue) => {
              setSelectedMedication(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Buscar Medicamento" required />
            )}
          />
          <TextField
            label="Instrucciones (Posología)"
            fullWidth
            margin="normal"
            required
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Guardar Indicación
          </Button>
        </Box>
      </Box>
    </Container>
  );
}