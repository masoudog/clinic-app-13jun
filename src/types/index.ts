export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image?: string;
  bio?: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Clinic {
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: {
    [key: string]: { open: string; close: string };
  };
}
