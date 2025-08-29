import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";

type Session = typeof auth.$Infer.Session;

export async function PUT(req: NextRequest) {
  const { domain } = await req.json();
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: req.nextUrl.origin,
      headers: {
        cookie: req.headers.get("cookie") || "", // Forward the cookies from the request
      },
    }
  );
  if (!session) {
    return NextResponse.json(
      {
        status: 401,
        message: "You are not authenticated!",
        error: true,
        data: {},
      },
      { status: 401 }
    );
  }
  const domainIsExist = await prisma.profile.findFirst({where: {domain}}) 
  if (domainIsExist) {
    return NextResponse.json(
    {
      status: 400,
      message: "This domain is already taken",
      error: true,
      data: {},
    },
    { status: 200 }
  );
  }
  const updatedProfile = await prisma.profile.update({
    where: {
      authorId: session.user.id,
    },
    data: {
      domain,
    },
  });
  return NextResponse.json(
    {
      status: 200,
      message: "Update domain successfully",
      error: false,
      data: updatedProfile,
    },
    { status: 200 }
  );
}
