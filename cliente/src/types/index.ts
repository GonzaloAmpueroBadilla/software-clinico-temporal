export interface Patient {
  id: number;
  uuid: string;
  name: string;
  rut: string;
  birth_date: string;
}

export interface Diagnosis {
  id: string;
  code: string;
  name: string;
}

export interface Medication {
  id: string;
  name: string;
  concentration: string;
  presentation: string;
}

export interface User {
  id: string;
  full_name: string;
  role: string;
}

export interface Admission {
  id: string;
  admission_date: string;
  discharge_date: string | null;
  patient: Patient;
  diagnosis: Diagnosis;
}

export interface MedicalIndication {
  id: string;
  instructions: string;
  created_at: string;
  createdBy: User;
  medication: Medication;
}