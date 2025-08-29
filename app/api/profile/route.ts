import { NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Session = typeof auth.$Infer.Session;

export async function GET(req: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: req.nextUrl.origin,
      headers: {
        cookie: req.headers.get("cookie") || "", // Forward the cookies from the request
      },
    }
  );
  const userProfileDetails = await prisma.profile.findUnique({
    where: {
      authorId: session?.user.id,
    },
    include: { profilePicture: true },
  });

  return NextResponse.json(
    {
      status: 200,
      message: "Update links successfully",
      error: false,
      data: userProfileDetails,
    },
    { status: 200 }
  );
}
