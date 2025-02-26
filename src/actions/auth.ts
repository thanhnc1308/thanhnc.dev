'use server';

import { signIn } from '@/auth';
import { Account, AuthError, Profile, User } from 'next-auth';
import { z } from 'zod';
import { createUser, findUserByEmail } from './user';
import { UserRole } from '@/types/auth';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function loginCredentials(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const validatedFields = LoginSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!validatedFields.success) {
      return 'Invalid email or password.';
    }

    await signIn('credentials', validatedFields.data);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function loginGoogleOAuth() {
  try {
    await signIn('google');
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

const _getUserRoleFromEmail = (email: string) => {
  return process.env.ADMIN_EMAILS?.split(',').includes(email)
    ? UserRole.Admin
    : UserRole.User;
};

/**
 * Save user to database if they don't exist
 * Need to wrap in try/catch to prevent OAuth login from failing
 */
export async function saveOAuthUser(
  user: User,
  account?: Account | null,
  profile?: Profile,
) {
  try {
    // If logged in with credentials, do nothing
    const { type, provider } = account || {};
    if (!type || !['oauth', 'oidc'].includes(type)) {
      return;
    }

    // Only support Google OAuth for now
    if (provider !== 'google') {
      return;
    }

    const email = user.email || profile?.email;
    if (!email) {
      console.error('No email found in user object.');
      return;
    }

    const existingUser = await findUserByEmail(email);
    console.log({ existingUser, email });
    if (existingUser) {
      return;
    }

    const name = user.name || profile?.name || email.split('@')[0];
    const avatar = user.image || profile?.picture || '';
    // Save user to database
    await createUser({
      name,
      email,
      avatar,
      role: _getUserRoleFromEmail(email),
    });
  } catch (error) {
    console.error('saveOAuthUser', error);
  }
}
