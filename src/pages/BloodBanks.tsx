
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Star, ExternalLink, Phone } from 'lucide-react';
import { BloodBank } from '@/types';

const BloodBanksList: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedBloodBank, setExpandedBloodBank] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    
    // Load blood banks from localStorage
    const loadBloodBanks = () => {
      const storedBloodBanks = localStorage.getItem('shastho_bloodbanks');
      if (storedBloodBanks) {
        setBloodBanks(JSON.parse(storedBloodBanks));
      } else {
        // Add mock data if no blood banks exist
        const mockBloodBanks: BloodBank[] = [
          {
            id: 'bb_1',
            userId: 'user_1',
            name: 'Sandhani National Blood Bank',
            address: 'Dhaka Medical College Campus, Dhaka 1000, Bangladesh',
            contactInfo: '+880-2-9668690',
            email: 'info@sandhani.org',
            description: 'Leading blood bank in Bangladesh providing safe blood for transfusions.',
            bloodTypes: [
              { type: 'A+', count: 25 },
              { type: 'B+', count: 30 },
              { type: 'O+', count: 50 },
              { type: 'AB+', count: 10 },
              { type: 'A-', count: 5 },
              { type: 'B-', count: 8 },
              { type: 'O-', count: 15 },
              { type: 'AB-', count: 3 }
            ],
            services: [
              'Voluntary blood donation', 
              'Blood storage', 
              'Emergency blood supply'
            ],
            operatingHours: '24/7',
            website: 'www.sandhani.org'
          }
        ];
        
        setBloodBanks(mockBloodBanks);
        localStorage.setItem('shastho_bloodbanks', JSON.stringify(mockBloodBanks));
      }
    };
    
    loadBloodBanks();
  }, [isAuthenticated, navigate]);

  const toggleExpand = (bloodBankId: string) => {
    setExpandedBloodBank(expandedBloodBank === bloodBankId ? null : bloodBankId);
  };

  const handleDonateBlood = (bloodBank: BloodBank) => {
    // In a real app, this would navigate to a blood donation page
    navigate(`/donate-blood/${bloodBank.id}`);
  };

  const handleRequestBlood = (bloodBank: BloodBank) => {
    // In a real app, this would navigate to a blood request page
    navigate(`/request-blood/${bloodBank.id}`);
  };

  const filteredBloodBanks = searchTerm.trim()
    ? bloodBanks.filter(
        bloodBank =>
          bloodBank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bloodBank.address.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : bloodBanks;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h1 className="text-2xl font-bold">Blood Bank Lists</h1>
          
          <div className="relative mt-4 mb-6">
            <Input
              type="text"
              placeholder="Search for blood banks..."
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
            {filteredBloodBanks.length > 0 ? (
              filteredBloodBanks.map((bloodBank) => (
                <Card key={bloodBank.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex cursor-pointer" onClick={() => toggleExpand(bloodBank.id)}>
                      <div className="p-4">
                        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                          <svg
                            className="h-8 w-8 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{bloodBank.name}</h3>
                            <p className="text-sm text-gray-500">{bloodBank.contactInfo}</p>
                            <p className="text-sm text-gray-500">{bloodBank.address}</p>
                          </div>
                          <div className="flex items-start">
                            <span className="text-lg font-semibold">4.8</span>
                            <Star className="w-5 h-5 text-yellow-400 ml-1" fill="currentColor" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {expandedBloodBank === bloodBank.id && (
                      <div className="p-4 pt-0 pl-24 border-t mt-2 transition-all duration-300 animate-fade-in">
                        <p className="mb-2"><span className="font-medium">Contact Info:</span> {bloodBank.contactInfo}</p>
                        <p className="mb-2"><span className="font-medium">Location:</span> {bloodBank.address}</p>
                        
                        <div className="mb-2">
                          <span className="font-medium">Available Blood Types (with Count):</span>
                          <ul className="list-disc pl-5 mt-1">
                            {bloodBank.bloodTypes.map((bloodType, index) => (
                              <li key={index} className="text-sm">
                                {bloodType.type}: {bloodType.count} units
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <p className="mb-2">
                          <span className="font-medium">Services:</span> {bloodBank.services.join(', ')}
                        </p>
                        
                        <p className="mb-2"><span className="font-medium">Operating Hours:</span> {bloodBank.operatingHours}</p>
                        
                        {bloodBank.website && (
                          <p className="mb-2">
                            <span className="font-medium">Website:</span>{' '}
                            <a
                              href={bloodBank.website.startsWith('http') ? bloodBank.website : `http://${bloodBank.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              {bloodBank.website}
                            </a>
                          </p>
                        )}
                        
                        <div className="mt-4 flex justify-end space-x-3">
                          <Button 
                            variant="outline"
                            className="flex items-center" 
                            onClick={() => handleDonateBlood(bloodBank)}
                          >
                            <Phone className="mr-2 h-4 w-4" />
                            Contact
                          </Button>
                          <Button 
                            className="flex items-center bg-red-600 hover:bg-red-700" 
                            onClick={() => handleRequestBlood(bloodBank)}
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Request for Blood
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-lg text-gray-500">No blood banks found. Please add blood banks from the registration page.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BloodBanksList;
