import prisma from '../config/prisma';

export const onboardingService = {
  async getOnboardingStatus(userId: string) {
    return prisma.onboardingStatus.findUnique({
      where: { userId },
    });
  },

  async updateOnboardingStatus(userId: string, data: {
    isCompleted?: boolean;
    currentStep?: number;
    completedSteps?: number[];
  }) {
    return prisma.onboardingStatus.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        ...data,
      },
    });
  },

  async completeOnboarding(userId: string) {
    return prisma.onboardingStatus.update({
      where: { userId },
      data: {
        isCompleted: true,
        currentStep: 3,
        completedSteps: [0, 1, 2, 3],
      },
    });
  },
};