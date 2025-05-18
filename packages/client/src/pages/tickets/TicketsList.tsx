import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Badge from '../../components/ui/Badge';
import { getTickets } from '../../api/tickets';
import { TicketStatus, TicketPriority } from '../../types';
import { formatRelativeTime } from '../../lib/utils';

const TicketsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | 'all'>('all');
  
  const { data: ticketsResponse, isLoading } = useQuery({
    queryKey: ['tickets'],
    queryFn: getTickets,
  });
  
  // const tickets = ticketsResponse?.data || [];
  
  // const filteredTickets = tickets.filter(ticket => {
  //   const matchesSearch = searchTerm === '' || 
  //     ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
      
  //   const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
  //   const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
  //   return matchesSearch && matchesStatus && matchesPriority;
  // });
  
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: TicketStatus.OPEN, label: 'Open' },
    { value: TicketStatus.IN_PROGRESS, label: 'In Progress' },
    { value: TicketStatus.RESOLVED, label: 'Resolved' },
    { value: TicketStatus.CLOSED, label: 'Closed' },
  ];
  
  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: TicketPriority.LOW, label: 'Low' },
    { value: TicketPriority.MEDIUM, label: 'Medium' },
    { value: TicketPriority.HIGH, label: 'High' },
    { value: TicketPriority.URGENT, label: 'Urgent' },
  ];
  
  const getStatusBadgeVariant = (status: TicketStatus) => {
    switch (status) {
      case TicketStatus.OPEN:
        return 'warning';
      case TicketStatus.IN_PROGRESS:
        return 'primary';
      case TicketStatus.RESOLVED:
        return 'success';
      case TicketStatus.CLOSED:
        return 'secondary';
      default:
        return 'default';
    }
  };
  
  const getPriorityBadgeVariant = (priority: TicketPriority) => {
    switch (priority) {
      case TicketPriority.URGENT:
        return 'error';
      case TicketPriority.HIGH:
        return 'warning';
      case TicketPriority.MEDIUM:
        return 'primary';
      case TicketPriority.LOW:
        return 'secondary';
      default:
        return 'default';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Tickets</h1>
        <Button 
          as={Link} 
          to="/tickets/new"
          leftIcon={<Plus className="h-4 w-4" />}
        >
          New Ticket
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Filter Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Input
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
            
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(value) => setStatusFilter(value as TicketStatus | 'all')}
            />
            
            <Select
              options={priorityOptions}
              value={priorityFilter}
              onChange={(value) => setPriorityFilter(value as TicketPriority | 'all')}
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8">Loading tickets...</div>
        ) : !ticketsResponse || ticketsResponse!.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No tickets found matching your filters
          </div>
        ) : (
          ticketsResponse && ticketsResponse.map(ticket => (
            <Card key={ticket.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <Link 
                      to={`/tickets/${ticket.id}`}
                      className="text-lg font-medium hover:text-primary-600 transition-colors"
                    >
                      {ticket.title}
                    </Link>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {ticket.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getStatusBadgeVariant(ticket.status)}>
                      {ticket.status}
                    </Badge>
                    <Badge variant={"default"}>
                      {ticket.priority}
                    </Badge>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <div>
                    Created {formatRelativeTime(ticket.createdAt)}
                  </div>
                  <div>
                    {ticket.assignedUserId ? 'Assigned' : 'Unassigned'}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TicketsList;