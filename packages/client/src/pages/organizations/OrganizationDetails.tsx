import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Users, Ticket, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { getOrganizationById } from '../../api/organizations';
import { getOrganizationUsers } from '../../api/organizations';
import { getTicketsByOrganization } from '../../api/tickets';
import { formatDate } from '../../lib/utils';
// import { UserRole } from '../../types';

const OrganizationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: organizationResponse, isLoading: isLoadingOrg } = useQuery({
    queryKey: ['organization', id],
    queryFn: () => getOrganizationById(id!),
  });
  
  const { data: usersResponse, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['organization-users', id],
    queryFn: () => getOrganizationUsers(id!),
  });
  
  const { data: ticketsResponse, isLoading: isLoadingTickets } = useQuery({
    queryKey: ['organization-tickets', id],
    queryFn: () => getTicketsByOrganization(id!),
  });
  
  const organization = organizationResponse?.data;
  const users = usersResponse || [];
  const tickets = ticketsResponse || [];
  
  if (isLoadingOrg || isLoadingUsers || isLoadingTickets) {
    return <div>Loading...</div>;
  }
  
  if (!organization) {
    return <div>Organization not found</div>;
  }
  
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
        <h1 className="text-2xl font-bold tracking-tight">{organization.name}</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Domain</label>
              <p className="mt-1">{organization.domain}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Created</label>
              <p className="mt-1">{formatDate(organization.createdAt)}</p>
            </div>
            
            <div className="pt-4 flex items-center justify-between">
              <div className="text-center">
                <p className="text-2xl font-bold">{users.length}</p>
                <p className="text-sm text-gray-500">Users</p>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold">{tickets.length}</p>
                <p className="text-sm text-gray-500">Tickets</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-gray-200">
              {users.map(user => (
                <div key={user.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-primary-100 text-primary-800">
                      {user.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-gray-200">
              {tickets.slice(0, 5).map(ticket => (
                <div key={ticket.id} className="py-3">
                  <Link 
                    to={`/tickets/${ticket.id}`}
                    className="block hover:bg-gray-50 -mx-4 px-4 py-2 rounded-md transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{ticket.title}</p>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {ticket.description}
                        </p>
                      </div>
                      <Badge variant={ticket.status === 'OPEN' ? 'warning' : 'success'}>
                        {ticket.status}
                      </Badge>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrganizationDetails;