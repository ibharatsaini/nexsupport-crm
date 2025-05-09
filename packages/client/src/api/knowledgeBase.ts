// import { delay, generateId } from '../lib/utils';
// import { knowledgeBaseArticles, knowledgeBaseCategories } from '../data/mockData';
// import { KnowledgeBaseArticle, KnowledgeBaseCategory, ApiResponse } from '../types';

// // Get all knowledge base categories
// export async function getCategories(): Promise<ApiResponse<KnowledgeBaseCategory[]>> {
//   // Simulate network delay
//   await delay(null, 600);
  
//   return {
//     success: true,
//     message: 'Categories retrieved successfully',
//     data: [...knowledgeBaseCategories],
//   };
// }

// // Get category by ID
// export async function getCategoryById(id: string): Promise<ApiResponse<KnowledgeBaseCategory>> {
//   // Simulate network delay
//   await delay(null, 400);
  
//   const category = knowledgeBaseCategories.find(cat => cat.id === id);
  
//   if (!category) {
//     throw new Error('Category not found');
//   }
  
//   return {
//     success: true,
//     message: 'Category retrieved successfully',
//     data: { ...category },
//   };
// }

// // Create a new category
// export async function createCategory(
//   categoryData: Omit<KnowledgeBaseCategory, 'id' | 'createdAt' | 'updatedAt'>
// ): Promise<ApiResponse<KnowledgeBaseCategory>> {
//   // Simulate network delay
//   await delay(null, 800);
  
//   // Check if a category with the same name already exists
//   const existingCategory = knowledgeBaseCategories.find(cat => cat.name === categoryData.name);
  
//   if (existingCategory) {
//     throw new Error('A category with this name already exists');
//   }
  
//   const newCategory: KnowledgeBaseCategory = {
//     id: generateId(),
//     ...categoryData,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   };
  
//   knowledgeBaseCategories.push(newCategory);
  
//   return {
//     success: true,
//     message: 'Category created successfully',
//     data: newCategory,
//   };
// }

// // Update an existing category
// export async function updateCategory(
//   id: string,
//   categoryData: Partial<Omit<KnowledgeBaseCategory, 'id' | 'createdAt' | 'updatedAt'>>
// ): Promise<ApiResponse<KnowledgeBaseCategory>> {
//   // Simulate network delay
//   await delay(null, 700);
  
//   const index = knowledgeBaseCategories.findIndex(cat => cat.id === id);
  
//   if (index === -1) {
//     throw new Error('Category not found');
//   }
  
//   // Check if name is being updated and is unique
//   if (categoryData.name && categoryData.name !== knowledgeBaseCategories[index].name) {
//     const existingCategoryWithName = knowledgeBaseCategories.find(
//       cat => cat.name === categoryData.name && cat.id !== id
//     );
    
//     if (existingCategoryWithName) {
//       throw new Error('A category with this name already exists');
//     }
//   }
  
//   const updatedCategory: KnowledgeBaseCategory = {
//     ...knowledgeBaseCategories[index],
//     ...categoryData,
//     updatedAt: new Date().toISOString(),
//   };
  
//   knowledgeBaseCategories[index] = updatedCategory;
  
//   return {
//     success: true,
//     message: 'Category updated successfully',
//     data: updatedCategory,
//   };
// }

// // Delete a category
// export async function deleteCategory(id: string): Promise<ApiResponse<null>> {
//   // Simulate network delay
//   await delay(null, 700);
  
//   const index = knowledgeBaseCategories.findIndex(cat => cat.id === id);
  
//   if (index === -1) {
//     throw new Error('Category not found');
//   }
  
//   // Check if there are articles in this category
//   const categoryArticles = knowledgeBaseArticles.filter(article => article.categoryId === id);
  
//   if (categoryArticles.length > 0) {
//     throw new Error('Cannot delete a category that has articles');
//   }
  
//   knowledgeBaseCategories.splice(index, 1);
  
//   return {
//     success: true,
//     message: 'Category deleted successfully',
//     data: null,
//   };
// }

// // Get all published knowledge base articles
// export async function getPublishedArticles(): Promise<ApiResponse<KnowledgeBaseArticle[]>> {
//   // Simulate network delay
//   await delay(null, 700);
  
//   const publishedArticles = knowledgeBaseArticles.filter(article => article.published);
  
//   return {
//     success: true,
//     message: 'Articles retrieved successfully',
//     data: publishedArticles,
//   };
// }

// // Get all knowledge base articles (published and drafts)
// export async function getAllArticles(): Promise<ApiResponse<KnowledgeBaseArticle[]>> {
//   // Simulate network delay
//   await delay(null, 700);
  
//   return {
//     success: true,
//     message: 'Articles retrieved successfully',
//     data: [...knowledgeBaseArticles],
//   };
// }

// // Get article by ID
// export async function getArticleById(id: string): Promise<ApiResponse<KnowledgeBaseArticle>> {
//   // Simulate network delay
//   await delay(null, 500);
  
//   const article = knowledgeBaseArticles.find(article => article.id === id);
  
//   if (!article) {
//     throw new Error('Article not found');
//   }
  
//   return {
//     success: true,
//     message: 'Article retrieved successfully',
//     data: { ...article },
//   };
// }

// // Get articles by category
// export async function getArticlesByCategory(categoryId: string): Promise<ApiResponse<KnowledgeBaseArticle[]>> {
//   // Simulate network delay
//   await delay(null, 600);
  
//   const categoryArticles = knowledgeBaseArticles.filter(
//     article => article.categoryId === categoryId && article.published
//   );
  
