import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { betterFetch } from "@better-fetch/fetch";
import { auth } from "@/lib/auth";

// export const runtime = "edge";

type Session = typeof auth.$Infer.Session;

export async function POST(req: NextRequest) {
  const body = await req.json();
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

  const userProfile = await prisma.profile.findUnique({
    where: {
      authorId: session.user.id,
    },
  });
  if (userProfile) {
    const updatedProfile = await prisma.profile.update({
      where: {
        id: userProfile.id,
      },
      data: {
        links: body,
      },
    });
    return NextResponse.json(
      {
        status: 200,
        message: "Update links successfully",
        error: false,
        data: updatedProfile.links,
      },
      { status: 200 }
    );
  } else {
    const profile = await prisma.profile.create({
      data: { links: body, authorId: session.user.id },
    });
    return NextResponse.json(
      {
        status: 200,
        message: "Update links successfully",
        error: false,
        data: profile.links,
      },
      { status: 200 }
    );
  }
}
