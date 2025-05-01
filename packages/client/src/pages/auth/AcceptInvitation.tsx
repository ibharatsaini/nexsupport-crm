import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { UserPlus } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import { acceptInvitation } from '../../api/invitations';

interface AcceptInvitationFormData {
  name: string;
  password: string;
  confirmPassword: string;
}

const AcceptInvitation = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<AcceptInvitationFormData>();
  const password = watch('password');
  
  const acceptInvitationMutation = useMutation({
    mutationFn: (data: { name: string; password: string }) =>
      acceptInvitation(token!, data),
    onSuccess: () => {
      navigate('/login');
    },
  });
  
  const onSubmit = (data: AcceptInvitationFormData) => {
    acceptInvitationMutation.mutate({
      name: data.name,
      password: data.password,
    });
  };
  
  return (
    <div className="animate-fade-in">
      <h2 className="text-center text-xl font-bold text-gray-900 mb-6">
        Accept Invitation
      </h2>
      
      {acceptInvitationMutation.error && (
        <Alert 
          variant="error" 
          title="Error" 
          className="mb-4"
        >
          {acceptInvitationMutation.error instanceof Error 
            ? acceptInvitationMutation.error.message 
            : 'Failed to accept invitation'}
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
        
        <Button
          type="submit"
          fullWidth
          isLoading={acceptInvitationMutation.isPending}
          leftIcon={<UserPlus className="h-4 w-4" />}
        >
          Create Account
        </Button>
      </form>
    </div>
  );
};

export default AcceptInvitation;