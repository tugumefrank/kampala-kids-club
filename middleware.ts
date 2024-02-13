import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/events/:id",
    "/register",
    "/api/webhook(.*)",
    "/api/webhook/clerk",
    "/api/webhook/stripe",
    "/api/webhook/flutterwave",
    "/api/uploadthing",
    "/api/twilio",
    "/api/sse",
  ],
  ignoredRoutes: [
    "/api/webhook/clerk",
    "/api/webhook/stripe",
    "/api/uploadthing",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
