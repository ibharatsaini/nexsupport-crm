import { Router } from 'express';
import { z } from 'zod';
import { userService } from '../services/user.service';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { UserRole } from '@prisma/client';
// import { authService } from '../services/auth.service';

const router = Router();


// const addUser = z.object({
//   body:
// })


const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    role: z.enum(['ADMIN', 'AGENT', 'CUSTOMER']).optional(),
  }),
});

router.get('/', authenticate, async (req, res, next) => {
  try {
    const { organizationId } = req.query;
    const users = await userService.getUsers(organizationId as string);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// router.post('/',authenticate, async(req,res,next)=>{
//   try{
//     const {email,name,role} = req.body
//     const user = await ({name,email})

//   }catch(error){
//     next(error)
//   }
// })

router.get('/role/:role', authenticate, async (req, res, next) => {
  try {
    const users = await userService.getUsersByRole(req.params.role as UserRole);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
       res.status(404).json({ message: 'User not found' });
       return
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', 
  authenticate, 
  authorize([UserRole.ADMIN]), 
  validate(updateUserSchema), 
  async (req, res, next) => {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.json(user);
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
      await userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export const userRoutes = router;