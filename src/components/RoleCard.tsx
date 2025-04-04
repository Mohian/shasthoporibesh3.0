
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { User, UserPlus, Building2, Beaker, Droplet } from 'lucide-react';
import { UserRole } from '@/types';

interface RoleCardProps {
  role: UserRole;
  title: string;
  description: string;
  onClick: (role: UserRole) => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ role, title, description, onClick }) => {
  const getIcon = () => {
    switch (role) {
      case 'patient':
        return <User className="h-10 w-10 mb-4 text-brand-teal" />;
      case 'doctor':
        return <UserPlus className="h-10 w-10 mb-4 text-brand-blue" />;
      case 'diagnostic':
        return <Beaker className="h-10 w-10 mb-4 text-brand-yellow" />;
      case 'bloodbank':
        return <Droplet className="h-10 w-10 mb-4 text-red-500" />;
    }
  };

  const getBgColor = () => {
    switch (role) {
      case 'patient':
        return 'bg-gradient-to-br from-brand-teal/10 to-brand-teal/5';
      case 'doctor':
        return 'bg-gradient-to-br from-brand-blue/10 to-brand-blue/5';
      case 'diagnostic':
        return 'bg-gradient-to-br from-brand-yellow/10 to-brand-yellow/5';
      case 'bloodbank':
        return 'bg-gradient-to-br from-red-500/10 to-red-500/5';
    }
  };

  const getBorderColor = () => {
    switch (role) {
      case 'patient':
        return 'border-brand-teal/20 hover:border-brand-teal/50';
      case 'doctor':
        return 'border-brand-blue/20 hover:border-brand-blue/50';
      case 'diagnostic':
        return 'border-brand-yellow/20 hover:border-brand-yellow/50';
      case 'bloodbank':
        return 'border-red-500/20 hover:border-red-500/50';
    }
  };

  return (
    <Card 
      className={`role-card cursor-pointer ${getBgColor()} ${getBorderColor()} border transition-all duration-300`}
      onClick={() => onClick(role)}
    >
      <CardContent className="flex flex-col items-center text-center p-6">
        <div className="rounded-full bg-white p-3 shadow-md">
          {getIcon()}
        </div>
        <h3 className="text-lg font-semibold mt-4 mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default RoleCard;
