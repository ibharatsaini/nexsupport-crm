import { Router } from 'express';
import { z } from 'zod';
import { invitationService } from '../services/invitation.service';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { UserRole } from '@prisma/client';

const router = Router();

const createInvitationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    role: z.enum(['ADMIN', 'AGENT', 'CUSTOMER']),
    organizationId: z.string().uuid(),
  }),
});

const acceptInvitationSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    password: z.string().min(6),
  }),
});

router.post('/',
  authenticate,
  authorize([UserRole.ADMIN]),
  validate(createInvitationSchema),
  async (req, res, next) => {
    try {
      const invitation = await invitationService.createInvitation(req.body);
      res.status(201).json(invitation);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/:token/accept',
  validate(acceptInvitationSchema),
  async (req, res, next) => {
    try {
      await invitationService.acceptInvitation(req.params.token, req.body);
      res.status(200).json({ message: 'Invitation accepted successfully' });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/:id/resend',
  authenticate,
  authorize([UserRole.ADMIN]),
  async (req, res, next) => {
    try {
      await invitationService.resendInvitation(req.params.id);
      res.status(200).json({ message: 'Invitation resent successfully' });
    } catch (error) {
      next(error);
    }
  }
);

export const invitationRoutes = router;