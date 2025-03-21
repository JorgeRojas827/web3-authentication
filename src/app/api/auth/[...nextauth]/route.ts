import { AuthOptions, Session } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { SiweMessage } from "siwe";
import { getCsrfToken } from "next-auth/react";
import { JWT } from "next-auth/jwt";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: { label: "Message", type: "text" },
        signature: { label: "Signature", type: "text" },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.message || !credentials?.signature) return null;

          const message = new SiweMessage(JSON.parse(credentials.message));
          const csrfToken = await getCsrfToken({ req });

          if (!csrfToken || message.nonce !== csrfToken) {
            throw new Error("Invalid nonce");
          }

          const verified = await message.verify({
            signature: credentials.signature,
            domain: message.domain,
            nonce: csrfToken,
          });

          if (!verified.success) return null;

          return {
            id: message.address,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        name: token.sub,
      };
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
