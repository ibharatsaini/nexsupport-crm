import { Router } from "express";
import { z } from "zod";
import { authService } from "../services/auth.service";
import { validate } from "../middleware/validate";
// import { authenticate } from 'src/middleware/auth';
import prisma from "../config/prisma";
import { authenticate, AuthRequest } from "../middleware/auth";
import { organizationService } from "../services/organization.service";
import { memberService } from "../services/member.service";

const router = Router();

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

router.post("/register", validate(registerSchema), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.register({ name, email, password });
    const { user, tokens } = result;
    const organization = await organizationService.createOrganization({
      name,
      userId: user.id,
    });
    const member = await memberService.addMemberToOrg({
      organizationId: organization.id,
      userId: user.id,
      role: "ADMIN",
      isDefault: true
    });
    res.json({ user, tokens, organization, member });
  } catch (error) {
    next(error);
  }
});

router.post("/login", validate(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/me", authenticate, async (req: AuthRequest, res, next) => {
  try {
    // const { email, password } = req.body;
    // const result = await authService.login(email, password);
    const result = await prisma.user.findUnique({
      where: {
        id: req.user!.userId,
      },
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/refresh-token", async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refreshToken(refreshToken);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export const authRoutes = router;
