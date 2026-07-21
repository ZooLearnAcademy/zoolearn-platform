import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "mock-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-client-secret",
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      // You can append custom data to session here
      return session;
    },
  },
  // Set secret for production
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
});

export { handler as GET, handler as POST };
