import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Search, BookOpen, ChevronRight, FolderOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { getCategories, getPublishedArticles, searchArticles } from '../../api/knowledgeBase';
import { formatDate } from '../../lib/utils';

const KnowledgeBaseHome = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: categoriesResponse } = useQuery({
    queryKey: ['kb-categories'],
    queryFn: getCategories,
  });
  
  const { data: articlesResponse } = useQuery({
    queryKey: ['kb-articles'],
    queryFn: getPublishedArticles,
  });
  
  const { data: searchResponse, refetch: searchArticlesQuery } = useQuery({
    queryKey: ['kb-search', searchTerm],
    queryFn: () => searchArticles(searchTerm),
    enabled: false,
  });
  
  const categories = categoriesResponse?.data || [];
  const articles = articlesResponse?.data || [];
  const searchResults = searchResponse?.data || [];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchArticlesQuery();
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Knowledge Base
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Find answers to common questions and learn more about our platform
        </p>
        
        <form onSubmit={handleSearch} className="mt-8">
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="h-5 w-5" />}
            fullWidth
            className="text-lg py-6 px-8"
          />
        </form>
      </div>
      
      {searchTerm && searchResults.length > 0 ? (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          <div className="grid gap-4">
            {searchResults.map(article => (
              <Card key={article.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <Link 
                    to={`/knowledge-base/articles/${article.id}`}
                    className="block"
                  >
                    <h3 className="text-lg font-medium text-gray-900 hover:text-primary-600">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-gray-600 line-clamp-2">
                      {article.content}
                    </p>
                    <div className="mt-4 text-sm text-gray-500">
                      Last updated {formatDate(article.updatedAt)}
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map(category => (
              <Card key={category.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <Link 
                    to={`/knowledge-base/categories/${category.id}`}
                    className="flex items-start space-x-4"
                  >
                    <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center">
                      <FolderOpen className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{category.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {category.description}
                      </p>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Articles</h2>
              <Button 
                variant="outline"
                as={Link}
                to="/knowledge-base/articles"
                rightIcon={<ChevronRight className="h-4 w-4" />}
              >
                View All
              </Button>
            </div>
            
            <div className="grid gap-4">
              {articles.slice(0, 5).map(article => (
                <Card key={article.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <Link 
                      to={`/knowledge-base/articles/${article.id}`}
                      className="block"
                    >
                      <h3 className="text-lg font-medium text-gray-900 hover:text-primary-600">
                        {article.title}
                      </h3>
                      <p className="mt-2 text-gray-600 line-clamp-2">
                        {article.content}
                      </p>
                      <div className="mt-4 text-sm text-gray-500">
                        Last updated {formatDate(article.updatedAt)}
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default KnowledgeBaseHome;