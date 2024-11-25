import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/utils/db";
import User from "@/models/userModel";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectDB();
                const user = await User.findOne({ email: credentials.email });
                if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
                    throw new Error("Invalid email or password");
                }
                return { id: user._id, email: user.email, name: `${user.firstName} ${user.lastName}` };
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/signup",
    },
    session: {
        strategy: "jwt",
    },  
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account }) {
            // Handle Google Sign-In
            if (account.provider === "google") {
                await connectDB();

                const existingUser = await User.findOne({ email: user.email });

                if (!existingUser) {
                    // Create a new user in MongoDB
                    await User.create({
                        firstName: user.name.split(" ")[0] || "Unknown",
                        lastName: user.name.split(" ")[1] || "",
                        email: user.email,
                        image: user.image,
                        password: null, // No password for Google users
                    });
                }
            }

            return true; // Allow the sign-in
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
