import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  organizationName: string;
}

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  const { register: registerUser, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  
  const password = watch('password');
  
  const onSubmit = async (data: RegisterFormData) => {
    await registerUser(data.name, data.email, data.password, data.organizationName);
    navigate('/onboarding');
  };
  console.log(isLoading)
  
  return (
    <div className="animate-fade-in">
      <h2 className="text-center text-xl font-bold text-gray-900 mb-6">
        Create a new account
      </h2>
      
      {error && (
        <Alert 
          variant="error" 
          title="Registration Failed" 
          className="mb-4"
          onClose={clearError}
        >
          {error}
        </Alert>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Full Name"
          fullWidth
          placeholder="John Doe"
          error={errors.name?.message}
          {...register('name', { 
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters',
            },
          })}
        />
        
        <Input
          label="Email"
          fullWidth
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />

        <Input
          label="Organization Name"
          fullWidth
          placeholder="Acme Inc."
          error={errors.organizationName?.message}
          {...register('organizationName', { 
            required: 'Organization name is required',
            minLength: {
              value: 2,
              message: 'Organization name must be at least 2 characters',
            },
          })}
        />
        
        <Input
          label="Password"
          fullWidth
          type="password"
          placeholder="Create a password"
          error={errors.password?.message}
          {...register('password', { 
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />
        
        <Input
          label="Confirm Password"
          fullWidth
          type="password"
          placeholder="Confirm your password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', { 
            required: 'Please confirm your password',
            validate: value => 
              value === password || 'The passwords do not match',
          })}
        />
        
        <div>
          <Button
            type="submit"
            fullWidth
            isLoading={ isLoading}
            leftIcon={<UserPlus className="h-4 w-4" />}
          >
            Create Account
          </Button>
        </div>
      </form>
      
      <div className="mt-6">
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;