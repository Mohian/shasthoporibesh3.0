
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Star, ExternalLink } from 'lucide-react';
import { DiagnosticCenter } from '@/types';

const DiagnosticsList: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [diagnostics, setDiagnostics] = useState<DiagnosticCenter[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedDiagnostic, setExpandedDiagnostic] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    
    // Load diagnostic centers from localStorage
    const loadDiagnostics = () => {
      const storedDiagnostics = localStorage.getItem('shastho_diagnostics');
      if (storedDiagnostics) {
        setDiagnostics(JSON.parse(storedDiagnostics));
      } else {
        // Add mock data if no diagnostic centers exist
        const mockDiagnostics: DiagnosticCenter[] = [
          {
            id: 'dc_1',
            userId: 'user_1',
            name: 'Popular Diagnostic Centre Ltd.',
            address: 'House # 16, Road # 2, Dhanmondi, Dhaka 1205, Bangladesh',
            contactInfo: '+880-2-9668690',
            email: 'info@populardiagnostic.com',
            description: 'Leading diagnostic center in Bangladesh providing comprehensive healthcare services.',
            services: [
              'Blood tests (CBC, Lipid Profile, Blood Sugar, etc.)',
              'Imaging services (X-ray, Ultrasound, CT Scan, MRI)',
              'ECG and Echocardiography',
              'Endoscopy and Colonoscopy',
              'Pathology and Histopathology'
            ],
            operatingHours: '8 AM–10 PM (Daily)',
            website: 'www.populardiagnostic.com'
          }
        ];
        
        setDiagnostics(mockDiagnostics);
        localStorage.setItem('shastho_diagnostics', JSON.stringify(mockDiagnostics));
      }
    };
    
    loadDiagnostics();
  }, [isAuthenticated, navigate]);

  const toggleExpand = (diagnosticId: string) => {
    setExpandedDiagnostic(expandedDiagnostic === diagnosticId ? null : diagnosticId);
  };

  const handleVisit = (diagnostic: DiagnosticCenter) => {
    // In a real app, this might open the diagnostic center's website
    if (diagnostic.website) {
      window.open(diagnostic.website.startsWith('http') ? diagnostic.website : `http://${diagnostic.website}`, '_blank');
    }
  };

  const filteredDiagnostics = searchTerm.trim()
    ? diagnostics.filter(
        diagnostic =>
          diagnostic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          diagnostic.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          diagnostic.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : diagnostics;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h1 className="text-2xl font-bold">Diagnostic Center Lists</h1>
          
          <div className="relative mt-4 mb-6">
            <Input
              type="text"
              placeholder="Search for diagnostic centers or services..."
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
            {filteredDiagnostics.length > 0 ? (
              filteredDiagnostics.map((diagnostic) => (
                <Card key={diagnostic.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex cursor-pointer" onClick={() => toggleExpand(diagnostic.id)}>
                      <div className="p-4">
                        <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center">
                          <svg
                            className="h-8 w-8 text-teal-500"
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
                            <h3 className="font-semibold text-lg">{diagnostic.name}</h3>
                            <p className="text-sm text-gray-500">{diagnostic.contactInfo}</p>
                            <p className="text-sm text-gray-500">{diagnostic.address}</p>
                          </div>
                          <div className="flex items-start">
                            <span className="text-lg font-semibold">4.8</span>
                            <Star className="w-5 h-5 text-yellow-400 ml-1" fill="currentColor" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {expandedDiagnostic === diagnostic.id && (
                      <div className="p-4 pt-0 pl-24 border-t mt-2 transition-all duration-300 animate-fade-in">
                        <p className="mb-2"><span className="font-medium">Contact Info:</span> {diagnostic.contactInfo}</p>
                        <p className="mb-2"><span className="font-medium">Location:</span> {diagnostic.address}</p>
                        
                        <div className="mb-2">
                          <span className="font-medium">List of Services:</span>
                          <ul className="list-disc pl-5 mt-1">
                            {diagnostic.services.map((service, index) => (
                              <li key={index} className="text-sm">
                                {service}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <p className="mb-2"><span className="font-medium">Operating Hours:</span> {diagnostic.operatingHours}</p>
                        
                        {diagnostic.website && (
                          <p className="mb-2">
                            <span className="font-medium">Website:</span>{' '}
                            <a
                              href={diagnostic.website.startsWith('http') ? diagnostic.website : `http://${diagnostic.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              {diagnostic.website}
                            </a>
                          </p>
                        )}
                        
                        <div className="mt-4 flex justify-end">
                          <Button 
                            className="flex items-center bg-teal-600 hover:bg-teal-700" 
                            onClick={() => handleVisit(diagnostic)}
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Visit
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-lg text-gray-500">No diagnostic centers found. Please add diagnostic centers from the registration page.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DiagnosticsList;
