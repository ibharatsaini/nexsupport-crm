import bcrypt from 'bcryptjs';
import prisma from '../config/prisma';
import { generateTokens } from '../config/jwt';

export const  authService = {
  async register(data: {
    name: string;
    email: string;
    password: string;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        hashedPassword,
        role: 'ADMIN',
      },
    });

    const tokens = generateTokens(user);
    return { user, tokens };
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const tokens = generateTokens(user);
    return { user, tokens };
  },

  async refreshToken(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    return generateTokens(user);
  },
};