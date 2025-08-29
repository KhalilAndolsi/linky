import { platforms } from "@/constants";
import { LinkProps } from "@/context/links";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import DomainForm from "./_components/domain-form";

const PreviewPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return notFound();
  }
  const data = await prisma.profile.findUnique({
    where: { authorId: session.user.id },
    include: { profilePicture: true },
  });
  if (!data) {
    return notFound();
  }
  return (
    <main className="flex flex-col-reverse sm:flex-col h-dvh relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 h-[240px] sm:h-[350px] md:h-[420px] rounded-b-[100px] bg-gradient-to-b from-primary to-sky-400" />

      {/* Header section */}
      <DomainForm currentDomain={data.domain || ""} HOSTNAME={process.env.BETTER_AUTH_URL!} />

      {/* Main content section */}
      <section className="flex-1 flex flex-col items-center justify-start min-h-0 z-10 px-2 md:px-4">
        {/* Profile picture */}
        <div className="flex-shrink-0 mt-8 sm:mt-12 md:mt-16">
          <div
            style={
              data.profilePicture?.url
                ? { backgroundImage: `url(${data.profilePicture?.url})` }
                : {}
            }
            className="bg-white size-32 sm:size-36 md:size-40 rounded-full bg-cover bg-center shadow-lg"
          />
        </div>

        {/* Profile info */}
        <div className="flex-shrink-0 text-center mt-4 sm:mt-6 px-4 mb-2">
          <h1 className="font-bold text-lg sm:text-xl lg:text-2xl text-white mb-1">
            {data.firstName} {data.lastName}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/80">
            {data.email}
          </p>
        </div>

        {/* Links section */}
        <div className="flex-1 flex flex-col w-full max-w-sm mt-6 sm:mt-8 min-h-0">
          <div className="flex-1 space-y-3 sm:space-y-4 overflow-y-auto scrollbar-hide px-2">
            {(data.links as LinkProps[]).map((link) => (
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

          {/* Bottom spacing for mobile navigation */}
          <div className="flex-shrink-0 h-4 sm:h-6" />
        </div>
        <Link href="/">
          <Button
            color="primary"
            variant="faded"
            className="absolute left-3 top-3 sm:top-auto sm:bottom-3 !min-w-10">
            <ChevronLeft size={18} />
            <span className="hidden lg:inline-block z-[999]">Edit</span>
          </Button>
        </Link>
      </section>
    </main>
  );
};

const getPlatformDetailsByName = (name: string) => {
  return platforms.find((p) => p.name === name);
};

export default PreviewPage;
