import prisma from '../config/prisma';
import { UserRole } from '@prisma/client';

export const userService = {
  async getUsers(organizationId: string) {
    return prisma.user.findMany({
      // where: organizationId ? { organizationId } : undefined,
    });
  },

  async getUsersByRole(role: UserRole) {
    return prisma.user.findMany({ where: { role } });
  },

  async getUserById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  async updateUser(id: string, data: {
    name?: string;
    email?: string;
    role?: UserRole;
  }) {
    return prisma.user.update({
      where: { id },
      data,
    });
  },

  async deleteUser(id: string) {
    return prisma.user.delete({ where: { id } });
  },
};