import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    try {
      await auth.protect();
    } catch {
      const url = new URL("/login", req.url);
      return new Response(null, {
        status: 302,
        headers: {
          Location: url.toString(),
        },
      });
    }
  }
  const path = req.nextUrl.pathname;
  //TODO: check if they have an org, if not, redirect to /user

  // If they just go to /orgs
  if (path === "/orgs") {
    //TODO: Get their org here, temporarily just put test
    return NextResponse.redirect(new URL("/orgs/test", req.url));
  }
  // If they go to /orgs/@mine, redirect them to /orgs/<their org id>
  if (path.startsWith("/orgs/@mine")) {
    //TODO: Get their org here, temporarily just put test
    return NextResponse.redirect(
      new URL(path.replace("@mine", "test"), req.url),
    );
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
