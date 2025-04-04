
import React from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = React.useState<any>(null);

  React.useEffect(() => {
    // Get user profile data based on role
    if (user) {
      const profileKey = `shastho_${user.role}s`;
      const storedData = localStorage.getItem(profileKey);
      
      if (storedData) {
        const profiles = JSON.parse(storedData);
        const userProfile = profiles.find((p: any) => p.userId === user.id);
        
        if (userProfile) {
          setProfile(userProfile);
        }
      }
    }
  }, [user]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Your personal information</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarFallback className="text-lg">{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{user?.name || 'Unknown'}</h2>
                <p className="text-muted-foreground">{user?.phone || ''}</p>
                <p className="mt-2 text-sm bg-primary/10 text-primary px-3 py-1 rounded-full capitalize">
                  {user?.role || 'User'}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Details</CardTitle>
                <CardDescription>Your detailed information</CardDescription>
              </CardHeader>
              <CardContent>
                {profile ? (
                  <dl className="divide-y">
                    {Object.entries(profile).map(([key, value]: [string, any]) => {
                      // Skip internal fields or IDs
                      if (key === 'id' || key === 'userId') return null;
                      
                      return (
                        <div key={key} className="py-3 flex justify-between">
                          <dt className="text-sm font-medium text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</dt>
                          <dd className="text-sm text-gray-900">{
                            typeof value === 'boolean' 
                              ? value ? 'Yes' : 'No'
                              : String(value)
                          }</dd>
                        </div>
                      );
                    })}
                  </dl>
                ) : (
                  <p className="text-muted-foreground">No profile information available</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
