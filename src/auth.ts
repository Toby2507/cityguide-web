import NextAuth from 'next-auth';
import Facebook from 'next-auth/providers/facebook';
import Google from 'next-auth/providers/google';

const FB_CLIENT_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
const FB_CLIENT_SECRET = process.env.NEXT_PUBLIC_FACEBOOK_APP_SECRET;
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;

if (!FB_CLIENT_ID) console.warn('Missing environment variable FACEBOOK_APP_ID');
if (!FB_CLIENT_SECRET) console.warn('Missing environment variable FACEBOOK_APP_SECRET');
if (!GOOGLE_CLIENT_ID) console.warn('Missing environment variable GOOGLE_CLIENT_ID');
if (!GOOGLE_CLIENT_SECRET) console.warn('Missing environment variable GOOGLE_CLIENT_SECRET');

if (!FB_CLIENT_ID || !FB_CLIENT_SECRET || !GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing environment variables for social auth');
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    Facebook({
      clientId: FB_CLIENT_ID,
      clientSecret: FB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: any) {
      console.log(user, account, profile);
      return true;
    },
  },
});
