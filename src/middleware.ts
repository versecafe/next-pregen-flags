import { type NextRequest, NextResponse } from "next/server";
import { unstable_precompute as precompute } from "@vercel/flags/next";
import { precomputedFlags } from "@/flags";

export const config = {
  /** Match all request paths except for the ones starting with:
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - _vercel (Vercel specific files)
   * - _public (public files)
   * - favicon (favicon)
   * .well-known (well-known files)
   * This is to minimize unnecessary middleware
   * invocations and to avoid the flags layer. */
  matcher: {
    source:
      "/((?!_next/static|_next/image|_vercel|_public|favicon|.well-known).*)",
  },
};

/* You'll notice _public has to be explicitly created in the
 * routing in order to exclude it from the rewrite, using the
 * base public folder will not work */

export async function middleware(request: NextRequest) {
  const outsideFlags = {
    /* pass in flags from outside providers such as hypertune */
  };

  const code: string = await precompute(precomputedFlags, outsideFlags);

  /** rewritten URL with flag code at the base of the path */
  const url = new URL(
    `/${code}${request.nextUrl.pathname}${request.nextUrl.search}`,
    request.url,
  );

  return NextResponse.rewrite(url, { request });
}
