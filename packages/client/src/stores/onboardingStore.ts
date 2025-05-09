import { create } from 'zustand';
import { ApiResponse, OnboardingStep, OnboardingUser, Organization, OrganizationSize, TicketPriority, TicketStatus, UserRole } from '../types';
import { useAuthStore } from './authStore';
import * as authApi from '../api/auth';
import * as orgApi from '../api/organizations';
// import * as userApi from '../api/users';
import * as ticketApi from '../api/tickets';
import { createInvitation } from '../api/invitations';

interface OnboardingState {
  currentStep: OnboardingStep;
  organization: Partial<Organization>;
  users: OnboardingUser[];
  isCompleted: boolean;
  isLoading: boolean;
  error: string | null;
  
  setStep: (step: OnboardingStep) => void;
  setOrganization: (org: Partial<Organization>) => void;
  addUser: (user: OnboardingUser) => void;
  removeUser: (index: number) => void;
  updateUser: (index: number, user: Partial<OnboardingUser>) => void;
  
  submitOrganization: () => Promise<void>;
  submitUsers: () => Promise<void>;
  submitFirstTicket: (title: string, description: string) => Promise<void>;
  completeOnboarding: () => void;
  
  reset: () => void;
}

// Mock API for users until we create the real one
// const userApi = {
//   createUser: async (userData: any) => {
//     return Promise.resolve({ success: true, data: userData });
//   }
// };

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  currentStep: OnboardingStep.SETUP_ORGANIZATION,
  organization: {},
  users: [],
  isCompleted: false,
  isLoading: false,
  error: null,
  
  setStep: (step) => {
    set({ currentStep: step });
  },
  
  setOrganization: (org) => {
    set({ organization: { ...get().organization, ...org } });
  },
  
  addUser: (user) => {
    set({ users: [...get().users, user] });
  },
  
  removeUser: (index) => {
    const users = [...get().users];
    users.splice(index, 1);
    set({ users });
  },
  
  updateUser: (index, userData) => {
    const users = [...get().users];
    users[index] = { ...users[index], ...userData };
    set({ users });
  },
  
  submitOrganization: async () => {
    const { organization } = get();
    const authUser = useAuthStore.getState().user;
    console.log(organization)
    // if (!authUser) {
    //   set({ error: 'You must be logged in to complete onboarding' });
    //   return;
    // }
    
    // if (!organization.name || !organization.domain) {
    //   set({ error: 'Organization name and domain are required' });
    //   return;
    // }
    
    set({ isLoading: true, error: null });
    console.log(organization)
    try {
      // Create the organization
      const data = await orgApi.updateOrganization(authUser!.organizationId, {
        size: organization.size!.toUpperCase(),
        domain: organization.domain,
      });
      
      // Update the organization with the created ID
      set({ 
        organization: data as Partial<Organization>,
        isLoading: false  ,
        currentStep: OnboardingStep.ADD_USERS
      });
      
      // Update the current user with the organization ID
      // const authState = useAuthStore.getState();
      // console.log(data)
      // authState.updateUser({ organizationId: data.id});
      
      // Move to next step
      // set({ currentStep: OnboardingStep.ADD_USERS });
    } catch (error) {
      console.log(error)
      set({ 
        error: error instanceof Error ? error.stack : 'Failed to create organization', 
        isLoading: false 
      });
    }
  },
  
  submitUsers: async () => {
  const { users, organization } = get();
    const authUser = useAuthStore.getState().user;
    
    if (!authUser) {
      set({ error: 'You must be logged in to complete onboarding' });
      return;
    }
    
    if (!organization.id) {
      set({ error: 'Organization must be created first' });
      return;
    }
    
    set({ isLoading: true, error: null });
    
    try {
      // Create invitations for each user

      console.log(users)
      const promises = users.map(user => 
        createInvitation({
          email: user.email,
          role:  user.role.toUpperCase() ,
          organizationId: organization.id as string,
        })
      );
      
      await Promise.all(promises);
      
      set({ 
        isLoading: false,
        currentStep: OnboardingStep.CREATE_FIRST_TICKET
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to send invitations', 
        isLoading: false 
      });
    }
  },
  
  submitFirstTicket: async (title, description) => {
    const { organization } = get();
    const authUser = useAuthStore.getState().user;
    
    if (!authUser) {
      set({ error: 'You must be logged in to complete onboarding' });
      return;
    }
    
    if (!organization.id) {
      set({ error: 'Organization must be created first' });
      return;
    }
    
    set({ isLoading: true, error: null });
    
    try {
      // Create the first ticket
      await ticketApi.createTicket({
        title,
        description,
        status: TicketStatus.OPEN,
        priority: TicketPriority.MEDIUM,
        // assignedUserId: null,
        organizationId: organization.id as string,
        createdBy: authUser.id,
      });
      
      // Complete onboarding
      set({ 
        isLoading: false,
        currentStep: OnboardingStep.COMPLETED,
        isCompleted: true
      });
      
      // Mark onboarding as completed in local storage
      authApi.completeOnboarding();
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create ticket', 
        isLoading: false 
      });
    }
  },
  
  completeOnboarding: () => {
    set({ isCompleted: true });
    authApi.completeOnboarding();
  },
  
  reset: () => {
    set({
      currentStep: OnboardingStep.SETUP_ORGANIZATION,
      organization: {},
      users: [],
      isCompleted: false,
      isLoading: false,
      error: null
    });
  }
}));