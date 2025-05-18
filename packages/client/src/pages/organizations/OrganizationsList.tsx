import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, Search, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { getOrganizations } from '../../api/organizations';
import { formatDate } from '../../lib/utils';

const OrganizationsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: organizationsResponse, isLoading } = useQuery({
    queryKey: ['organizations'],
    queryFn: getOrganizations,
  });
  
  const organizations = organizationsResponse?.data || [];
  
  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Organizations</h1>
        <Button 
          as={Link} 
          to="/organizations/new"
          leftIcon={<Plus className="h-4 w-4" />}
        >
          New Organization
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Search Organizations</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search by name or domain..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
          />
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full text-center py-8">Loading organizations...</div>
        ) : filteredOrganizations.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No organizations found
          </div>
        ) : (
          filteredOrganizations.map(org => (
            <Link 
              key={org.id} 
              to={`/organizations/${org.id}`}
              className="block"
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{org.name}</h3>
                      <p className="text-sm text-gray-500">{org.domain}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-500">
                    Created on {formatDate(org.createdAt)}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default OrganizationsList;