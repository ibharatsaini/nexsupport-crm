import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Search, Edit, Trash2, FolderOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { getCategories } from '../../api/knowledgeBase';
import { formatDate } from '../../lib/utils';

const ManageCategories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: categoriesResponse, isLoading } = useQuery({
    queryKey: ['kb-categories'],
    queryFn: getCategories,
  });
  
  const categories = categoriesResponse?.data || [];
  
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Manage Categories</h1>
        <Button 
          leftIcon={<Plus className="h-4 w-4" />}
        >
          New Category
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Search Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
          />
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full text-center py-8">Loading categories...</div>
        ) : filteredCategories.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No categories found
          </div>
        ) : (
          filteredCategories.map(category => (
            <Card key={category.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center">
                    <FolderOpen className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 truncate">
                          {category.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          {category.description}
                        </p>
                        <p className="mt-2 text-xs text-gray-500">
                          Created {formatDate(category.createdAt)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Edit className="h-4 w-4" />}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Trash2 className="h-4 w-4" />}
                      >
                        Delete
                      </Button>
                    </div>
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

export default ManageCategories;