import prisma from '../config/prisma';

export const knowledgeBaseService = {
  // Categories
  async createCategory(data: {
    name: string;
    description?: string;
  }) {
    return prisma.knowledgeBaseCategory.create({ data });
  },

  async getCategories() {
    return prisma.knowledgeBaseCategory.findMany({
      include: {
        articles: true,
      },
    });
  },

  async getCategoryById(id: string) {
    return prisma.knowledgeBaseCategory.findUnique({
      where: { id },
      include: {
        articles: true,
      },
    });
  },

  async updateCategory(id: string, data: {
    name?: string;
    description?: string;
  }) {
    return prisma.knowledgeBaseCategory.update({
      where: { id },
      data,
    });
  },

  async deleteCategory(id: string) {
    return prisma.knowledgeBaseCategory.delete({ where: { id } });
  },

  // Articles
  async createArticle(data: {
    title: string;
    content: string;
    categoryId: string;
    authorId: string;
    published?: boolean;
  }) {
    return prisma.knowledgeBaseArticle.create({ data });
  },

  async getArticles(published?: boolean) {
    return prisma.knowledgeBaseArticle.findMany({
      where: published !== undefined ? { published } : undefined,
      include: {
        category: true,
        author: true,
      },
    });
  },

  async getArticleById(id: string) {
    return prisma.knowledgeBaseArticle.findUnique({
      where: { id },
      include: {
        category: true,
        author: true,
      },
    });
  },

  async updateArticle(id: string, data: {
    title?: string;
    content?: string;
    categoryId?: string;
    published?: boolean;
  }) {
    return prisma.knowledgeBaseArticle.update({
      where: { id },
      data,
    });
  },

  async deleteArticle(id: string) {
    return prisma.knowledgeBaseArticle.delete({ where: { id } });
  },

  async searchArticles(query: string) {
    return prisma.knowledgeBaseArticle.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
        ],
        published: true,
      },
      include: {
        category: true,
        author: true,
      },
    });
  },
};