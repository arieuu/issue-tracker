
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


const handler = NextAuth({
  providers: [
    GoogleProvider({
    
    // The exclamation points at the end ensure the TS compiler that we do have those values (they're in the env file)

    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!
  })
  ]
});

export { handler as GET, handler as POST }