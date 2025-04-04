
import React from 'react';
import Navbar from './Navbar';
import { useAuth } from '@/context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-1 ${isAuthenticated ? 'pt-16' : ''}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
