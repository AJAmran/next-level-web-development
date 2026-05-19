export const USER_ROLE = {
  admin: "admin",
  user: "user",
  agent: "agent",
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
