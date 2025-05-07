import prisma from "../config/prisma";
import { TicketStatus, TicketPriority } from "@prisma/client";

export const ticketService = {
  async createTicket(data: {
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    assignedUserId?: string;
    organizationId: string;
    createdBy: string;
  }) {
    const {
      title,
      description,
      status,
      priority,
      assignedUserId,
      organizationId,
      createdBy,
    } = data;
    return prisma.ticket.create({
      data: {
        title,
        description,
        status,
        priority,
        assignedUserId,
        organizationId,
        createdBy,
      },
    });
  },

  async getTickets(filters: {
    status?: TicketStatus;
    priority?: TicketPriority;
    organizationId?: string;
    assignedUserId?: string;
    createdBy: string;
  }) {
    return prisma.ticket.findMany({
      where: {
        ...filters,
        OR: [
          {
            assignedUserId:{
              equals: filters?.assignedUserId && filters?.assignedUserId
            }
          },
          { createdBy: { equals: filters.createdBy } },
        ],
      },
      include: {
        assignedUser: true,
        creator: true,
        organization: true,
      },
    });
  },

  async getTicketById(id: string) {
    console.log(id)
    return prisma.ticket.findUnique({
      where: { id },
      include: {
        assignedUser: true,
        creator: true,
        organization: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
    });
  },

  async updateTicket(
    id: string,
    data: {
      title?: string;
      description?: string;
      status?: TicketStatus;
      priority?: TicketPriority;
      assignedUserId?: string | null;
    }
  ) {
    return prisma.ticket.update({
      where: { id },
      data,
    });
  },

  async deleteTicket(id: string) {
    return prisma.ticket.delete({ where: { id } });
  },

  async addComment(data: {
    content: string;
    ticketId: string;
    userId: string;
  }) {
    return prisma.ticketComment.create({ data });
  },

  async getTicketCountByStatus(organizationId: string) {
    // Get counts for all statuses
    console.log("hERELKLAKD");
    const counts = await prisma.ticket.groupBy({
      by: ["status"],
      where: { organizationId },
      _count: true,
    });
    console.log(counts);

    // Convert to a map of status -> count
    const statusCounts: Record<TicketStatus, number> = {
      OPEN: 0,
      IN_PROGRESS: 0,
      RESOLVED: 0,
      CLOSED: 0,
    };

    counts.forEach((count) => {
      statusCounts[count.status] = count._count;
    });

    return statusCounts;
  },
};
