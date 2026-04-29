import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const DEMO_USERS = [
  {
    id: "1",
    email: "parent@vizag.edu",
    password: "parent123",
    role: "parent",
    name: "Priya Sharma",
  },
  {
    id: "2",
    email: "teacher@vizag.edu",
    password: "teacher123",
    role: "teacher",
    name: "Mr. Rajesh Kumar",
  },
  {
    id: "3",
    email: "admin@vizag.edu",
    password: "admin123",
    role: "admin",
    name: "Dr. Suresh Rao",
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = DEMO_USERS.find(
          (u) =>
            u.email === credentials.email &&
            u.password === credentials.password
        );
        if (!user) return null;
        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.role = token.role;
      return session;
    },
  },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};
