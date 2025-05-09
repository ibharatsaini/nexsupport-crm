// import { delay, generateId } from '../lib/utils';
// import { tickets } from '../data/mockData';
// import { Ticket, TicketStatus, TicketPriority, ApiResponse } from '../types';

// // Get all tickets
// export async function getTickets(): Promise<ApiResponse<Ticket[]>> {
//   // Simulate network delay
//   await delay(null, 800);
  
//   return {
//     success: true,
//     message: 'Tickets retrieved successfully',
//     data: [...tickets],
//   };
// }

// // Get ticket by ID
// export async function getTicketById(id: string): Promise<ApiResponse<Ticket>> {
//   // Simulate network delay
//   await delay(null, 500);
  
//   const ticket = tickets.find(ticket => ticket.id === id);
  
//   if (!ticket) {
//     throw new Error('Ticket not found');
//   }
  
//   return {
//     success: true,
//     message: 'Ticket retrieved successfully',
//     data: { ...ticket },
//   };
// }

// // Create a new ticket
// export async function createTicket(
//   ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>
// ): Promise<ApiResponse<Ticket>> {
//   // Simulate network delay
//   await delay(null, 1000);
  
//   const newTicket: Ticket = {
//     id: generateId(),
//     ...ticketData,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   };
  
//   tickets.push(newTicket);
  
//   return {
//     success: true,
//     message: 'Ticket created successfully',
//     data: newTicket,
//   };
// }

// // Update an existing ticket
// export async function updateTicket(
//   id: string,
//   ticketData: Partial<Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>>
// ): Promise<ApiResponse<Ticket>> {
//   // Simulate network delay
//   await delay(null, 800);
  
//   const index = tickets.findIndex(ticket => ticket.id === id);
  
//   if (index === -1) {
//     throw new Error('Ticket not found');
//   }
  
//   const updatedTicket: Ticket = {
//     ...tickets[index],
//     ...ticketData,
//     updatedAt: new Date().toISOString(),
//   };
  
//   tickets[index] = updatedTicket;
  
//   return {
//     success: true,
//     message: 'Ticket updated successfully',
//     data: updatedTicket,
//   };
// }

// // Delete a ticket
// export async function deleteTicket(id: string): Promise<ApiResponse<null>> {
//   // Simulate network delay
//   await delay(null, 700);
  
//   const index = tickets.findIndex(ticket => ticket.id === id);
  
//   if (index === -1) {
//     throw new Error('Ticket not found');
//   }
  
//   tickets.splice(index, 1);
  
//   return {
//     success: true,
//     message: 'Ticket deleted successfully',
//     data: null,
//   };
// }

// // Get tickets for a specific organization
// export async function getTicketsByOrganization(organizationId: string): Promise<ApiResponse<Ticket[]>> {
//   // Simulate network delay
//   await delay(null, 800);
  
//   const orgTickets = tickets.filter(ticket => ticket.organizationId === organizationId);
  
//   return {
//     success: true,
//     message: 'Tickets retrieved successfully',
//     data: orgTickets,
//   };
// }

// // Get tickets assigned to a specific user
// export async function getTicketsByAssignee(userId: string): Promise<ApiResponse<Ticket[]>> {
//   // Simulate network delay
//   await delay(null, 800);
  
//   const userTickets = tickets.filter(ticket => ticket.assignedUserId === userId);
  
//   return {
//     success: true,
//     message: 'Tickets retrieved successfully',
//     data: userTickets,
//   };
// }

// // Get tickets by status
// export async function getTicketsByStatus(status: TicketStatus): Promise<ApiResponse<Ticket[]>> {
//   // Simulate network delay
//   await delay(null, 800);
  
//   const filteredTickets = tickets.filter(ticket => ticket.status === status);
  
//   return {
//     success: true,
//     message: 'Tickets retrieved successfully',
//     data: filteredTickets,
//   };
// }

// // Helper function to get the count of tickets by status
// export async function getTicketCountByStatus(): Promise<ApiResponse<Record<TicketStatus, number>>> {
//   // Simulate network delay
//   await delay(null, 600);
  
//   const counts: Record<TicketStatus, number> = {
//     [TicketStatus.OPEN]: 0,
//     [TicketStatus.IN_PROGRESS]: 0,
//     [TicketStatus.RESOLVED]: 0,
//     [TicketStatus.CLOSED]: 0,
//   };
  
//   tickets.forEach(ticket => {
//     counts[ticket.status]++;
//   });
  
//   return {
//     success: true,
//     message: 'Ticket counts retrieved successfully',
//     data: counts,
//   };
// }
import {api} from '../lib/api';
import { Ticket, TicketStatus, TicketPriority, ApiResponse } from '../types';

export async function getTickets(): Promise<Ticket[]>  {
  const response = await api.get('/tickets');
  return response.data;
}

export async function getTicketById(id: string): Promise<Ticket> {
  const response = await api.get(`/tickets/${id}`);
  return response.data;
}

export async function createTicket(
  ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ApiResponse<Ticket>> {
  const response = await api.post('/tickets', ticketData);
  return response.data;
}

export async function updateTicket(
  id: string,
  ticketData: Partial<Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<ApiResponse<Ticket>> {
  const response = await api.patch(`/tickets/${id}`, ticketData);
  return response.data;
}

export async function deleteTicket(id: string): Promise<ApiResponse<null>> {
  const response = await api.delete(`/tickets/${id}`);
  return response.data;
}

export async function getTicketsByOrganization(organizationId: string): Promise<Ticket[]> {
  const response = await api.get('/tickets', {
    params: { organizationId },
  });
  return response.data;
}

export async function getTicketsByAssignee(userId: string): Promise<ApiResponse<Ticket[]>> {
  const response = await api.get('/tickets', {
    params: { assignedUserId: userId },
  });
  return response.data;
}

export async function getTicketsByStatus(status: TicketStatus): Promise<Ticket[]> {
  const response = await api.get('/tickets', {
    params: { status },
  });
  return response.data;
}

export async function getTicketCountByStatus(organizationId:string): Promise<Record<TicketStatus, number>> {
  const response = await api.get(`/tickets/count-by-status/${organizationId}`);
  return response.data;
}