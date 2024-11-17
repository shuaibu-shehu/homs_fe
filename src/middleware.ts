import NextAuth from "next-auth";

import authConfig from "./auth.config";
import { DEFAULT_LOGIN_REDIRECT, authRoutes, apiAuthPrefix, publicRoutes } from "./routes";

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = req.auth

  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    console.log("redirecting to login");

    return Response.redirect(new URL("/login", nextUrl))
  }
  return;
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}