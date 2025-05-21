import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, User, FolderOpen } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { getArticleById, getCategoryById } from '../../api/knowledgeBase';
import { getUserById } from '../../api/users';
import { formatDate } from '../../lib/utils';

const ArticleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: articleResponse, isLoading: isLoadingArticle } = useQuery({
    queryKey: ['kb-article', id],
    queryFn: () => getArticleById(id!),
  });
  
  const article = articleResponse?.data;
  
  const { data: categoryResponse } = useQuery({
    queryKey: ['kb-category', article?.categoryId],
    queryFn: () => getCategoryById(article!.categoryId),
    enabled: !!article,
  });
  
  const { data: authorResponse } = useQuery({
    queryKey: ['user', article?.authorId],
    queryFn: () => getUserById(article!.authorId),
    enabled: !!article,
  });
  
  const category = categoryResponse?.data;
  const author = authorResponse?.data;
  
  if (isLoadingArticle) {
    return <div>Loading...</div>;
  }
  
  if (!article) {
    return <div>Article not found</div>;
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
        
        {category && (
          <Link 
            to={`/knowledge-base/categories/${category.id}`}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <FolderOpen className="h-4 w-4 mr-1" />
            {category.name}
          </Link>
        )}
      </div>
      
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {article.title}
            </h1>
            
            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-8">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Last updated {formatDate(article.updatedAt)}
              </div>
              
              {author && (
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Written by {author.name}
                </div>
              )}
            </div>
            
            <div className="prose prose-lg max-w-none">
              {/* Render markdown content */}
              {article.content}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArticleDetails;