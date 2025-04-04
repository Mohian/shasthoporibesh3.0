
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Bell,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  FileText,
  Calendar,
  Home,
  Clock,
  Heart
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/Logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navbar: React.FC = () => {
  const { user, signOut, isAuthenticated } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Define menu items for each role
  const getMenuItems = () => {
    const baseMenuItems = [
      {
        icon: <Home className="mr-2 h-4 w-4" />,
        label: 'Dashboard',
        link: '/dashboard'
      },
      {
        icon: <Settings className="mr-2 h-4 w-4" />,
        label: 'Settings',
        link: '/settings'
      }
    ];

    if (user?.role === 'patient') {
      return [
        ...baseMenuItems,
        {
          icon: <Calendar className="mr-2 h-4 w-4" />,
          label: 'Appointments',
          link: '/appointments'
        },
        {
          icon: <FileText className="mr-2 h-4 w-4" />,
          label: 'Prescriptions',
          link: '/prescriptions'
        },
        {
          icon: <User className="mr-2 h-4 w-4" />,
          label: 'Profile',
          link: '/profile'
        }
      ];
    }

    return baseMenuItems;
  };

  const userMenuItems = getMenuItems();

  if (!isAuthenticated) {
    return (
      <header className="border-b bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
          <div>
            <Button 
              asChild 
              variant="ghost" 
              className="mr-2"
            >
              <Link to="/auth">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
          
          <nav className="hidden lg:flex ml-8">
            <ul className="flex space-x-6">
              <li>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/doctors" 
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  Doctors
                </Link>
              </li>
              <li>
                <Link 
                  to="/hospitals" 
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  Hospitals
                </Link>
              </li>
              <li>
                <Link 
                  to="/diagnostics" 
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  Diagnostics
                </Link>
              </li>
              <li>
                <Link 
                  to="/blood-banks" 
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  Blood Banks
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar>
                  <AvatarFallback>
                    {user?.name ? getInitials(user.name) : 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.phone || ''}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {userMenuItems.map((item, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link to={item.link} className="cursor-pointer">
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-500 focus:text-red-500"
                onClick={signOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {isSearchOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b p-3 animate-slide-down">
          <div className="container mx-auto flex items-center">
            <input
              type="text"
              placeholder="Search doctors, hospitals, services..."
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-2"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
