export const UserErrors = {
  NO_USER_FOUND: "no-user-found",
  WRONG_CREDENTIALS: "wrong-credentials",
  USERNAME_ALREADY_EXISTS: "username-already-exists",
} as const;

export type UserErrors = typeof UserErrors[keyof typeof UserErrors];