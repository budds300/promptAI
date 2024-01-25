import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/User';
import slugify from 'slugify';
import { connectToDB } from '@utils/database';

const capitalizeEachWord = (str) => {
  if (str && typeof str === 'string') {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }
  return str;
};

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ","").toLocaleLowerCase(),
            image: profile.picture,
            slug: slugify(profile.name.replace(" ","").toLowerCase()),

          });
          
        }

        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
    // async redirect({url, baseUrl}) {
    //   return url.startsWith(baseUrl) ? url : baseUrl;
    // },
   
  }
})

export { handler as GET, handler as POST }