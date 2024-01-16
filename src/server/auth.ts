import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import { prisma } from "~/server/db";
import { type AuthUser, jwtHelper, tokenOneDay, tokenOnWeek } from "../utils/jwtHelper"

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      // role: UserRole;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60
  },
  providers: [
    CredentialsProvider({
      id: 'sonic-typing-auth',
      name: 'Login with username',
      async authorize(credentials, req) {
        try {
          const user = await prisma.user.findFirst({
            where: { name: credentials?.username }
          })

          if (user && credentials) {
            const validPassword = await bcrypt.compare(credentials.password, user.password as string)
            if (validPassword) {
              return {
                id: user.id,
                name: user.name
              }
            }
          }

          if (!user && credentials) {
            const isUser = await prisma.user.findFirst({
              where: { name: credentials?.username }
            })

            if (!isUser) {
              const hashPassword = await bcrypt.hash(credentials.password, 12) 
              const newUser = await prisma.user.create({
                data: {
                  name: credentials.username,
                  password: hashPassword
                }
              })

              return {
                id: newUser.id,
                name: newUser.name
              }
            }
          }
        } catch (error) {
          console.log(error)
        }
        return null
      },
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'sonic'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user, profile, account, trigger }) {
      const isNewUser = trigger === 'signUp'

      if (user) {
        const authUser = { id: user.id, name: user.name } as AuthUser;

        const accessToken = await jwtHelper.createAcessToken(authUser);
        const refreshToken = await jwtHelper.createRefreshToken(authUser);
        const accessTokenExpired = Date.now() /1000 + tokenOneDay;
        const refreshTokenExpired = Date.now() /1000 + tokenOnWeek;

        return {
          ...token, accessToken, refreshToken, accessTokenExpired, refreshTokenExpired,
          user: authUser
        }
      }

      if (token) {
        const tokenExpired = Date.now() / 1000 > token.accessTokenExpired

        if (tokenExpired) {
          const verifyToken = await jwtHelper.verifyToken(token.refreshToken)

          if (verifyToken) {
            const user = await prisma.user.findFirst({
              where: { name: token.user?.username }
            })

            if (user) {
              const accessToken = await jwtHelper.createAcessToken(token.user);
              const accessTokenExpired = Date.now() / 1000 + tokenOneDay

              return {...token, accessToken, accessTokenExpired }
            }
          }

          return { ...token, error: 'RefreshAccessTokenError' }
        }
      }

      return token
    },
    async session({ session, token }) {
      if (token){
        session.user = {
          name: token.user.name,
          userId: token.user.id
        }
      }
  
      session.error = token.error
    
      return session
    }
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
