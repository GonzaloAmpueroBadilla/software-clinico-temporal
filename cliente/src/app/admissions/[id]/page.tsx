'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Container, Typography, Box, CircularProgress, Card, CardContent, List, ListItem, ListItemText, Paper, TextField, Button, Autocomplete, Divider, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel
} from '@mui/material';
import { api } from '@/lib/api';
import type { Patient, Diagnosis, Admission, Medication, MedicalIndication, User } from '@/types';

// --- Interfaz para el Examen Físico ---
interface PhysicalExam {
  id: string; created_at: string; createdBy: User;
  head_neck?: string; head_neck_details?: string;
  thorax?: string; thorax_details?: string;
  abdomen?: string; abdomen_details?: string;
  genital?: string; genital_details?: string;
  upper_extremities?: string; upper_extremities_details?: string;
  lower_extremities?: string; lower_extremities_details?: string;
}

// --- Componente Principal ---
export default function AdmissionDetailPage() {
  const [admission, setAdmission] = useState<Admission | null>(null);
  const [indications, setIndications] = useState<MedicalIndication[]>([]);
  const [progressNotes, setProgressNotes] = useState<any[]>([]);
  const [physicalExams, setPhysicalExams] = useState<PhysicalExam[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const admissionId = params.id as string;
  const router = useRouter();

  // Estados para los formularios
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  const [instructions, setInstructions] = useState('');
  const [newNote, setNewNote] = useState('');
  const [examState, setExamState] = useState<{ [key: string]: string }>({});

  const fetchData = async () => {
    if (!admissionId) return;
    try {
      setLoading(true);
      const [admissionData, indicationsData, medicationsData, progressNotesData, physicalExamsData] = await Promise.all([
        api.get(`/admissions/${admissionId}`),
        api.get(`/medical-indications/by-admission/${admissionId}`),
        api.get('/medications'),
        api.get(`/progress-notes/by-admission/${admissionId}`),
        api.get(`/physical-exams/by-admission/${admissionId}`),
      ]);
      setAdmission(admissionData);
      setIndications(indicationsData);
      setMedications(medicationsData);
      setProgressNotes(progressNotesData);
      setPhysicalExams(physicalExamsData);
    } catch (error) { console.error("Error fetching data:", error); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, [admissionId]);

  const handleIndicationSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedMedication) return alert('Seleccione un medicamento.');
    try {
      await api.post('/medical-indications', { admissionId, medicationId: selectedMedication.id, instructions });
      alert('Indicación creada con éxito.');
      setSelectedMedication(null); setInstructions('');
      fetchData();
    } catch (error) { console.error(error); alert('Error al crear la indicación.'); }
  };
  
  const handleNoteSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await api.post('/progress-notes', { admissionId, note: newNote });
      alert('Nota de evolución guardada con éxito.');
      setNewNote('');
      fetchData();
    } catch (error) { console.error(error); alert('Error al guardar la nota.'); }
  };

  const handleExamSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await api.post('/physical-exams', { admissionId, ...examState });
      alert('Examen Físico guardado con éxito.');
      setExamState({});
      fetchData();
    } catch (error) { console.error(error); alert('Error al guardar el examen físico.'); }
  };

  const handleExamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExamState({ ...examState, [e.target.name]: e.target.value });
  };

  if (loading) { return <Container sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Container>; }
  if (!admission) { return <Container><Typography>Hospitalización no encontrada.</Typography></Container>; }

  return (
    <Container maxWidth="md">
      {/* --- SECCIÓN DATOS DE LA HOSPITALIZACIÓN --- */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>Detalles de la Hospitalización</Typography>
        <Card><CardContent>
            <Typography variant="h6">Paciente: {admission.patient.name}</Typography>
            <Typography color="text.secondary">RUT: {admission.patient.rut}</Typography>
            <Typography color="text.secondary">Fecha de Ingreso: {new Date(admission.admission_date).toLocaleString('es-CL')}</Typography>
            <Typography color="text.secondary">Diagnóstico: {admission.diagnosis.name} ({admission.diagnosis.code})</Typography>
        </CardContent></Card>
      </Box>

      {/* --- SECCIÓN INDICACIONES MÉDICAS --- */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>Indicaciones Médicas</Typography>
        <Paper sx={{ mb: 3 }}><List>
            {indications.map((indication) => (
              <ListItem key={indication.id} divider><ListItemText primary={`${indication.medication.name} ${indication.medication.concentration}`} secondary={`${indication.instructions} - Indicado por: ${indication.createdBy.full_name} el ${new Date(indication.created_at).toLocaleString('es-CL')}`} /></ListItem>
            ))}
        </List></Paper>
        <Typography variant="h6" component="h3" gutterBottom>Añadir Nueva Indicación</Typography>
        <Box component="form" onSubmit={handleIndicationSubmit} noValidate>
            <Autocomplete options={medications} getOptionLabel={(option) => `${option.name} ${option.concentration}`} value={selectedMedication} onChange={(e, val) => setSelectedMedication(val)} renderInput={(params) => (<TextField {...params} label="Buscar Medicamento" required />)} />
            <TextField label="Instrucciones" fullWidth margin="normal" required value={instructions} onChange={(e) => setInstructions(e.target.value)} />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>Guardar Indicación</Button>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* --- SECCIÓN EVOLUCIÓN CLÍNICA --- */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>Evolución Clínica</Typography>
        <Paper sx={{ mb: 3 }}><List>
            {progressNotes.map((note) => (
              <ListItem key={note.id} divider><ListItemText primary={note.note} secondary={`Escrito por: ${note.createdBy.full_name} el ${new Date(note.created_at).toLocaleString('es-CL')}`} /></ListItem>
            ))}
        </List></Paper>
        <Typography variant="h6" component="h3" gutterBottom>Añadir Nota de Evolución</Typography>
        <Box component="form" onSubmit={handleNoteSubmit} noValidate>
            <TextField label="Nueva nota" fullWidth multiline rows={4} margin="normal" required value={newNote} onChange={(e) => setNewNote(e.target.value)} />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>Guardar Nota</Button>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* --- SECCIÓN EXAMEN FÍSICO --- */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>Examen Físico Segmentario</Typography>
        <Paper sx={{ mb: 3, p: 2 }}>
            {physicalExams.length > 0 ? (<Typography>Último examen registrado.</Typography>) : (<Typography>No hay exámenes físicos registrados.</Typography>)}
        </Paper>
        <Typography variant="h6" component="h3" gutterBottom>Registrar Nuevo Examen</Typography>
        <Box component="form" onSubmit={handleExamSubmit} noValidate>
            {['head_neck', 'thorax', 'abdomen', 'genital', 'upper_extremities', 'lower_extremities'].map((section) => (
              <Box key={section} sx={{ mb: 2 }}>
                <FormControl component="fieldset" margin="normal" fullWidth>
                  <FormLabel component="legend">{section.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</FormLabel>
                  <RadioGroup row name={section} value={examState[section] || ''} onChange={handleExamChange}>
                    <FormControlLabel value="Normal" control={<Radio />} label="Normal" />
                    <FormControlLabel value="Alterado" control={<Radio />} label="Alterado" />
                  </RadioGroup>
                  {examState[section] === 'Alterado' && <TextField name={`${section}_details`} label="Detalles" fullWidth margin="dense" value={examState[`${section}_details`] || ''} onChange={handleExamChange} />}
                </FormControl>
                <Divider />
              </Box>
            ))}
            <Button type="submit" variant="contained" sx={{ mt: 3 }}>Guardar Examen</Button>
        </Box>
      </Box>
    </Container>
  );
}