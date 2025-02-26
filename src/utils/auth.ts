import { UserRole } from '@/types/auth';

export const getUserRoleFromEmail = (email?: string | null) => {
  if (!email) {
    return UserRole.User;
  }

  return process.env.ADMIN_EMAILS?.split(',').includes(email)
    ? UserRole.Admin
    : UserRole.User;
};
