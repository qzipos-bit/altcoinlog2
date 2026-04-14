import { auth } from "@/auth";

export default auth((req) => {
  const path = req.nextUrl.pathname;
  if (!path.startsWith("/admin")) return;
  if (path === "/admin/login") return;
  if (!req.auth) {
    const login = new URL("/admin/login", req.nextUrl.origin);
    login.searchParams.set("callbackUrl", req.nextUrl.href);
    return Response.redirect(login);
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
