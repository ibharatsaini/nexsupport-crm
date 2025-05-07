import { Router } from 'express';
import { z } from 'zod';
import { organizationService } from '../services/organization.service';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { UserRole } from '@prisma/client';

const router = Router();

const createOrgSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    domain: z.string().min(3),
  }),
});

const updateOrgSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    domain: z.string().min(3).optional(),
  }),
});

router.post('/', 
  authenticate, 
  validate(createOrgSchema), 
  async (req: AuthRequest, res, next) => {
    try {
      const organization = await organizationService.createOrganization({
        ...req.body,
        userId: req.user!.userId,
      });
      res.status(201).json(organization);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/', authenticate, async (req, res, next) => {
  try {
    const organizations = await organizationService.getOrganizations();
    res.json(organizations);
  } catch (error) {
    next(error);
  }
});

router.get('/default', authenticate, async (req:AuthRequest, res, next) => {
  try {
    console.log(req.user)
    const result = await organizationService.getDefaultOrganization(req.user!.userId);
    console.log(result)
    if (!result) {
      res.status(404).json({ message: 'Organization not found' });
    }
    res.json(result!.organization);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const organization = await organizationService.getOrganizationById(req.params.id);
    if (!organization) {
      res.status(404).json({ message: 'Organization not found' });
    }
    res.json(organization);
  } catch (error) {
    next(error);
  }
});



router.patch('/:id', 
  authenticate, 
  authorize([UserRole.ADMIN]), 
  validate(updateOrgSchema), 
  async (req, res, next) => {
    try {
      console.log(req.params.id,req.body)
      const organization = await organizationService.updateOrganization(
        req.params.id,
        req.body
      );
      res.json(organization);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', 
  authenticate, 
  authorize([UserRole.ADMIN]), 
  async (req, res, next) => {
    try {
      await organizationService.deleteOrganization(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export const organizationRoutes = router;