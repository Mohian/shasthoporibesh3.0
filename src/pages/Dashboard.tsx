
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Building2, UserPlus, Beaker, Droplet, ShoppingBag, Calendar, Plus, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [availability, setAvailability] = useState('Mon - Tue, 03:00 PM - 06:00 PM');
  const [bloodGroups, setBloodGroups] = useState([
    { type: 'A+', count: 5 },
    { type: 'A-', count: 2 },
    { type: 'B+', count: 8 },
    { type: 'B-', count: 3 },
    { type: 'AB+', count: 4 },
    { type: 'AB-', count: 1 },
    { type: 'O+', count: 7 },
    { type: 'O-', count: 2 }
  ]);
  const [diagnosticServices, setDiagnosticServices] = useState([
    { name: 'X-Ray', price: 1200 },
    { name: 'MRI', price: 8000 },
    { name: 'Blood Test', price: 500 },
    { name: 'CT Scan', price: 5000 }
  ]);
  const [newService, setNewService] = useState({ name: '', price: '' });
  const [prescription, setPrescription] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
    
    // Get user profile data based on role
    if (user) {
      const profileKey = `shastho_${user.role}s`;
      const storedData = localStorage.getItem(profileKey);
      
      if (storedData) {
        const profiles = JSON.parse(storedData);
        const userProfile = profiles.find((p: any) => p.userId === user.id);
        
        if (userProfile && userProfile.name) {
          setName(userProfile.name);
        } else if (user.name) {
          setName(user.name);
        }
      } else if (user.name) {
        setName(user.name);
      }
    }
  }, [isAuthenticated, navigate, user]);

  // Mock data for stats
  const stats = {
    hospitals: 76,
    diagnosticCenters: 3,
    bloodBanks: 24,
    pharmacies: 24,
    doctors: 3
  };

  // Mock data for appointments
  const appointments = [
    {
      id: '1',
      doctorName: 'Dr. Humayun Kabir',
      patientName: 'Abdul Karim',
      patientPhone: '+8801712345678',
      specialty: 'Neurologist',
      hospital: 'Apollo hospital',
      date: 'Mon - Tue',
      time: '03:00 PM - 06:00 PM',
      status: 'confirmed',
      rating: 4.8
    },
    {
      id: '2',
      doctorName: 'Dr. Anjan Bishwas',
      patientName: 'Mahmuda Begum',
      patientPhone: '+8801812345678',
      specialty: 'Dermatology',
      hospital: 'Labaid hospital',
      date: 'Mon - Tue',
      time: '03:00 PM - 06:00 PM',
      status: 'pending',
      rating: 4.8
    },
    {
      id: '3',
      doctorName: 'Dr. Abdus Salam',
      patientName: 'Kamal Ahmed',
      patientPhone: '+8801912345678',
      specialty: 'Orthopedic',
      hospital: 'Labaid hospital',
      date: 'Mon - Tue',
      time: '03:00 PM - 06:00 PM',
      status: 'confirmed',
      rating: 4.8
    }
  ];

  const handleUpdateBloodGroup = (index: number, field: 'type' | 'count', value: string) => {
    const updated = [...bloodGroups];
    if (field === 'count') {
      updated[index].count = parseInt(value) || 0;
    } else {
      updated[index].type = value;
    }
    setBloodGroups(updated);
  };

  const handleAddService = () => {
    if (newService.name && newService.price) {
      setDiagnosticServices([
        ...diagnosticServices,
        { name: newService.name, price: parseInt(newService.price) || 0 }
      ]);
      setNewService({ name: '', price: '' });
    }
  };

  const handleSavePrescription = () => {
    console.log('Saving prescription for patient:', selectedPatient);
    console.log('Prescription text:', prescription);
    // In a real app, this would save to Supabase
    setSelectedPatient(null);
    setPrescription('');
  };

  const handleSaveAvailability = () => {
    setIsEditing(false);
    console.log('New availability:', availability);
    // In a real app, this would save to Supabase
  };

  const getPatientDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <Card className="stat-card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6 flex flex-col items-center">
            <Building2 className="h-8 w-8 text-brand-blue mb-2" />
            <h3 className="text-lg font-medium text-gray-700">Hospital</h3>
            <p className="text-3xl font-bold text-brand-blue">{stats.hospitals}</p>
          </CardContent>
        </Card>
        
        <Card className="stat-card bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
          <CardContent className="p-6 flex flex-col items-center">
            <Beaker className="h-8 w-8 text-brand-teal mb-2" />
            <h3 className="text-lg font-medium text-gray-700">Diagnostic Center</h3>
            <p className="text-3xl font-bold text-brand-teal">{stats.diagnosticCenters}</p>
          </CardContent>
        </Card>
        
        <Card className="stat-card bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6 flex flex-col items-center">
            <Droplet className="h-8 w-8 text-red-500 mb-2" />
            <h3 className="text-lg font-medium text-gray-700">Blood bank</h3>
            <p className="text-3xl font-bold text-red-500">{stats.bloodBanks}</p>
          </CardContent>
        </Card>
        
        <Card className="stat-card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6 flex flex-col items-center">
            <ShoppingBag className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="text-lg font-medium text-gray-700">Pharmacy</h3>
            <p className="text-3xl font-bold text-green-600">{stats.pharmacies}</p>
          </CardContent>
        </Card>
        
        <Card className="stat-card bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
          <CardContent className="p-6 flex flex-col items-center">
            <UserPlus className="h-8 w-8 text-cyan-600 mb-2" />
            <h3 className="text-lg font-medium text-gray-700">Doctor</h3>
            <p className="text-3xl font-bold text-cyan-600">{stats.doctors}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
          <Button variant="outline" size="sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {appointments.map((appointment) => (
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
                        <p className="text-sm">{appointment.date}</p>
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
      </div>
    </>
  );

  const getDoctorDashboard = () => (
    <>
      <div className="mb-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Availability</CardTitle>
            <CardDescription>Set your working hours for patients to book appointments</CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-4">
                <Input 
                  value={availability} 
                  onChange={(e) => setAvailability(e.target.value)}
                  placeholder="e.g. Mon-Fri, 9:00 AM - 5:00 PM" 
                />
                <Button onClick={handleSaveAvailability}>Save Availability</Button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Current Availability:</p>
                  <p className="text-lg">{availability}</p>
                </div>
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Calendar View
          </Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{appointment.patientName}</p>
                    <p className="text-sm text-muted-foreground">{appointment.patientPhone}</p>
                  </div>
                </TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    appointment.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                  </span>
                </TableCell>
                <TableCell>
                  {appointment.status === 'pending' ? (
                    <Button size="sm" variant="outline" className="mr-2">Confirm</Button>
                  ) : (
                    <Button 
                      size="sm" 
                      onClick={() => {
                        setSelectedPatient(appointment.patientPhone);
                        setPrescription('');
                      }}
                    >
                      Write Prescription
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {selectedPatient && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Write Prescription</CardTitle>
              <CardDescription>
                Creating prescription for patient: {selectedPatient}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Enter prescription details..."
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
                rows={8}
                className="resize-none"
              />
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setSelectedPatient(null)}>Cancel</Button>
              <Button onClick={handleSavePrescription}>Save Prescription</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </>
  );

  const getBloodBankDashboard = () => (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Available Blood Groups</CardTitle>
          <CardDescription>Update your blood inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bloodGroups.map((group, index) => (
              <Card key={index} className="border border-muted">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <Input 
                      className="max-w-20 text-center font-bold text-lg"
                      value={group.type} 
                      onChange={(e) => handleUpdateBloodGroup(index, 'type', e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Available Units:</span>
                    <Input
                      type="number"
                      className="max-w-20 text-center"
                      value={group.count}
                      onChange={(e) => handleUpdateBloodGroup(index, 'count', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </>
  );

  const getDiagnosticDashboard = () => (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Diagnostic Services</CardTitle>
          <CardDescription>Manage your diagnostic services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 space-y-4">
            <div className="flex gap-4">
              <Input
                placeholder="Service name"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Price (BDT)"
                value={newService.price}
                onChange={(e) => setNewService({ ...newService, price: e.target.value })}
              />
              <Button onClick={handleAddService}>
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Name</TableHead>
                <TableHead>Price (BDT)</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {diagnosticServices.map((service, index) => (
                <TableRow key={index}>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.price}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>
            Save All Changes
          </Button>
        </CardFooter>
      </Card>
    </>
  );

  const renderDashboardByRole = () => {
    switch (user?.role) {
      case 'patient':
        return getPatientDashboard();
      case 'doctor':
        return getDoctorDashboard();
      case 'bloodbank':
        return getBloodBankDashboard();
      case 'diagnostic':
        return getDiagnosticDashboard();
      default:
        return <p>No dashboard available for your role.</p>;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold">Welcome back, {name || 'User'}!</h1>
          <p className="text-gray-600">Let's continue your journey to better health with Sustho Poribesh.</p>
        </div>
        
        {renderDashboardByRole()}
      </div>
    </Layout>
  );
};

export default Dashboard;
