// User types
export enum UserRole {
  ADMIN = 'admin',
  AGENT = 'agent',
  CUSTOMER = 'customer',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizations: UserOrganization[];
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserOrganization {
  id: string;
  userId: string;
  organizationId: string;
  role: UserRole;
  isDefault: boolean;
  organization: Organization;
}

// Organization types
export interface Organization {
  id: string;
  name: string;
  domain: string;
  createdAt: string;
  updatedAt: string;
  size: OrganizationSize | string
}

export enum OrganizationSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  ENTERPRISE = 'enterprise',
}

// Ticket types
export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export enum TicketPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGET',
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: string | TicketPriority;
  assignedUserId ?: string | null;
  organizationId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Knowledge base types
export interface KnowledgeBaseCategory {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface KnowledgeBaseArticle {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  organizationName: string;
}

// Common API response type
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface RegisterResponse{
   user: User,
   organization: Organization
}

// Onboarding
export enum OnboardingStep {
  SETUP_ORGANIZATION = 0,
  ADD_USERS = 1,
  CREATE_FIRST_TICKET = 2,
  COMPLETED = 3,
}

export interface OnboardingUser {
  name: string;
  email: string;
  role: UserRole;
}

export interface Invitation {
  id: string;
  email: string;
  role: UserRole;
  organizationId: string;
  token: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}


export interface OrganizationSetup {
  domain: string;
  size: OrganizationSize;
}