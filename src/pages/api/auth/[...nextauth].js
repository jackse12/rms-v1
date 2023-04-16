import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
export const authOptions = {
 providers: [
  GoogleProvider({
   clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
   clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
  }),
 ],
 session: {
  strategy: 'jwt',
 },
 secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);