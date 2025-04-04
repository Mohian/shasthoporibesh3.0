
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Layout>
      <div className="min-h-screen app-gradient-bg">
        <div className="container mx-auto px-4 py-20 flex flex-col items-center">
          <div className="flex flex-col items-center text-center max-w-3xl animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Your Comprehensive Healthcare Management System
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl">
              Connecting patients, doctors, diagnostic centers, and blood banks for a unified healthcare experience
            </p>
            <Button 
              size="lg" 
              className="group bg-white text-primary hover:bg-white/90 text-base md:text-lg px-6 py-6 h-auto font-medium transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate('/auth')}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-white transform transition-all duration-300 hover:scale-105 hover:bg-white/15">
              <h3 className="text-xl font-semibold mb-4">For Patients</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-block bg-white/20 rounded-full p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Book appointments with specialized doctors
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-white/20 rounded-full p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  View and manage your medical records
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-white/20 rounded-full p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Find blood banks and check availability
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-white transform transition-all duration-300 hover:scale-105 hover:bg-white/15">
              <h3 className="text-xl font-semibold mb-4">For Doctors</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-block bg-white/20 rounded-full p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Manage appointments efficiently
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-white/20 rounded-full p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Create and update patient prescriptions
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-white/20 rounded-full p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Access patient medical histories
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-white transform transition-all duration-300 hover:scale-105 hover:bg-white/15">
              <h3 className="text-xl font-semibold mb-4">For Healthcare Providers</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-block bg-white/20 rounded-full p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Diagnostic centers: Manage test results
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-white/20 rounded-full p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Blood banks: Track inventory and donations
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-white/20 rounded-full p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Streamlined communication with patients
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
