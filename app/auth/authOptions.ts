import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
        
        // The exclamation points at the end ensure the TS compiler that we do have those values (they're in the env file)

        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
    ],

    // Change strategy to work with Oauth

    session: {
        strategy: "jwt"
    }
}

export default authOptions;