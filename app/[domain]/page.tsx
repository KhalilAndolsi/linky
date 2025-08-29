import { platforms } from "@/constants";
import { LinkProps } from "@/context/links";
import { prisma } from "@/lib/prisma";
import { Button } from "@heroui/button";
import { ArrowRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const ProfilePageByDomain = async ({
  params,
}: {
  params: Promise<{ domain: string }>;
}) => {
  const { domain } = await params;
  const profile = await prisma.profile.findFirst({
    where: {
      domain,
    },
    include: {
      profilePicture: true,
    },
  });
  if (!profile) {
    return notFound();
  }
  return (
    <main className="flex flex-col-reverse sm:flex-col h-dvh relative overflow-hidden">
      <div className="absolute inset-0 h-[240px] sm:h-[280px] md:h-[330px] rounded-b-[100px] bg-gradient-to-b from-primary to-sky-400" />

      {/* Main content section */}
      <section className="flex-1 flex flex-col items-center justify-start min-h-0 z-10 px-2 md:px-4">
        {/* Profile picture */}
        <div className="flex-shrink-0 mt-8 sm:mt-12 md:mt-16">
          <div
            style={
              profile.profilePicture?.url
                ? { backgroundImage: `url(${profile.profilePicture?.url})` }
                : {}
            }
            className="bg-white size-32 sm:size-36 md:size-40 rounded-full bg-cover bg-center shadow-lg"
          />
        </div>

        {/* Profile info */}
        <div className="flex-shrink-0 text-center mt-4 sm:mt-6 px-4 mb-2">
          <h1 className="font-bold text-lg sm:text-xl lg:text-2xl text-white mb-1">
            {profile.firstName} {profile.lastName}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/80">
            {profile.email}
          </p>
        </div>

        {/* Links section */}
        <div className="flex-1 flex flex-col w-full max-w-sm mt-6 sm:mt-8 min-h-0">
          <div className="flex-1 space-y-3 sm:space-y-4 overflow-y-auto scrollbar-hide px-2">
            {(profile.links as LinkProps[]).map((link) => (
              <a
                target="_blank"
                href={link.url}
                key={link.id}
                style={{
                  backgroundColor: getPlatformDetailsByName(link.platformName)
                    ?.background,
                  color: getPlatformDetailsByName(link.platformName)?.color,
                }}
                className="w-full h-11 sm:h-12 rounded-lg flex items-center justify-between px-3 sm:px-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                <span className="text-sm sm:text-base font-medium flex items-center gap-2">
                  {link.platformName}
                </span>
                <ArrowRight size={16} className="flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

const getPlatformDetailsByName = (name: string) => {
  return platforms.find((p) => p.name === name);
};

export default ProfilePageByDomain;