//   return {
//     success: true,
//     message: 'Articles retrieved successfully',
//     data: categoryArticles,
//   };
// }

// // Create a new article
// export async function createArticle(
//   articleData: Omit<KnowledgeBaseArticle, 'id' | 'createdAt' | 'updatedAt'>
// ): Promise<ApiResponse<KnowledgeBaseArticle>> {
//   // Simulate network delay
//   await delay(null, 900);
  
//   const newArticle: KnowledgeBaseArticle = {
//     id: generateId(),
//     ...articleData,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   };
  
//   knowledgeBaseArticles.push(newArticle);
  
//   return {
//     success: true,
//     message: 'Article created successfully',
//     data: newArticle,
//   };
// }

// // Update an existing article
// export async function updateArticle(
//   id: string,
//   articleData: Partial<Omit<KnowledgeBaseArticle, 'id' | 'createdAt' | 'updatedAt'>>
// ): Promise<ApiResponse<KnowledgeBaseArticle>> {
//   // Simulate network delay
//   await delay(null, 800);
  
//   const index = knowledgeBaseArticles.findIndex(article => article.id === id);
  
//   if (index === -1) {
//     throw new Error('Article not found');
//   }
  
//   const updatedArticle: KnowledgeBaseArticle = {
//     ...knowledgeBaseArticles[index],
//     ...articleData,
//     updatedAt: new Date().toISOString(),
//   };
  
//   knowledgeBaseArticles[index] = updatedArticle;
  
//   return {
//     success: true,
//     message: 'Article updated successfully',
//     data: updatedArticle,
//   };
// }

// // Delete an article
// export async function deleteArticle(id: string): Promise<ApiResponse<null>> {
//   // Simulate network delay
//   await delay(null, 700);
  
//   const index = knowledgeBaseArticles.findIndex(article => article.id === id);
  
//   if (index === -1) {
//     throw new Error('Article not found');
//   }
  
//   knowledgeBaseArticles.splice(index, 1);
  
//   return {
//     success: true,
//     message: 'Article deleted successfully',
//     data: null,
//   };
// }

// // Search articles by title or content
// export async function searchArticles(query: string): Promise<ApiResponse<KnowledgeBaseArticle[]>> {
//   // Simulate network delay
//   await delay(null, 800);
  
//   const searchResults = knowledgeBaseArticles.filter(article => {
//     const titleMatch = article.title.toLowerCase().includes(query.toLowerCase());
//     const contentMatch = article.content.toLowerCase().includes(query.toLowerCase());
    
//     return (titleMatch || contentMatch) && article.published;
//   });
  
//   return {
//     success: true,
//     message: 'Search results retrieved successfully',
//     data: searchResults,
//   };
// }

import {api} from '../lib/api';
import { KnowledgeBaseArticle, KnowledgeBaseCategory, ApiResponse } from '../types';

// Categories
export async function getCategories(): Promise<ApiResponse<KnowledgeBaseCategory[]>> {
  const response = await api.get('/knowledge-base/categories');
  return response.data;
}

export async function getCategoryById(id: string): Promise<ApiResponse<KnowledgeBaseCategory>> {
  const response = await api.get(`/knowledge-base/categories/${id}`);
  return response.data;
}

export async function createCategory(
  categoryData: Omit<KnowledgeBaseCategory, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ApiResponse<KnowledgeBaseCategory>> {
  const response = await api.post('/knowledge-base/categories', categoryData);
  return response.data;
}

export async function updateCategory(
  id: string,
  categoryData: Partial<Omit<KnowledgeBaseCategory, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<ApiResponse<KnowledgeBaseCategory>> {
  const response = await api.patch(`/knowledge-base/categories/${id}`, categoryData);
  return response.data;
}

export async function deleteCategory(id: string): Promise<ApiResponse<null>> {
  const response = await api.delete(`/knowledge-base/categories/${id}`);
  return response.data;
}

// Articles
export async function getPublishedArticles(): Promise<ApiResponse<KnowledgeBaseArticle[]>> {
  const response = await api.get('/knowledge-base/articles', {
    params: { published: true },
  });
  return response.data;
}

export async function getAllArticles(): Promise<ApiResponse<KnowledgeBaseArticle[]>> {
  const response = await api.get('/knowledge-base/articles');
  return response.data;
}

export async function getArticleById(id: string): Promise<ApiResponse<KnowledgeBaseArticle>> {
  const response = await api.get(`/knowledge-base/articles/${id}`);
  return response.data;
}

export async function getArticlesByCategory(categoryId: string): Promise<ApiResponse<KnowledgeBaseArticle[]>> {
  const response = await api.get('/knowledge-base/articles', {
    params: { categoryId },
  });
  return response.data;
}

export async function createArticle(
  articleData: Omit<KnowledgeBaseArticle, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ApiResponse<KnowledgeBaseArticle>> {
  const response = await api.post('/knowledge-base/articles', articleData);
  return response.data;
}

export async function updateArticle(
  id: string,
  articleData: Partial<Omit<KnowledgeBaseArticle, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<ApiResponse<KnowledgeBaseArticle>> {
  const response = await api.patch(`/knowledge-base/articles/${id}`, articleData);
  return response.data;
}

export async function deleteArticle(id: string): Promise<ApiResponse<null>> {
  const response = await api.delete(`/knowledge-base/articles/${id}`);
  return response.data;
}

export async function searchArticles(query: string): Promise<ApiResponse<KnowledgeBaseArticle[]>> {
  const response = await api.get('/knowledge-base/articles/search', {
    params: { query },
  });
  return response.data;
}