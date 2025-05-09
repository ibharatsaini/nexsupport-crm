// // import { delay, generateId } from '../lib/utils';
// // import { organizations, users } from '../data/mockData';
// // import { Organization, User, ApiResponse } from '../types';

// // // Get all organizations
// // export async function getOrganizations(): Promise<ApiResponse<Organization[]>> {
// //   // Simulate network delay
// //   await delay(null, 800);
  
// //   return {
// //     success: true,
// //     message: 'Organizations retrieved successfully',
// //     data: [...organizations],
// //   };
// // }

// // // Get organization by ID
// // export async function getOrganizationById(id: string): Promise<ApiResponse<Organization>> {
// //   // Simulate network delay
// //   await delay(null, 500);
  
// //   const organization = organizations.find(org => org.id === id);
  
// //   if (!organization) {
// //     throw new Error('Organization not found');
// //   }
  
// //   return {
// //     success: true,
// //     message: 'Organization retrieved successfully',
// //     data: { ...organization },
// //   };
// // }

// // // Create a new organization
// // export async function createOrganization(
// //   orgData: Omit<Organization, 'id' | 'createdAt' | 'updatedAt'>
// // ): Promise<ApiResponse<Organization>> {
// //   // Simulate network delay
// //   await delay(null, 1000);
  
// //   // Check if an organization with the same domain already exists
// //   const existingOrg = organizations.find(org => org.domain === orgData.domain);
  
// //   if (existingOrg) {
// //     throw new Error('An organization with this domain already exists');
// //   }
  
// //   const newOrganization: Organization = {
// //     id: generateId(),
// //     ...orgData,
// //     createdAt: new Date().toISOString(),
// //     updatedAt: new Date().toISOString(),
// //   };
  
// //   organizations.push(newOrganization);
  
// //   return {
// //     success: true,
// //     message: 'Organization created successfully',
// //     data: newOrganization,
// //   };
// // }

// // // Update an existing organization
// // export async function updateOrganization(
// //   id: string,
// //   orgData: Partial<Omit<Organization, 'id' | 'createdAt' | 'updatedAt'>>
// // ): Promise<ApiResponse<Organization>> {
// //   // Simulate network delay
// //   await delay(null, 800);
  
// //   const index = organizations.findIndex(org => org.id === id);
  
// //   if (index === -1) {
// //     throw new Error('Organization not found');
// //   }
  
// //   // Check if domain is being updated and is unique
// //   if (orgData.domain && orgData.domain !== organizations[index].domain) {
// //     const existingOrgWithDomain = organizations.find(
// //       org => org.domain === orgData.domain && org.id !== id
// //     );
    
// //     if (existingOrgWithDomain) {
// //       throw new Error('An organization with this domain already exists');
// //     }
// //   }
  
// //   const updatedOrganization: Organization = {
// //     ...organizations[index],
// //     ...orgData,
// //     updatedAt: new Date().toISOString(),
// //   };
  
// //   organizations[index] = updatedOrganization;
  
// //   return {
// //     success: true,
// //     message: 'Organization updated successfully',
// //     data: updatedOrganization,
// //   };
// // }

// // // Delete an organization
// // export async function deleteOrganization(id: string): Promise<ApiResponse<null>> {
// //   // Simulate network delay
// //   await delay(null, 700);
  
// //   const index = organizations.findIndex(org => org.id === id);
  
// //   if (index === -1) {
// //     throw new Error('Organization not found');
// //   }
  
// //   // Check if there are users in this organization
// //   const orgUsers = users.filter(user => user.organizationId === id);
  
// //   if (orgUsers.length > 0) {
// //     throw new Error('Cannot delete an organization that has users');
// //   }
  
// //   organizations.splice(index, 1);
  
// //   return {
// //     success: true,
// //     message: 'Organization deleted successfully',
// //     data: null,
// //   };
// // }

// // // Get users belonging to an organization
// // export async function getOrganizationUsers(organizationId: string): Promise<ApiResponse<User[]>> {
// //   // Simulate network delay
// //   await delay(null, 800);
  
// //   const orgUsers = users.filter(user => user.organizationId === organizationId);
  
// //   return {
// //     success: true,
// //     message: 'Organization users retrieved successfully',
// //     data: orgUsers,
// //   };
// // }
// import api from '../lib/api';
// import { Organization, User, ApiResponse } from '../types';

// export async function getOrganizations(): Promise<ApiResponse<Organization[]>> {
//   const response = await api.get('/organizations');
//   return response.data;
// }

// export async function getOrganizationById(id: string): Promise<ApiResponse<Organization>> {
//   const response = await api.get(`/organizations/${id}`);
//   return response.data;
// }

// export async function createOrganization(
//   orgData: Omit<Organization, 'id' | 'createdAt' | 'updatedAt'>
// ): Promise<ApiResponse<Organization>> {
//   const response = await api.post('/organizations', orgData);
//   return response.data;
// }

// export async function updateOrganization(
//   id: string,
//   orgData: Partial<Omit<Organization, 'id' | 'createdAt' | 'updatedAt'>>
// ): Promise<ApiResponse<Organization>> {
//   const response = await api.patch(`/organizations/${id}`, orgData);
//   return response.data;
// }

// export async function deleteOrganization(id: string): Promise<ApiResponse<null>> {
//   const response = await api.delete(`/organizations/${id}`);
//   return response.data;
// }

// export async function getOrganizationUsers(organizationId: string): Promise<ApiResponse<User[]>> {
//   const response = await api.get(`/organizations/${organizationId}/users`);
//   return response.data;
// }

// import { organizations } from '../data/mockData';
import {api} from '../lib/api';
import { Organization, User, ApiResponse } from '../types';

export async function getDefaultOrganizations(): Promise<Organization>{
   const response = await api.get('/organizations/default')
   return response.data
}

export async function getOrganizations(): Promise<Organization[]> {
  const response = await api.get('/organizations');
  return response.data;
}

export async function getOrganizationById(id: string): Promise<ApiResponse<Organization>> {
  const response = await api.get(`/organizations/${id}`);
  return response.data;
}

export async function createOrganization(
  orgData: Omit<Organization, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ApiResponse<Organization>>{
  const {data} = await api.post('/organizations', orgData);
  // console.log(response)
  return data;
}

export async function updateOrganization(
  id: string,
  orgData: Partial<Omit<Organization, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<ApiResponse<Organization>> {
  if(orgData.size) orgData.size = orgData.size.toUpperCase()
  const response = await api.patch(`/organizations/${id}`, orgData);
  return response.data;
}


export async function deleteOrganization(id: string): Promise<ApiResponse<null>> {
  const response = await api.delete(`/organizations/${id}`);
  return response.data;
}

export async function getOrganizationUsers(organizationId: string): Promise<User[]> {
  const response = await api.get(`/organizations/${organizationId}/users`);
  return response.data;
}