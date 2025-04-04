
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, UserPlus, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  hospital: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  rating: number;
}

const Appointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    // Mock appointments - in a real app, this would come from Supabase
    const mockAppointments: Appointment[] = [
      {
        id: '1',
        doctorName: 'Dr. Humayun Kabir',
        specialty: 'Neurologist',
        hospital: 'Apollo hospital',
        date: '2023-06-15',
        time: '03:00 PM - 06:00 PM',
        status: 'confirmed',
        rating: 4.8
      },
      {
        id: '2',
        doctorName: 'Dr. Anjan Bishwas',
        specialty: 'Dermatology',
        hospital: 'Labaid hospital',
        date: '2023-06-22',
        time: '03:00 PM - 06:00 PM',
        status: 'pending',
        rating: 4.8
      },
      {
        id: '3',
        doctorName: 'Dr. Abdus Salam',
        specialty: 'Orthopedic',
        hospital: 'Labaid hospital',
        date: '2023-05-10',
        time: '03:00 PM - 06:00 PM',
        status: 'confirmed',
        rating: 4.8
      }
    ];
    
    setAppointments(mockAppointments);
  }, [user]);

  const upcomingAppointments = appointments.filter(
    app => new Date(app.date) >= new Date() && 
    (app.status === 'confirmed' || app.status === 'pending')
  );
  
  const pastAppointments = appointments.filter(
    app => new Date(app.date) < new Date() || app.status === 'cancelled'
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Appointments</h1>
          <Button>
            <Calendar className="mr-2 h-5 w-5" />
            Book New Appointment
          </Button>
        </div>
        
        <div className="flex border-b mb-6">
          <button
            className={`pb-2 px-4 font-medium ${
              activeTab === 'upcoming' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`pb-2 px-4 font-medium ${
              activeTab === 'past' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('past')}
          >
            Past
          </button>
        </div>
        
        {activeTab === 'upcoming' && (
          <div className="space-y-6">
            {upcomingAppointments.length === 0 ? (
              <Card className="border-dashed border-2">
                <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-center">No Upcoming Appointments</h3>
                  <p className="text-muted-foreground text-center mt-2">
                    You don't have any upcoming appointments scheduled
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex p-4">
                        <div className="mr-4">
                          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
                            <UserPlus className="h-8 w-8 text-brand-blue" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{appointment.doctorName}</h3>
                              <p className="text-sm text-gray-500">{appointment.specialty} | {appointment.hospital}</p>
                              <div className="mt-1">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                  appointment.status === 'confirmed' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <span className="text-lg font-semibold">{appointment.rating}</span>
                              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                              <p className="text-xs text-gray-500">Schedule Date</p>
                              <p className="text-sm">{new Date(appointment.date).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Schedule Time</p>
                              <p className="text-sm">{appointment.time}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'past' && (
          <div>
            {pastAppointments.length === 0 ? (
              <Card className="border-dashed border-2">
                <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
                  <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-center">No Past Appointments</h3>
                  <p className="text-muted-foreground text-center mt-2">
                    You don't have any past appointment records
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Past Appointments</CardTitle>
                  <CardDescription>Your previous appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Specialty</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pastAppointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell className="font-medium">{appointment.doctorName}</TableCell>
                          <TableCell>{appointment.specialty}</TableCell>
                          <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            {appointment.status === 'confirmed' ? (
                              <div className="flex items-center text-green-600">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                <span>Completed</span>
                              </div>
                            ) : (
                              <div className="flex items-center text-red-600">
                                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <span>Cancelled</span>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Appointments;
