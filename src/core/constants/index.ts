export enum CompanyUserRole {
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER',
  DESGINER = 'DESIGNER',
  OWNER = 'OWNER',
  MANAGER = 'MANAGER',
}
export enum CompanyInviteStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}
export enum MessageStatus {
  DRAFT = 'draft',
  QUEUED = 'queued',
  SENDING = 'sending',
  SENT = 'sent',
  FAILED = 'failed',
}

export enum JWT_TOKEN_TYPE {
  ACCESS_TOKEN = 'jwt-access-token',
  REFRESH_TOKEN = 'jwt-refresh-token',
}

export enum USER_ROLE {
  AGENT = 'agent',
  CLIENT = 'client',
  ADMIN = 'admin',
  AGENT_STAFF = 'agentStaff',
}

export enum EVENT {
  SEND_EMAIL = 'send.email',
}

export const INVITE_EXPIRY_DAYS = 3;
