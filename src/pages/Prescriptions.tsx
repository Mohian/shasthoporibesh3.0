
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface Prescription {
  id: string;
  patientId: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  medications: {
    name: string;
    dosage: string;
    duration: string;
    instruction: string;
  }[];
  advice: string;
  followUp?: string;
}

const Prescriptions = () => {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    // Mock prescriptions - in a real app, this would come from Supabase
    const mockPrescriptions: Prescription[] = [
      {
        id: '1',
        patientId: 'patient_1',
        doctorName: 'Dr. Humayun Kabir',
        date: '2023-05-15',
        diagnosis: 'Common Cold & Seasonal Allergy',
        medications: [
          {
            name: 'Cetirizine 10mg',
            dosage: '1 tablet',
            duration: '7 days',
            instruction: 'Take once daily after dinner'
          },
          {
            name: 'Paracetamol 500mg',
            dosage: '1 tablet',
            duration: '3 days',
            instruction: 'Take if fever or body ache'
          }
        ],
        advice: 'Drink plenty of water and take rest',
        followUp: '2023-05-22'
      },
      {
        id: '2',
        patientId: 'patient_1',
        doctorName: 'Dr. Anjan Bishwas',
        date: '2023-04-10',
        diagnosis: 'Dermatitis',
        medications: [
          {
            name: 'Hydrocortisone Cream 1%',
            dosage: 'Apply thin layer',
            duration: '10 days',
            instruction: 'Apply twice daily on affected area'
          },
          {
            name: 'Antihistamine 25mg',
            dosage: '1 tablet',
            duration: '7 days',
            instruction: 'Take once daily before sleep'
          }
        ],
        advice: 'Avoid hot water bath and irritants',
        followUp: '2023-04-24'
      }
    ];
    
    setPrescriptions(mockPrescriptions);
  }, [user]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Prescriptions</h1>
        
        {prescriptions.length === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-center">No Prescriptions Yet</h3>
              <p className="text-muted-foreground text-center mt-2">
                You don't have any prescriptions at the moment
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {prescriptions.map((prescription) => (
              <Card key={prescription.id} className="overflow-hidden">
                <CardHeader className="bg-primary/5 border-b">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{prescription.doctorName}</CardTitle>
                      <CardDescription>
                        Date: {new Date(prescription.date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                      {prescription.diagnosis}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Medications</h3>
                    <div className="space-y-2">
                      {prescription.medications.map((med, index) => (
                        <div key={index} className="bg-background p-3 rounded-md">
                          <div className="flex justify-between">
                            <p className="font-medium">{med.name}</p>
                            <p>{med.dosage}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {med.instruction} for {med.duration}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Advice</h3>
                    <p>{prescription.advice}</p>
                  </div>
                  
                  {prescription.followUp && (
                    <div>
                      <h3 className="font-semibold mb-2">Follow-up</h3>
                      <p>Please come for follow-up on {new Date(prescription.followUp).toLocaleDateString()}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Prescriptions;
