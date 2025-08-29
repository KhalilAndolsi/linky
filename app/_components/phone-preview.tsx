"use client";
import { Phone } from "@/components/icons";
import { platforms } from "@/constants";
import { useLinksStore } from "@/context/links";
import { useProfileStore } from "@/context/profile";
import { ArrowRight } from "lucide-react";

const PhonePreview = () => {
  const { info } = useProfileStore();
  const { links } = useLinksStore();
  return (
    <div className="w-full h-fit relative">
      <Phone className="w-full" />
      <div className="absolute left-1/2 top-1/2 -translate-1/2 w-[308px] h-[632px]">
        {info.profilePicture && (
          <div
            style={{
              backgroundImage: `url(${info.profilePicture})`,
            }}
            className="absolute size-24 rounded-full left-1/2 -translate-x-1/2 top-16 bg-white bg-cover bg-center"
          />
        )}
        {(info.firstName || info.lastName) && (
          <div className="absolute left-1/2 -translate-x-1/2 top-[180px] w-[80%] h-6 bg-white text-center text-lg font-bold truncate">
            {info.firstName.trim()}{" "}{info.lastName.trim()}
          </div>
        )}
        {info.email && (
          <div className="absolute left-1/2 -translate-x-1/2 top-[205px] w-[80%] h-5 bg-white text-center text-sm text-neutral-500 truncate">
            {info.email}
          </div>
        )}
        {links.length > 0 && (
          <div className="absolute left-1/2 -translate-x-1/2 top-[278px] w-[237px] max-h-[300px] bg-white space-y-5 overflow-x-hidden overflow-y-auto without-scrollbar">
            {links.map((link) => (
              <div
                key={link.id}
                style={{
                  backgroundColor: getPlatformDetailsByName(link.platformName)
                    ?.background,
                  color: getPlatformDetailsByName(link.platformName)?.color,
                }}
                className="w-full h-[44px] rounded-lg flex items-center justify-between px-2">
                <span className="text-sm font-medium">{link.platformName}</span>
                <ArrowRight size={14}/>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const getPlatformDetailsByName = (name: string) => {
  return platforms.find((p) => p.name === name);
};

export default PhonePreview;
