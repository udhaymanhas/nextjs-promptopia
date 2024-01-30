import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        // serverless -> lambda -> dynamodb
        await connectToDB();
        // console.log(profile);
        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replaceAll(/\s/g, "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (err) {
        console.log("signIN error:: ", err);
      }
    },
    async session({ session }) {
      //   await connectToDB();

      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();

      console.log("Session: ", session);

      return session;
    },
  },
});

export { handler as GET, handler as POST };
