import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, req) {
        // TODO
        return null
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('callbacks signIn', { user, account, profile, email, credentials })
      return true
    },
    async session({ session, user, token }) {
      console.log('callbacks session', { session, user, token })
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log('callbacks jwt', { token, user, account, profile, isNewUser })
      return token
    }
  },
  events: {
    async signIn(message) {
      console.log('events signIn', message)
    }
  }
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
