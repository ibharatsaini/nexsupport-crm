import {api} from '../lib/api';
import { Invitation, ApiResponse } from '../types';

export async function createInvitation(data: {
  email: string;
  role: string;
  organizationId: string;
}): Promise<ApiResponse<Invitation>> {
  console.log(data)
  const response = await api.post('/invitations', data);
  return response.data;
}

export async function acceptInvitation(token: string, data: {
  name: string;
  password: string;
}): Promise<ApiResponse<void>> {
  const response = await api.post(`/invitations/${token}/accept`, data);
  return response.data;
}

export async function resendInvitation(id: string): Promise<ApiResponse<void>> {
  const response = await api.post(`/invitations/${id}/resend`);
  return response.data;
}