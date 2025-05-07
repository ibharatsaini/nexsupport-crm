import { Router } from 'express';
import { onboardingService } from '../services/onboarding.service';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/status', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const status = await onboardingService.getOnboardingStatus(req.user!.userId);
    res.json(status);
  } catch (error) {
    next(error);
  }
});

router.patch('/status', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const status = await onboardingService.updateOnboardingStatus(
      req.user!.userId,
      req.body
    );
    res.json(status);
  } catch (error) {
    next(error);
  }
});

router.post('/complete', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const status = await onboardingService.completeOnboarding(req.user!.userId);
    res.json(status);
  } catch (error) {
    next(error);
  }
});

export const onboardingRoutes = router;