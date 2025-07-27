// src/lib/api.ts

const API_URL = 'http://localhost:3000';

async function request(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('authToken');

  // Creamos un objeto Headers a partir de las opciones iniciales
  const headers = new Headers(options?.headers);
  // Añadimos siempre el Content-Type para peticiones con cuerpo
  if (options.body) {
    headers.set('Content-Type', 'application/json');
  }

  // Si hay token, añadimos la cabecera de autorización
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json();
    let errorMessage = 'Error en la petición a la API';
    if (errorData && errorData.message) {
      errorMessage = errorData.message;
    }
    throw new Error(errorMessage);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  } else {
    return;
  }
}

export const api = {
  get: (endpoint: string) => request(endpoint),
  post: (endpoint: string, body: any) => request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
};