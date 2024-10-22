import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";
import Email from "next-auth/providers/email";

const handler = NextAuth({
    session: {
        strategy : 'jwt'
    },
    providers: [CredentialsProvider({
        credentials: {
            email: { label: "Email", type: "text", placeholder: "Alvaro" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
            
        const response = await sql` 
        SELECT * FROM users WHERE email = (${credentials?.email})
    `;
    const user = response.rows[0];

    const passwordCorrect = await compare(credentials?.password ||  '', user.password);

    console.log({passwordCorrect})

    if(passwordCorrect){
        return{
            id: user.idusers,
            email: user.email
        };
    }
            return null
        },
    }),
 ],
})

export {handler as GET, handler as POST};