'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
  Divider,
} from '@mui/material';
import { api } from '@/lib/api';

// --- Interfaces de Datos ---
interface User { full_name: string; }
interface Medication { id: string; name: string; concentration: string; presentation: string; }
interface MedicalIndication { id: string; instructions: string; created_at: string; createdBy: User; medication: Medication; }
interface ProgressNote { id: string; note: string; created_at: string; createdBy: User; }
// ... (otras interfaces se mantienen igual)

// --- Componente Principal ---
export default function AdmissionDetailPage() {
  const [admission, setAdmission] = useState<any | null>(null);
  const [indications, setIndications] = useState<MedicalIndication[]>([]);
  const [progressNotes, setProgressNotes] = useState<ProgressNote[]>([]); // <-- Nuevo estado
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams(); // <-- USAR EL HOOK
  const admissionId = params.id as string;

  // --- Estados para los formularios ---
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  const [instructions, setInstructions] = useState('');
  const [newNote, setNewNote] = useState(''); // <-- Nuevo estado

  const fetchData = async () => {
    try {
      // Añadimos la búsqueda de notas de progreso
      const [admissionData, indicationsData, medicationsData, progressNotesData] = await Promise.all([
        api.get(`/admissions/${admissionId}`),
        api.get(`/medical-indications/by-admission/${admissionId}`),
        api.get('/medications'),
        api.get(`/progress-notes/by-admission/${admissionId}`), // <-- Nueva petición
      ]);
      setAdmission(admissionData);
      setIndications(indicationsData);
      setMedications(medicationsData);
      setProgressNotes(progressNotesData); // <-- Guardar notas
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

  const handleIndicationSubmit = async (event: React.FormEvent<HTMLFormElement>) => { /* ... se mantiene igual ... */ };

  // --- Lógica para guardar nueva nota de progreso ---
  const handleNoteSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await api.post('/progress-notes', {
        admissionId: admissionId,
        note: newNote,
      });
      alert('Nota de evolución guardada con éxito.');
      setNewNote('');
      fetchData(); // Recargamos todos los datos
    } catch (error) {
      console.error(error);
      alert('Error al guardar la nota.');
    }
  };

  if (loading) { /* ... */ }
  if (!admission) { /* ... */ }

  return (
    <Container maxWidth="md">
      {/* ... (Sección de datos de la hospitalización se mantiene igual) ... */}
      {/* ... (Sección de indicaciones médicas se mantiene igual) ... */}

      {/* --- SECCIÓN DE EVOLUCIÓN CLÍNICA (NUEVA) --- */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>Evolución Clínica</Typography>
        <Paper sx={{ mb: 3 }}>
          <List>
            {progressNotes.map((note) => (
              <ListItem key={note.id} divider>
                <ListItemText
                  primary={note.note}
                  secondary={`Escrito por: ${note.createdBy.full_name} el ${new Date(note.created_at).toLocaleString('es-CL')}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        <Typography variant="h6" component="h3" gutterBottom>Añadir Nota de Evolución</Typography>
        <Box component="form" onSubmit={handleNoteSubmit} noValidate>
          <TextField
            label="Nueva nota"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            required
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>Guardar Nota</Button>
        </Box>
      </Box>
    </Container>
  );
}