import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import TextArea from '../../components/ui/TextArea';
import Select from '../../components/ui/Select';
import Alert from '../../components/ui/Alert';
import { createTicket } from '../../api/tickets';
import { getUsers } from '../../api/users';
import { TicketPriority, TicketStatus } from '../../types';
import { useAuthStore } from '../../stores/authStore';
import { useOrganizationStore } from '../../stores/organizationStore';

interface CreateTicketForm {
  title: string;
  description: string;
  priority: TicketPriority;
  assignedUserId ?: string;
}

const CreateTicket = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {selectedOrganization} = useOrganizationStore()
  // useEffect(()=>{
    if(!selectedOrganization) return <></>

  // },[selectedOrganization])
  
  const { register, handleSubmit, formState: { errors } } = useForm<CreateTicketForm>({
    defaultValues: {
      title: '',
      description: '',
      priority: TicketPriority.MEDIUM,
      // assignedUserId:  null
    },
  });
  
  const { data: usersResponse } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
  
  const createTicketMutation = useMutation({
    mutationFn: (data: CreateTicketForm) => 
       createTicket({
        ...data,
        status: TicketStatus.OPEN,
        organizationId:  selectedOrganization.id,
        createdBy: user?.id || '',
      }),
    onSuccess: () => {
      navigate('/tickets');
    },
  });
  
  const onSubmit = (data: CreateTicketForm) => {
    createTicketMutation.mutate(data);
  };
  
  const priorityOptions = [
    { value: TicketPriority.LOW, label: 'Low' },
    { value: TicketPriority.MEDIUM, label: 'Medium' },
    { value: TicketPriority.HIGH, label: 'High' },
    { value: TicketPriority.URGENT, label: 'Urgent' },
  ];
  
  const assigneeOptions = [
    { value: '', label: 'Unassigned' },
    ...(usersResponse?.data || []).map(user => ({
      value: user.id,
      label: user.name,
    })),
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          leftIcon={<ArrowLeft className="h-4 w-4" />}
        >
          Back
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Create New Ticket</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Ticket Details</CardTitle>
        </CardHeader>
        <CardContent>
          {createTicketMutation.error && (
            <Alert 
              variant="error" 
              className="mb-6"
            >
              Failed to create ticket. Please try again.
            </Alert>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Title"
              placeholder="Enter ticket title"
              error={errors.title?.message}
              {...register('title', { 
                required: 'Title is required',
                minLength: {
                  value: 5,
                  message: 'Title must be at least 5 characters',
                },
              })}
            />
            
            <TextArea
              label="Description"
              placeholder="Describe the issue or request..."
              rows={5}
              error={errors.description?.message}
              {...register('description', { 
                required: 'Description is required',
                minLength: {
                  value: 10,
                  message: 'Description must be at least 10 characters',
                },
              })}
            />
            
            <div className="grid gap-6 md:grid-cols-2">
              {/* <Select
                label="Priority"
                options={priorityOptions}
                error={errors.priority?.message}
                {...register('priority')}
              />
              
              <Select
                label="Assign To"
                options={assigneeOptions}
                error={errors.assignedUserId?.message}
                {...register('assignedUserId')}
              /> */}
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={createTicketMutation.isPending}
              >
                Create Ticket
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTicket;