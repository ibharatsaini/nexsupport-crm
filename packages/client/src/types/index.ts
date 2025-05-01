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

