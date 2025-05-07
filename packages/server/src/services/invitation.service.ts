import prisma from '../config/prisma';
import { sendInvitationEmail } from '../utils/email';
import { hashPassword } from '../utils/auth';
import { UserRole } from '@prisma/client';
import { randomUUID } from 'crypto';

export const invitationService = {
  async createInvitation(data: {
    email: string;
    role: UserRole;
    organizationId: string;
  }) {
    const { email, role, organizationId } = data
    const token = randomUUID() as string
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    // const invitation = await prisma.$queryRaw`
    //   SELECT * FROM create_invitation(${data.email}, ${data.role}, ${data.organizationId})
    // `;
    const invitation = await prisma.invitation.create({
      data:{
        email:email,
        role:role,
        organizationId: organizationId,
        token:token,
        expires_at: expiresAt
      }
    })

    // Send invitation email
    // await sendInvitationEmail({
    //   email: data.email,
    //   token: invitation.token,
    //   organizationId: data.organizationId,
    // });

    return invitation;
  },

  async acceptInvitation(token: string, data: {
    name: string;
    password: string;
  }) {
    const invitation = await prisma.invitation.findUnique({
      where: { token },
      include: { organization: true },
    });

    if (!invitation) {
      throw new Error('Invalid or expired invitation');
    }

    if (new Date() > new Date(invitation.expires_at)) {
      throw new Error('Invitation has expired');
    }

    const hashedPassword = await hashPassword(data.password);

    // Create user and delete invitation in a transaction
    await prisma.$transaction([
      prisma.user.create({
        data: {
          name: data.name,
          email: invitation.email,
          hashedPassword,
          role: invitation.role,
          // organizationId: invitation.organizationId,
        },
      }),
      prisma.invitation.delete({
        where: { id: invitation.id },
      }),
    ]);
  },

  async resendInvitation(id: string) {
    const invitation = await prisma.invitation.findUnique({
      where: { id },
      include: { organization: true },
    });

    if (!invitation) {
      throw new Error('Invitation not found');
    }

    // Update expiration and resend email
    await prisma.invitation.update({
      where: { id },
      data: {
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    await sendInvitationEmail({
      email: invitation.email,
      token: invitation.token,
      organizationId: invitation.organizationId,
    });
  },
};