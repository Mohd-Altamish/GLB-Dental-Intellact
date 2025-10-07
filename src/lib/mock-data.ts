import { User, Report, Appointment, ChatMessage } from '@/lib/types';

export const patients: User[] = [
  { id: 'pat1', name: 'Alice Johnson', email: 'alice@example.com', avatarUrl: 'https://picsum.photos/seed/patient1/100/100', role: 'patient' },
  { id: 'pat2', name: 'Bob Williams', email: 'bob@example.com', avatarUrl: 'https://picsum.photos/seed/patient2/100/100', role: 'patient' },
  { id: 'pat3', name: 'Charlie Brown', email: 'charlie@example.com', avatarUrl: 'https://picsum.photos/seed/patient3/100/100', role: 'patient' },
];

export const dentists: User[] = [
  { id: 'den1', name: 'Dr. Evelyn Reed', email: 'dreeve@example.com', avatarUrl: 'https://picsum.photos/seed/dentist1/100/100', role: 'dentist' },
  { id: 'den2', name: 'Dr. Samuel Chen', email: 'drsam@example.com', avatarUrl: 'https://picsum.photos/seed/dentist2/100/100', role: 'dentist' },
];

export const admins: User[] = [
  { id: 'adm1', name: 'Admin User', email: 'admin@dentalintellect.com', avatarUrl: 'https://picsum.photos/seed/admin1/100/100', role: 'admin' },
];

export const reports: Report[] = [
  {
    id: 'rep1',
    patientId: 'pat1',
    patientName: 'Alice Johnson',
    date: '2023-10-26',
    diagnosis: 'Cavity',
    confidence: 0.92,
    description: 'A small cavity was detected on the upper molar. Recommend consultation for filling.',
    imageUrl: 'https://picsum.photos/seed/cavity1/600/400',
    imageHint: 'tooth decay'
  },
  {
    id: 'rep2',
    patientId: 'pat1',
    patientName: 'Alice Johnson',
    date: '2023-08-15',
    diagnosis: 'Healthy',
    confidence: 0.98,
    description: 'No immediate issues found. Gums and teeth appear healthy. Continue regular hygiene.',
    imageUrl: 'https://picsum.photos/seed/healthy1/600/400',
    imageHint: 'healthy smile'
  },
  {
    id: 'rep3',
    patientId: 'pat2',
    patientName: 'Bob Williams',
    date: '2023-10-20',
    diagnosis: 'Gingivitis',
    confidence: 0.85,
    description: 'Mild inflammation of the gums observed. Improved oral hygiene is recommended.',
    imageUrl: 'https://picsum.photos/seed/gingivitis1/600/400',
    imageHint: 'gum inflammation'
  },
];

export const appointments: Appointment[] = [
  { id: 'app1', patientName: 'Alice Johnson', dentistName: 'Dr. Evelyn Reed', date: '2023-11-10', time: '10:00 AM', status: 'Confirmed' },
  { id: 'app2', patientName: 'Bob Williams', dentistName: 'Dr. Samuel Chen', date: '2023-11-12', time: '02:30 PM', status: 'Confirmed' },
  { id: 'app3', patientName: 'Charlie Brown', dentistName: 'Dr. Evelyn Reed', date: '2023-11-15', time: '11:00 AM', status: 'Pending' },
];

export const chatHistory: ChatMessage[] = [
    { id: 'msg1', sender: 'patient', text: 'Hi Dr. Reed, I\'ve been having some sensitivity in my lower left tooth for the past few days.', timestamp: '3:45 PM' },
    { id: 'msg2', sender: 'dentist', text: 'Hello Alice. Thank you for reaching out. Is the sensitivity constant, or does it happen with hot or cold foods?', timestamp: '3:46 PM' },
    { id: 'msg3', sender: 'patient', text: 'It\'s mostly when I drink something cold. It\'s a sharp, but brief pain.', timestamp: '3:47 PM' },
    { id: 'msg4', sender: 'dentist', text: 'I see. Based on your recent assessment, there was a small cavity detected in that area. This sensitivity is likely related. I recommend we schedule a filling.', timestamp: '3:48 PM' },
    { id: 'msg5', sender: 'patient', text: 'Okay, that makes sense. Can we book an appointment for next week?', timestamp: '3:49 PM' },
    { id: 'msg6', sender: 'dentist', text: 'Of course. My assistant will reach out to you shortly with available slots. In the meantime, try to avoid very cold or sugary foods to manage the discomfort.', timestamp: '3:50 PM' },
    { id: 'msg7', sender: 'patient', text: 'Will do. Thanks, Doctor!', timestamp: '3:51 PM' },
];
