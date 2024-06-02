import { type ApiData, verifyAccess } from "@vercel/flags";
import { unstable_getProviderData as getProviderData } from "@vercel/flags/next";
import { NextResponse, type NextRequest } from "next/server";
import * as flags from "../../../../flags";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<ApiData | null>> {
  /* Verify vercel toolbar access */
  const access = await verifyAccess(request.headers.get("Authorization"));
  if (!access) return NextResponse.json(null, { status: 401 });

  return NextResponse.json<ApiData>(getProviderData(flags));
}
