import bycrpt from "bcrypt";
import prisma from "./db";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
export const NEXT_AUTH = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials: any) {
        const hashedpassword = await bycrpt.hash(credentials.password, 10);
        const existingUser = await prisma.user.findFirst({
          where: {
            name: credentials.username,
          },
        });
        if (existingUser) {
          const isPasswordValid = await bycrpt.compare(
            credentials.password,
            existingUser.password
          );
          if (isPasswordValid) {
            const { password, ...userWithoutPassword } = existingUser;
            return userWithoutPassword;
          }
          return null;
        }
        try {
          const user = await prisma.user.create({
            data: {
              name: credentials.username,
              password: hashedpassword,
            },
          });
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    },
    async signIn(user: any) {
      if (user.account.provider === "github") {
        const { login, email, avatar_url ,name } = user.profile;
        const existingUser = await prisma.user.findFirst({
          where: {
            name: login,
            email: email,
          },
        });
        if (!existingUser) {
          const hashedpassword = await bycrpt.hash(login, 10);
          const user = await prisma.user.create({
            data: {
              name: login,
              email: email,
              image: avatar_url,
              password: hashedpassword,
            },
          });
        }
      } else {
        const { username, email, image_url } = user.profile;
        const existingUser = await prisma.user.findFirst({
          where: {
            name: username,
            email: email,
          },
        });

        if (!existingUser) {
          const hashedpassword = await bycrpt.hash(username, 10);
          const user = await prisma.user.create({
            data: {
              name: username,
              email: email,
              image: image_url,
              password: hashedpassword,
            },
          });
          console.log(user);
        }
      }
      return true;
    },
  },
};
