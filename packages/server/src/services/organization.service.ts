import { OrganizationSize } from '.prisma/client';
import prisma from '../config/prisma';

export const organizationService = {
  async createOrganization(data: {
    name: string;
    // domain: string;
    userId: string;
  }) {
    const organization = await prisma.organization.create({
      data: {
        name: data.name,
        createdBy: data.userId,
      },
    });

    

    return organization;
  },

  async getOrganizations() {
    return prisma.organization.findMany({
      // where:{
        
      // }
    });
  },

  async getDefaultOrganization(userId:string){
    return prisma.organizationUser.findFirst({
      where:{
        isDefault: true,
        userId: userId
      },
      select:{
        organization: true
      }
    })
  },

  async getOrganizationById(id: string) {
    return prisma.organization.findUnique({
      where: { id },
      include: {
        members: true,
        tickets: true,
      },
    });
  },

  async updateOrganization(id: string, data: {
    size?: OrganizationSize;
    domain?: string;
  }) {
    
    return prisma.organization.update({
      where: { id },
      data,
    });
  },

  async deleteOrganization(id: string) {
    return prisma.organization.delete({ where: { id } });
  },
};