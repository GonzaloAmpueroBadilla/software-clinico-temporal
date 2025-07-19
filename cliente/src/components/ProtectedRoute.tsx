'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { CircularProgress, Container } from '@mui/material';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Si el token ya fue revisado y no existe, redirige al login.
    if (token === null) {
      router.push('/login');
    }
  }, [token, router]);

  // Mientras el token se está verificando, muestra un 'cargando'.
  if (token === undefined || token === null) {
    return <Container sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Container>;
  }

  // Si hay un token, muestra el contenido de la página.
  return <>{children}</>;
}