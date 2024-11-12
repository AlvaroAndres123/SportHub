import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Alvaro" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const response = await sql`
          SELECT * FROM users WHERE email = ${credentials?.email}
        `;
        const user = response.rows[0];

        const passwordCorrect = await compare(credentials?.password || '', user.password);

        if (passwordCorrect) {
          return {
            id: user.idusers,
            email: user.email,
            name: user.name,
          };
        }

        return null; 
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name; 
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {

        session.user.id = token.id as string; 
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
