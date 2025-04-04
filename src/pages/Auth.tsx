import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card,
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import PhoneInput from '@/components/PhoneInput';
import OTPInput from '@/components/OTPInput';
import RoleCard from '@/components/RoleCard';
import { toast } from 'sonner';
import Logo from '@/components/Logo';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';

const Auth: React.FC = () => {
  const { 
    signIn, 
    verifyOTP, 
    selectRole, 
    isAuthenticated,
    verificationStep, 
    setVerificationStep,
    phoneNumber,
    setPhoneNumber
  } = useAuth();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  // Set phone from context if available
  useEffect(() => {
    if (phoneNumber) {
      setPhone(phoneNumber);
    }
  }, [phoneNumber]);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPhoneValid) {
      toast.error('Please enter a valid phone number');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await signIn(phone);
    } catch (error) {
      console.error('Phone submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOTPComplete = async (otp: string) => {
    try {
      setIsSubmitting(true);
      const success = await verifyOTP(otp);
      
      if (success) {
        toast.success('Phone number verified successfully');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRoleSelect = async (role: UserRole) => {
    try {
      setIsSubmitting(true);
      await selectRole(role);
    } catch (error) {
      console.error('Role selection error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => {
    switch (verificationStep) {
      case 'phone':
        return (
          <form onSubmit={handlePhoneSubmit}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Welcome Back!</CardTitle>
              <CardDescription className="text-center">
                Log In to Your Account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone No</Label>
                <PhoneInput 
                  value={phone} 
                  onChange={setPhone}
                  onValidation={setIsPhoneValid}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-medium"
                disabled={!isPhoneValid || isSubmitting}
              >
                {isSubmitting ? 'Sending Code...' : 'Sign In'}
              </Button>
            </CardFooter>
            <div className="p-6 pt-2 text-center text-xs text-gray-500">
              By continuing, you agree to our{' '}
              <a href="#" className="text-primary underline underline-offset-4">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary underline underline-offset-4">
                Privacy Policy
              </a>
            </div>
          </form>
        );
      
      case 'otp':
        return (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Two Step Verification</CardTitle>
              <CardDescription className="text-center">
                Enter the verification code we sent to<br />
                <span className="font-medium">
                  {phoneNumber?.replace(/(\d{6})(\d{4})/, "******$2")}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="otp">Type your 6 digit security code</Label>
                <div className="py-4">
                  <OTPInput onComplete={handleOTPComplete} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button 
                className="w-full"
                variant="outline"
                onClick={() => setVerificationStep('phone')}
              >
                Back to Login
              </Button>
              <div className="text-xs text-center text-gray-500">
                Didn't get the code?{' '}
                <button 
                  className="text-primary underline"
                  onClick={async () => {
                    if (phoneNumber) {
                      await signIn(phoneNumber);
                      toast.success('New verification code sent');
                    } else {
                      toast.error('Phone number is missing');
                    }
                  }}
                >
                  Resend
                </button>
              </div>
            </CardFooter>
          </>
        );
      
      case 'role':
        return (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Register a account</CardTitle>
              <CardDescription className="text-center">
                Empowering Health, Connecting Lives – Your Trusted Partner in Wellness.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RoleCard
                  role="patient"
                  title="Patient"
                  description="Log in to Access Personalized Care."
                  onClick={handleRoleSelect}
                />
                <RoleCard
                  role="doctor"
                  title="Doctor"
                  description="Access Patient Records and Tools Seamlessly."
                  onClick={handleRoleSelect}
                />
                <RoleCard
                  role="bloodbank"
                  title="Blood Bank"
                  description="Log in to Manage Blood Supply and Donations."
                  onClick={handleRoleSelect}
                />
                <RoleCard
                  role="diagnostic"
                  title="Diagnostic Center"
                  description="Log in to Manage Diagnostics and Reports."
                  onClick={handleRoleSelect}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  setVerificationStep('phone');
                  setPhoneNumber('');
                }}
              >
                Back to Login
              </Button>
            </CardFooter>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section - Branding */}
      <div className="md:w-1/2 app-gradient-bg flex flex-col justify-center items-center p-8 text-white">
        <div className="max-w-md text-center">
          <div className="mb-6">
            <Logo size="large" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold mb-4">
            Empowering Health, Connecting Lives Your Trusted Partner in Wellness.
          </h1>
        </div>
      </div>
      
      {/* Right Section - Auth Form */}
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md auth-card bg-white/90">
          {renderContent()}
        </Card>
      </div>
    </div>
  );
};

export default Auth;
