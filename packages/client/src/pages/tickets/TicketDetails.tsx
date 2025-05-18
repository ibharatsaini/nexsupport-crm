import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ArrowLeft, Clock, Building2, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Select from '../../components/ui/Select';
import { getTicketById, updateTicket } from '../../api/tickets';
import { getUsers } from '../../api/users';
import { TicketStatus, TicketPriority } from '../../types';
import { formatDate, formatRelativeTime } from '../../lib/utils';

const TicketDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: ticket, isLoading } = useQuery({
    queryKey: ['ticket', id],
    queryFn: () => getTicketById(id!),
  });
  
  const { data: usersResponse } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
  
  const updateTicketMutation = useMutation({
    mutationFn: (data: Partial<NonNullable<typeof ticket>>) =>
      updateTicket(id!, data),
  });
  
  // const ticket = ticketResponse?.data;
  const users = usersResponse?.data || [];
  
  const statusOptions = [
    { value: TicketStatus.OPEN, label: 'Open' },
    { value: TicketStatus.IN_PROGRESS, label: 'In Progress' },
    { value: TicketStatus.RESOLVED, label: 'Resolved' },
    { value: TicketStatus.CLOSED, label: 'Closed' },
  ];
  
  const priorityOptions = [
    { value: TicketPriority.LOW, label: 'Low' },
    { value: TicketPriority.MEDIUM, label: 'Medium' },
    { value: TicketPriority.HIGH, label: 'High' },
    { value: TicketPriority.URGENT, label: 'Urgent' },
  ];
  
  const assigneeOptions = [
    { value: '', label: 'Unassigned' },
    ...users.map(user => ({
      value: user.id,
      label: user.name,
    })),
  ];
  
  const handleStatusChange = (status: string) => {
    updateTicketMutation.mutate({ status: status as TicketStatus });
  };
  
  const handlePriorityChange = (priority: string) => {
    updateTicketMutation.mutate({ priority: priority as TicketPriority });
  };
  
  const handleAssigneeChange = (assignedUserId:string) => {
    updateTicketMutation.mutate({ assignedUserId: assignedUserId || null  });
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!ticket) {
    return <div>Ticket not found</div>;
  }
  
  console.log(ticket)
  const assignedUser = users.find(user => user.id === ticket.assignedUserId);
  const creator = users.find(user => user.id === ticket.createdBy);
  
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
        <h1 className="text-2xl font-bold tracking-tight">{ticket.title}</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{ticket.description}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add comments section here */}
              <p className="text-gray-500">No comments yet</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <Select
                  options={statusOptions}
                  value={ticket.status}
                  onChange={handleStatusChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Priority</label>
                <Select
                  options={priorityOptions}
                  value={ticket.priority}
                  onChange={handlePriorityChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Assignee</label>
                <Select
                  options={assigneeOptions}
                  value={ticket.assignedUserId || ''}
                  onChange={handleAssigneeChange}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-gray-700">Created</p>
                  <p className="text-gray-500">{formatDate(ticket.createdAt)}</p>
                  <p className="text-gray-500">{formatRelativeTime(ticket.createdAt)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-gray-700">Created by</p>
                  <p className="text-gray-500">{creator?.name || 'Unknown'}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <Building2 className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-gray-700">Organization</p>
                  <p className="text-gray-500">{ticket.organizationId}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;