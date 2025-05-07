import { UserRole } from ".prisma/client";
import prisma from "../config/prisma";

export const memberService = {
  async addMemberToOrg(data: {
    userId: string;
    organizationId: string;
    role: UserRole;
    isDefault ?: boolean
  }) {
    const { userId, organizationId, role, isDefault } = data;

    const member = await prisma.organizationUser.create({
      data: {
        userId,
        organizationId,
        role,
        isDefault
      },
    });
    return member;
  },
};
