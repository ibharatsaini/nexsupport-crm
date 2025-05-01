import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  
  const onSubmit = async (data: LoginFormData) => {
    await login(data.email, data.password);
    navigate('/dashboard');
  };
  
  return (
    <div className="animate-fade-in">
      <h2 className="text-center text-xl font-bold text-gray-900 mb-6">
        Sign in to your account
      </h2>
      
      {error && (
        <Alert 
          variant="error" 
          title="Login Failed" 
          className="mb-4"
          onClose={clearError}
        >
          {error}
        </Alert>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          label="Password"
          fullWidth
          type="password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register('password', { 
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />
        
        <div>
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            leftIcon={<LogIn className="h-4 w-4" />}
          >
            Sign in
          </Button>
        </div>
      </form>
      
      <div className="mt-6">
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link 
            to="/register" 
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;