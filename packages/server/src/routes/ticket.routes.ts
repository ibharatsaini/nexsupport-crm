import { Router } from "express";
import { z } from "zod";
import { ticketService } from "../services/ticket.service";
import {
  authenticate,
  authorizeOrganization,
  AuthRequest,
} from "../middleware/auth";
import { validate } from "../middleware/validate";
import { TicketStatus, TicketPriority } from "@prisma/client";

const router = Router();

const createTicketSchema = z.object({
  body: z.object({
    title: z.string().min(5),
    description: z.string().min(10),
    status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]),
    priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
    assignedUserId: z.string().optional(),
    organizationId: z.string(),
  }),
});

const updateTicketSchema = z.object({
  body: z.object({
    title: z.string().min(5).optional(),
    description: z.string().min(10).optional(),
    status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]).optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
    assignedUserId: z.string().nullable().optional(),
  }),
});

router.post(
  "/",
  authenticate,
  validate(createTicketSchema),
  async (req: AuthRequest, res, next) => {
    try {
      // console.log(req.body);
      const {
        status,
        title,
        description,
        priority,
        assignedUserId,
        organizationId,
      } = req.body;
      console.log(req.user?.userId, organizationId, `Here as on`)
      const ticket = await ticketService.createTicket({
        title,
        description,
        status,
        priority,
        organizationId,
        assignedUserId,
        createdBy: req.user!.userId,
      });
      res.status(201).json(ticket);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/count-by-status/:organizationId",
  authenticate,
  authorizeOrganization,
    async (req: AuthRequest, res, next) => {
    try {
      const { organizationId } = req.params;
      console.log(organizationId+'ddddd')
      const counts = await ticketService.getTicketCountByStatus(organizationId);
      res.json(counts);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/", authenticate, async (req:AuthRequest, res, next) => {
  try {
    const { status, priority, organizationId, assignedUserId } = req.query;
    const tickets = await ticketService.getTickets({
      status: status as TicketStatus,
      priority: priority as TicketPriority,
      organizationId: organizationId as string,
      assignedUserId: assignedUserId as string,
      createdBy: req.user!.userId
    });
    res.json(tickets);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", authenticate, async (req, res, next) => {
  try {
    console.log(req.params.id)
    const ticket = await ticketService.getTicketById(req.params.id);
    if (!ticket) {
      res.status(404).json({ message: "Ticket not found" });
    }
    res.json(ticket);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:id",
  authenticate,
  validate(updateTicketSchema),
  async (req, res, next) => {
    try {
      const ticket = await ticketService.updateTicket(req.params.id, req.body);
      res.json(ticket);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", authenticate, async (req, res, next) => {
  try {
    await ticketService.deleteTicket(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:id/comments",
  authenticate,
  async (req: AuthRequest, res, next) => {
    try {
      const comment = await ticketService.addComment({
        content: req.body.content,
        ticketId: req.params.id,
        userId: req.user!.userId,
      });
      res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  }
);

export const ticketRoutes = router;
