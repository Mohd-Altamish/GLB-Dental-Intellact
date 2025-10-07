export type Role = 'patient' | 'dentist' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: Role;
};

export type Diagnosis = 'Gingivitis' | 'Abscess' | 'Cavity' | 'Plaque' | 'Healthy';

export type Report = {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  diagnosis: Diagnosis;
  confidence: number;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export type Appointment = {
  id: string;
  patientName: string;
  dentistName: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
};

export type ChatMessage = {
  id: string;
  sender: 'patient' | 'dentist';
  text: string;
  timestamp: string;
};
