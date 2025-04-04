
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  verificationStep: 'phone' | 'otp' | 'role' | 'complete';
  phoneNumber: string;
  isAuthenticated: boolean;
  signIn: (phone: string) => Promise<void>;
  verifyOTP: (otp: string) => Promise<boolean>;
  selectRole: (role: UserRole) => Promise<void>;
  completeRegistration: (userData: any) => Promise<void>;
  signOut: () => void;
  setVerificationStep: (step: 'phone' | 'otp' | 'role' | 'complete') => void;
  setPhoneNumber: (phone: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [verificationStep, setVerificationStep] = useState<'phone' | 'otp' | 'role' | 'complete'>('phone');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // Check for existing session on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would check with Supabase
        const storedUser = localStorage.getItem('shastho_user');
        
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Authentication check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signIn = async (phone: string): Promise<void> => {
    try {
      setLoading(true);
      // This would call Supabase auth API in a real app
      console.log('Signing in with phone:', phone);
      
      // For demo purposes, simulating successful phone submission
      setPhoneNumber(phone);
      setVerificationStep('otp');
      
      toast.success('Verification code sent to your phone');
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('Failed to send verification code');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // This would verify the OTP with Supabase in a real app
      console.log('Verifying OTP:', otp, 'for phone:', phoneNumber);
      
      // Simulate OTP verification - for demo any 6-digit code works
      if (otp.length === 6) {
        // Check if user exists in our mock database
        const storedUsers = localStorage.getItem('shastho_users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        
        const existingUser = users.find((u: User) => u.phone === phoneNumber);
        
        if (existingUser) {
          // User exists, log them in
          setUser(existingUser);
          setIsAuthenticated(true);
          setVerificationStep('complete');
          localStorage.setItem('shastho_user', JSON.stringify(existingUser));
          return true;
        } else {
          // New user, proceed to role selection
          setVerificationStep('role');
          return true;
        }
      } else {
        toast.error('Invalid verification code. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error('Failed to verify code');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const selectRole = async (role: UserRole): Promise<void> => {
    try {
      console.log('Selected role:', role);
      
      // Create a basic user object
      const newUser: User = {
        id: `user_${Date.now()}`,
        phone: phoneNumber,
        role: role,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      };
      
      // Store user in local storage (this would be in Supabase in a real app)
      const storedUsers = localStorage.getItem('shastho_users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      users.push(newUser);
      localStorage.setItem('shastho_users', JSON.stringify(users));
      
      // Set as current user
      setUser(newUser);
      localStorage.setItem('shastho_user', JSON.stringify(newUser));
      setIsAuthenticated(true);
      
      // Navigate to the appropriate registration form
      switch (role) {
        case 'patient':
          navigate('/register/patient');
          break;
        case 'doctor':
          navigate('/register/doctor');
          break;
        case 'diagnostic':
          navigate('/register/diagnostic');
          break;
        case 'bloodbank':
          navigate('/register/bloodbank');
          break;
        default:
          navigate('/dashboard');
      }
      
    } catch (error) {
      console.error('Role selection error:', error);
      toast.error('Failed to select role');
    }
  };

  const completeRegistration = async (userData: any): Promise<void> => {
    try {
      setLoading(true);
      // In a real app, this would update user profile in Supabase
      console.log('Completing registration with data:', userData);
      
      // For demo, store the profile data based on user role
      if (user) {
        const storeKey = `shastho_${user.role}s`;
        const storedData = localStorage.getItem(storeKey);
        const existingData = storedData ? JSON.parse(storedData) : [];
        
        const profileData = {
          id: `${user.role}_${Date.now()}`,
          userId: user.id,
          ...userData
        };
        
        existingData.push(profileData);
        localStorage.setItem(storeKey, JSON.stringify(existingData));
        
        // Update user with name if available
        if (userData.name) {
          const updatedUser = { ...user, name: userData.name };
          setUser(updatedUser);
          localStorage.setItem('shastho_user', JSON.stringify(updatedUser));
          
          // Also update in users array
          const storedUsers = localStorage.getItem('shastho_users');
          if (storedUsers) {
            const users = JSON.parse(storedUsers);
            const updatedUsers = users.map((u: User) => 
              u.id === user.id ? {...u, name: userData.name} : u
            );
            localStorage.setItem('shastho_users', JSON.stringify(updatedUsers));
          }
        }
        
        toast.success('Registration completed successfully');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Registration completion error:', error);
      toast.error('Failed to complete registration');
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    // In a real app, this would call Supabase auth.signOut()
    localStorage.removeItem('shastho_user');
    setUser(null);
    setIsAuthenticated(false);
    setVerificationStep('phone');
    setPhoneNumber('');
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        verificationStep,
        phoneNumber,
        isAuthenticated,
        signIn,
        verifyOTP,
        selectRole,
        completeRegistration,
        signOut,
        setVerificationStep,
        setPhoneNumber
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
