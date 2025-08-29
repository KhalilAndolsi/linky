import { Logo } from "@/components/icons";
import { Button } from "@heroui/button";
import { Eye } from "lucide-react";
import SectionTabs from "./_components/section-tabs";
import Sections from "./_components/sections";
import PhonePreview from "./_components/phone-preview";
import SettingsButton from "./_components/settings-button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col-reverse sm:flex-col h-dvh">
      <header className="p-2 md:p-4">
        <div className="bg-white rounded-2xl px-4 py-2 md:px-6 md:py-3 flex items-center justify-between">
          <div className="h-full max-sm:max-w-[40px] overflow-hidden">
            <Logo className="[&_#logo-text-path]:max-sm:hidden max-w-[120px]" />
          </div>
          <nav className="space-x-2">
            <SectionTabs />
          </nav>
          <nav className="flex items-center gap-2">
            <Link href="/preview">
            <Button
              color="primary"
              size="md"
              variant="bordered"
              className="font-medium !min-w-10 px-3 md:px-4 md:min-w-20">
              <Eye size={16} />
              <span className="hidden md:inline-block">Preview</span>
            </Button>
            </Link>
            <SettingsButton />
          </nav>
        </div>
      </header>
      <section className="p-2 md:p-4 max-sm:!pb-0 sm:!pt-0 grid grid-cols-12 flex-grow gap-4">
        <section className="bg-white rounded-2xl py-3 hidden md:grid md:col-span-5 place-items-center">
          <PhonePreview />
        </section>
        <section className="bg-white rounded-2xl p-4 md:px-6 md:py-3 col-span-full md:col-span-7 flex flex-col">
          <Sections />
        </section>
      </section>
    </main>
  );
}
