
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Star, Calendar } from 'lucide-react';
import { Doctor } from '@/types';

const DoctorsList: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedDoctor, setExpandedDoctor] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    
    // Load doctors from localStorage
    const loadDoctors = () => {
      const storedDoctors = localStorage.getItem('shastho_doctors');
      if (storedDoctors) {
        setDoctors(JSON.parse(storedDoctors));
      }
    };
    
    loadDoctors();
  }, [isAuthenticated, navigate]);

  const toggleExpand = (doctorId: string) => {
    setExpandedDoctor(expandedDoctor === doctorId ? null : doctorId);
  };

  const handleBookAppointment = (doctor: Doctor) => {
    // In a real app, this would navigate to an appointment booking page
    // or open a modal for booking
    navigate(`/book-appointment/${doctor.id}`);
  };

  const filteredDoctors = searchTerm.trim()
    ? doctors.filter(
        doctor =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : doctors;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h1 className="text-2xl font-bold">Doctor Lists</h1>
          
          <div className="relative mt-4 mb-6">
            <Input
              type="text"
              placeholder="Search for doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Button variant="outline" className="absolute right-0 top-0 rounded-l-none">
              Filter
            </Button>
          </div>
          
          <div className="space-y-4">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex cursor-pointer" onClick={() => toggleExpand(doctor.id)}>
                      <div className="p-4">
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                          <svg
                            className="h-8 w-8 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{doctor.name}</h3>
                            <p className="text-sm text-gray-500">
                              {doctor.specialization} | {doctor.hospital}
                            </p>
                            <p className="text-sm text-gray-500">
                              {doctor.degrees}
                            </p>
                          </div>
                          <div className="flex items-start">
                            <span className="text-lg font-semibold">{doctor.rating}</span>
                            <Star className="w-5 h-5 text-yellow-400 ml-1" fill="currentColor" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {expandedDoctor === doctor.id && (
                      <div className="p-4 pt-0 pl-24 border-t mt-2 transition-all duration-300 animate-fade-in">
                        <p className="mb-2"><span className="font-medium">Hospital:</span> {doctor.hospital}</p>
                        <p className="mb-2"><span className="font-medium">Specialization:</span> {doctor.specialization}</p>
                        <p className="mb-2"><span className="font-medium">Degrees:</span> {doctor.degrees}</p>
                        <p className="mb-2"><span className="font-medium">Contact Info:</span> {doctor.contactInfo}</p>
                        <p className="mb-2"><span className="font-medium">Location:</span> {doctor.location}</p>
                        
                        <div className="mb-2">
                          <span className="font-medium">Chambers:</span>
                          <ul className="list-disc pl-5 mt-1">
                            {doctor.chambers && doctor.chambers.length > 0 ? (
                              doctor.chambers.map((chamber, index) => (
                                <li key={index} className="text-sm">
                                  {chamber.location}: {chamber.schedule}
                                </li>
                              ))
                            ) : (
                              <li className="text-sm">
                                Apollo Hospitals Dhaka: Daily, 9 AM–5 PM
                              </li>
                            )}
                          </ul>
                        </div>
                        
                        <p className="mb-2"><span className="font-medium">Experience:</span> {doctor.experience || 'Over 15 years in practice'}</p>
                        <p className="mb-2"><span className="font-medium">Fee:</span> {doctor.fee || 1200} BDT</p>
                        
                        <div className="mt-4 flex justify-end">
                          <Button 
                            className="flex items-center" 
                            onClick={() => handleBookAppointment(doctor)}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            Book Appointment
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-lg text-gray-500">No doctors found. Please add doctors from the registration page.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorsList;
