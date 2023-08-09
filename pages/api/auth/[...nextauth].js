import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { MongoClient } from "mongodb";
export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password", placeholder: "password" }
      },
      async authorize(credentials) {
        const client = await MongoClient.connect("mongodb+srv://projectmail0444:Project_Mail1@cluster0.tw00wpr.mongodb.net/sellIt_database")
        const db = client.db();
        const userCollections = db.collection("userdatas");
        const foundUser = await userCollections.findOne({
          email: credentials.email,
          password: credentials.password
        });
        client.close();
        if(foundUser !== null){
          return foundUser;
        }
        else{
          return null;
        }
    
        // const user = {id: "42", email: "noufalrahim6784@gmail.com", password: "abcdefgh"}
        // if(credentials.email === user.email){
        //   return user;
        // }else{
        //   return null;
        // }
      }
    })
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signIn"
  }
}
export default NextAuth(authOptions)