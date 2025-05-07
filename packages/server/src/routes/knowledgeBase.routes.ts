import { Router } from 'express';
import { z } from 'zod';
import { knowledgeBaseService } from '../services/knowledgeBase.service';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { UserRole } from '@prisma/client';

const router = Router();

const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(2),
    description: z.string().optional(),
  }),
});

const createArticleSchema = z.object({
  body: z.object({
    title: z.string().min(5),
    content: z.string().min(10),
    categoryId: z.string(),
    published: z.boolean().optional(),
  }),
});

// Categories
router.post('/categories', 
  authenticate, 
  authorize([UserRole.ADMIN]), 
  validate(createCategorySchema), 
  async (req, res, next) => {
    try {
      const category = await knowledgeBaseService.createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/categories', async (req, res, next) => {
  try {
    const categories = await knowledgeBaseService.getCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/categories/:id', async (req, res, next) => {
  try {
    const category = await knowledgeBaseService.getCategoryById(req.params.id);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.patch('/categories/:id', 
  authenticate, 
  authorize([UserRole.ADMIN]), 
  async (req, res, next) => {
    try {
      const category = await knowledgeBaseService.updateCategory(
        req.params.id,
        req.body
      );
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/categories/:id', 
  authenticate, 
  authorize([UserRole.ADMIN]), 
  async (req, res, next) => {
    try {
      await knowledgeBaseService.deleteCategory(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

// Articles
router.post('/articles', 
  authenticate, 
  validate(createArticleSchema), 
  async (req: AuthRequest, res, next) => {
    try {
      const article = await knowledgeBaseService.createArticle({
        ...req.body,
        authorId: req.user!.userId,
      });
      res.status(201).json(article);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/articles', async (req, res, next) => {
  try {
    const { published } = req.query;
    const articles = await knowledgeBaseService.getArticles(
      published === 'true'
    );
    res.json(articles);
  } catch (error) {
    next(error);
  }
});

router.get('/articles/search', async (req, res, next) => {
  try {
    const { query } = req.query;
    const articles = await knowledgeBaseService.searchArticles(query as string);
    res.json(articles);
  } catch (error) {
    next(error);
  }
});

router.get('/articles/:id', async (req, res, next) => {
  try {
    const article = await knowledgeBaseService.getArticleById(req.params.id);
    if (!article) {
      res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    next(error);
  }
});

router.patch('/articles/:id', 
  authenticate, 
  async (req, res, next) => {
    try {
      const article = await knowledgeBaseService.updateArticle(
        req.params.id,
        req.body
      );
      res.json(article);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/articles/:id', 
  authenticate, 
  async (req, res, next) => {
    try {
      await knowledgeBaseService.deleteArticle(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export const knowledgeBaseRoutes = router;