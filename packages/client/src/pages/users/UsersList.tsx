import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, UserPlus, Users as UsersIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Badge from '../../components/ui/Badge';
import { getUsers } from '../../api/users';
import { UserRole } from '../../types';
import { formatDate } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';

const UsersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const { hasRole } = useAuth();
  
  const { data: usersResponse, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
  
  const users = usersResponse?.data || [];
  
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });
  
  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: UserRole.ADMIN, label: 'Admin' },
    { value: UserRole.AGENT, label: 'Agent' },
    { value: UserRole.CUSTOMER, label: 'Customer' },
  ];
  
  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'primary';
      case UserRole.AGENT:
        return 'secondary';
      case UserRole.CUSTOMER:
        return 'default';
      default:
        return 'default';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        {hasRole([UserRole.ADMIN]) && (
          <Button 
            leftIcon={<UserPlus className="h-4 w-4" />}
          >
            Add User
          </Button>
        )}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Filter Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
            
            <Select
              options={roleOptions}
              value={roleFilter}
              onChange={(value) => setRoleFilter(value as UserRole | 'all')}
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full text-center py-8">Loading users...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No users found matching your filters
          </div>
        ) : (
          filteredUsers.map(user => (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 font-medium text-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {user.name}
                      </h3>
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {user.role}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    <p className="mt-2 text-xs text-gray-500">
                      Joined {formatDate(user.createdAt)}
                    </p>
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

export default UsersList;