'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Button,
} from '@mui/material';
import { api } from '@/lib/api';

interface EpicrisisData {
  epicrisisText: string;
}

export default function EpicrisisPage() {
  const [epicrisis, setEpicrisis] = useState<EpicrisisData | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const admissionId = params.id as string;

  useEffect(() => {
    const fetchEpicrisis = async () => {
      if (!admissionId) return;
      try {
        const data = await api.get(`/admissions/${admissionId}/epicrisis`);
        setEpicrisis(data);
      } catch (error) {
        console.error("Error al buscar la epicrisis:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEpicrisis();
  }, [admissionId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!epicrisis) {
    return <Container><Typography>No se pudo generar la epicrisis.</Typography></Container>;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Epicrisis
        </Typography>
        <Button variant="contained" onClick={handlePrint}>
          Imprimir
        </Button>
      </Box>
      <Paper sx={{ p: 3 }}>
        <Typography component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
          {epicrisis.epicrisisText}
        </Typography>
      </Paper>
    </Container>
  );
}