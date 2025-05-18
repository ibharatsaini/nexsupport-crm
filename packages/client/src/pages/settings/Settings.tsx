import React from 'react';
import { useForm } from 'react-hook-form';
import { Settings as SettingsIcon, User, Bell, Shield, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

interface ProfileFormData {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Settings = () => {
  const { user } = useAuth();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });
  
  const newPassword = watch('newPassword');
  
  const onSubmit = (data: ProfileFormData) => {
    console.log('Update profile:', data);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <SettingsIcon className="h-6 w-6 text-gray-600" />
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      </div>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <CardTitle>Profile Settings</CardTitle>
            </div>
            <CardDescription>
              Update your personal information and password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Input
                  label="Full Name"
                  placeholder="Your name"
                  error={errors.name?.message}
                  {...register('name', { 
                    required: 'Name is required',
                  })}
                />
                
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="your@email.com"
                  error={errors.email?.message}
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  Change Password
                </h3>
                <div className="grid gap-6">
                  <Input
                    label="Current Password"
                    type="password"
                    placeholder="Enter current password"
                    error={errors.currentPassword?.message}
                    {...register('currentPassword')}
                  />
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <Input
                      label="New Password"
                      type="password"
                      placeholder="Enter new password"
                      error={errors.newPassword?.message}
                      {...register('newPassword', {
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters',
                        },
                      })}
                    />
                    
                    <Input
                      label="Confirm New Password"
                      type="password"
                      placeholder="Confirm new password"
                      error={errors.confirmPassword?.message}
                      {...register('confirmPassword', {
                        validate: value =>
                          value === newPassword || 'Passwords do not match',
                      })}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit">
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-gray-500" />
              <CardTitle>Notification Preferences</CardTitle>
            </div>
            <CardDescription>
              Manage how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-500">
                    Receive notifications about tickets and updates
                  </p>
                </div>
                <Button variant="outline">
                  Configure
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Browser Notifications</p>
                  <p className="text-sm text-gray-500">
                    Get real-time notifications in your browser
                  </p>
                </div>
                <Button variant="outline">
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-gray-500" />
              <CardTitle>Security Settings</CardTitle>
            </div>
            <CardDescription>
              Manage your account security preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button variant="outline">
                  Enable
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Active Sessions</p>
                  <p className="text-sm text-gray-500">
                    Manage your active login sessions
                  </p>
                </div>
                <Button variant="outline">
                  View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-gray-500" />
              <CardTitle>Organization Settings</CardTitle>
            </div>
            <CardDescription>
              Manage your organization preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Team Management</p>
                  <p className="text-sm text-gray-500">
                    Manage team members and roles
                  </p>
                </div>
                <Button variant="outline">
                  Manage
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Billing & Subscription</p>
                  <p className="text-sm text-gray-500">
                    View and manage your subscription
                  </p>
                </div>
                <Button variant="outline">
                  View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;