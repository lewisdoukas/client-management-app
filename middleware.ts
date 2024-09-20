import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;

  if (!isLoggedIn && nextUrl.pathname.startsWith("/clients"))
    return Response.redirect(new URL("/auth/login", nextUrl));

  if (isLoggedIn && nextUrl.pathname.startsWith("/auth"))
    return Response.redirect(new URL("/clients", nextUrl));
});

export const config = {
  matcher: ["/clients/:path*", "/auth/:path*"],
};
