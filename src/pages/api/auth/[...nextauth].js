import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
export const authOptions = {
 providers: [
  GoogleProvider({
   clientId: "4520876795-7naeo7cesolt1dgb61mm74j3c35352b4.apps.googleusercontent.com",
   clientSecret: "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",
  }),
 ],
 session: {
  strategy: 'jwt',
 },
};
export default NextAuth(authOptions);