
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ExternalLink } from 'lucide-react';
import { Hospital } from '@/types';

const HospitalsList: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedHospital, setExpandedHospital] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    
    // Load hospitals from localStorage or initialize with mock data
    const loadHospitals = () => {
      const storedHospitals = localStorage.getItem('shastho_hospitals');
      if (storedHospitals) {
        setHospitals(JSON.parse(storedHospitals));
      } else {
        // Mock hospital data
        const mockHospitals: Hospital[] = [
          {
            id: 'hosp_1',
            name: 'Mohian Hospital Dhaka',
            address: 'New Market, Dhaka ',
            contactInfo: '+123456789',
            website: 'www.mohiancare.com',
            specialties: ['Multi-specialty hospital with advanced care in cardiology, oncology, and orthopedics.']
          },
          {
            id: 'hosp_2',
            name: 'Square Hospital',
            address: '18, Bir Uttam Qazi Nuruzzaman Sarak, West Panthapath, Dhaka-1205',
            contactInfo: '+880-2-8159457',
            website: 'www.squarehospital.com',
            specialties: ['Cardiology', 'Neurology', 'Gastroenterology', 'Oncology']
          },
          {
            id: 'hosp_3',
            name: 'United Hospital',
            address: 'Plot 15, Road 71, Gulshan, Dhaka-1212',
            contactInfo: '+880-2-8836444',
            website: 'www.uhlbd.com',
            specialties: ['Cardiac Center', 'General Surgery', 'Orthopedics', 'Emergency Services']
          },
          {
            id: 'hosp_4',
            name: 'Labaid Specialized Hospital',
            address: 'House #1, Road #4, Dhanmondi, Dhaka-1205',
            contactInfo: '+880-2-9676356',
            website: 'www.labaidgroup.com',
            specialties: ['Cardiology', 'Nephrology', 'Neurology', 'Gynecology']
          },
          {
            id: 'hosp_5',
            name: 'Ibn Sina Hospital',
            address: 'House #48, Road #9/A, Dhanmondi, Dhaka-1209',
            contactInfo: '+880-2-9126625',
            website: 'www.ibnsinatrust.com',
            specialties: ['Diagnostic Center', 'General Surgery', 'Pediatrics', 'Dentistry']
          }
        ];
        
        setHospitals(mockHospitals);
        localStorage.setItem('shastho_hospitals', JSON.stringify(mockHospitals));
      }
    };
    
    loadHospitals();
  }, [isAuthenticated, navigate]);

  const toggleExpand = (hospitalId: string) => {
    setExpandedHospital(expandedHospital === hospitalId ? null : hospitalId);
  };

  const handleVisit = (hospital: Hospital) => {
    // In a real app, this might open the hospital's website
    if (hospital.website) {
      window.open(hospital.website.startsWith('http') ? hospital.website : `http://${hospital.website}`, '_blank');
    }
  };

  const filteredHospitals = searchTerm.trim()
    ? hospitals.filter(
        hospital =>
          hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hospital.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hospital.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : hospitals;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h1 className="text-2xl font-bold">Hospital Lists</h1>
          
          <div className="relative mt-4 mb-6">
            <Input
              type="text"
              placeholder="Search for hospitals or specialties..."
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
            {filteredHospitals.map((hospital) => (
              <Card key={hospital.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex cursor-pointer" onClick={() => toggleExpand(hospital.id)}>
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
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="font-semibold text-lg">{hospital.name}</h3>
                      <p className="text-sm text-gray-500">Contact Info: {hospital.contactInfo}</p>
                      <p className="text-sm text-gray-500">Location: {hospital.address}</p>
                    </div>
                  </div>
                  
                  {expandedHospital === hospital.id && (
                    <div className="p-4 pt-0 pl-24 border-t mt-2 transition-all duration-300 animate-fade-in">
                      <div className="mb-2">
                        <span className="font-medium">Specialties:</span>
                        <ul className="list-disc pl-5 mt-1">
                          {hospital.specialties.map((specialty, index) => (
                            <li key={index} className="text-sm">{specialty}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {hospital.website && (
                        <p className="mb-2">
                          <span className="font-medium">Website:</span>{' '}
                          <a
                            href={hospital.website.startsWith('http') ? hospital.website : `http://${hospital.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {hospital.website}
                          </a>
                        </p>
                      )}
                      
                      <div className="mt-4 flex justify-end">
                        <Button 
                          className="flex items-center" 
                          onClick={() => handleVisit(hospital)}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Visit
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HospitalsList;
