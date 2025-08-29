import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { betterFetch } from "@better-fetch/fetch";
import { auth } from "@/lib/auth";
import { imageKit } from "@/lib/imagekit";

// export const runtime = "edge";

type Session = typeof auth.$Infer.Session;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data: session } = await betterFetch<Session>(
      "/api/auth/get-session",
      {
        baseURL: req.nextUrl.origin,
        headers: {
          cookie: req.headers.get("cookie") || "",
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
    let image = null;
    if (typeof body.profilePicture !== "undefined") {
      image = await prisma.media.create({
        data: {
          type: "IMAGE",
          url: body.profilePicture.url,
          id: body.profilePicture.id,
        },
      });
    }
    if (userProfile) {
      if (image && userProfile.mediaId) {
        await imageKit.deleteFile(userProfile.mediaId);
        await prisma.media.delete({
          where: {
            id: userProfile.mediaId,
          },
        });
      }
      const updatedProfile = await prisma.profile.update({
        where: {
          id: userProfile.id,
        },
        data: image
          ? {
              firstName: body.firstName,
              lastName: body.lastName,
              email: body.email,
              mediaId: image.id,
            }
          : {
              firstName: body.firstName,
              lastName: body.lastName,
              email: body.email,
            },
        include: {
          profilePicture: true,
        },
      });
      return NextResponse.json(
        {
          status: 200,
          message: "Update profile details successfully",
          error: false,
          data: updatedProfile,
        },
        { status: 200 }
      );
    } else {
      const profile = await prisma.profile.create({
        data: image
          ? {
              authorId: session.user.id,
              firstName: body.firstName,
              lastName: body.lastName,
              email: body.email,
              mediaId: image.id,
            }
          : {
              authorId: session.user.id,
              firstName: body.firstName,
              lastName: body.lastName,
              email: body.email,
            },
        include: {
          profilePicture: true,
        },
      });
      return NextResponse.json(
        {
          status: 200,
          message: "Update profile details successfully",
          error: false,
          data: profile,
        },
        { status: 200 }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      {
        status: 200,
        message: "Something has been error:" + err.message,
        error: false,
        data: {},
      },
      { status: 200 }
    );
  }
}
