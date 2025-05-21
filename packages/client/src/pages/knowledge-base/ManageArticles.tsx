import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Badge from '../../components/ui/Badge';
import { getAllArticles, getCategories } from '../../api/knowledgeBase';
import { formatDate } from '../../lib/utils';

const ManageArticles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const { data: articlesResponse, isLoading: isLoadingArticles } = useQuery({
    queryKey: ['kb-all-articles'],
    queryFn: getAllArticles,
  });
  
  const { data: categoriesResponse } = useQuery({
    queryKey: ['kb-categories'],
    queryFn: getCategories,
  });
  
  const articles = articlesResponse?.data || [];
  const categories = categoriesResponse?.data || [];
  
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories.map(category => ({
      value: category.id,
      label: category.name,
    })),
  ];
  
  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || article.categoryId === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Manage Articles</h1>
        <Button 
          leftIcon={<Plus className="h-4 w-4" />}
        >
          New Article
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Filter Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
            
            <Select
              options={categoryOptions}
              value={categoryFilter}
              onChange={(value) => setCategoryFilter(value)}
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        {isLoadingArticles ? (
          <div className="text-center py-8">Loading articles...</div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No articles found
          </div>
        ) : (
          filteredArticles.map(article => (
            <Card key={article.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {article.title}
                      </h3>
                      <Badge variant={article.published ? 'success' : 'warning'}>
                        {article.published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {article.content}
                    </p>
                    <p className="text-sm text-gray-500">
                      Last updated {formatDate(article.updatedAt)}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Eye className="h-4 w-4" />}
                    >
                      View
                    </Button>
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
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageArticles;