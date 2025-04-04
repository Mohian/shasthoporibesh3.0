
export type UserRole = 'patient' | 'doctor' | 'diagnostic' | 'bloodbank';

export interface User {
  id: string;
  phone: string;
  role: UserRole;
  name?: string;
  email?: string;
  createdAt: string;
  lastLoginAt: string;
}

export interface Patient {
  id: string;
  userId: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  height?: string;
  weight?: string;
  isBloodDonor: boolean;
}

export interface Doctor {
  id: string;
  userId: string;
  name: string;
  specialization: string;
  degrees: string;
  hospital: string;
  experience: string;
  contactInfo: string;
  location: string;
  chambers: Chamber[];
  rating: number;
  fee: number;
}

export interface Chamber {
  location: string;
  schedule: string;
}

export interface BloodBank {
  id: string;
  userId: string;
  name: string;
  address: string;
  contactInfo: string;
  email: string;
  description: string;
  bloodTypes: BloodTypeCount[];
  services: string[];
  operatingHours: string;
  website?: string;
}

export interface BloodTypeCount {
  type: string;
  count: number;
}

export interface DiagnosticCenter {
  id: string;
  userId: string;
  name: string;
  address: string;
  contactInfo: string;
  email: string;
  description: string;
  services: string[];
  operatingHours: string;
  website?: string;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  contactInfo: string;
  website?: string;
  specialties: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  problem?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  diagnosis: string;
  medications: Medication[];
  advice: string;
  followUp?: string;
}

export interface Medication {
  name: string;
  dosage: string;
  duration: string;
  instruction: string;
}
