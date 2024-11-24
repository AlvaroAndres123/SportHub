import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 900, 
  },
  jwt: {
    maxAge: 900, 
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Alvaro" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email y contraseña son obligatorios");
        }

        let user;
        try {
          const response = await sql`
            SELECT * FROM users WHERE email = ${credentials.email}
          `;
          user = response.rows[0];
        } catch (error) {
          console.error("Error en la base de datos:", error);
          throw new Error("Error al consultar la base de datos");
        }

        if (!user) {
          throw new Error("Usuario no encontrado");
        }

        if (!user.password) {
          throw new Error("Contraseña no configurada para el usuario");
        }

        const passwordCorrect = await compare(credentials.password, user.password);

        if (!passwordCorrect) {
          throw new Error("Credenciales inválidas");
        }

        return {
          id: user.idusers,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  
  callbacks: {
    async jwt({ token, user }) {

      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      } else {
        
        try {
          const response = await sql`
            SELECT * FROM users WHERE idusers = ${token.id as string}
          `;
          const dbUser = response.rows[0];
  
          if (dbUser) {
            // Actualiza solo si hay cambios
            if (token.name !== dbUser.name) {
              console.log("Actualizando nombre del usuario en el token...");
              token.name = dbUser.name;
            }
            if (token.email !== dbUser.email) {
              console.log("Actualizando email del usuario en el token...");
              token.email = dbUser.email;
            }
          }
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
        }
      }
      return token;
    },
  
    async session({ session, token }) {
      // Pasa los datos actualizados al frontend
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
        };
      }
      return session;
    },
  },
  
  
  
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };