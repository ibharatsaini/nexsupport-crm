import { create } from 'zustand';
import { Organization } from '../types';
import * as orgApi from '../api/organizations';
import { useAuthStore } from './authStore';

interface OrganizationState {
  selectedOrganization: Organization | null;
  setSelectedOrganization: (org: Organization) => void;
  fetchAndSetFirstOrganization: () => Promise<void>;
}

export const useOrganizationStore = create<OrganizationState>((set) => ({
  selectedOrganization: null,
  
  setSelectedOrganization: (org) => {
    set({ selectedOrganization: org });
  },
  
  fetchAndSetFirstOrganization: async () => {
    try {
    //   if(!user) return
      const response = await orgApi.getDefaultOrganizations();

      console.log(response)
      if (response) {
        set({ selectedOrganization: response });
      }
    } catch (error) {
      console.error('Failed to fetch organizations:', error);
    }
  },
}));