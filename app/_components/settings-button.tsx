"use client";
import React from "react";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import {
  EllipsisVertical,
  Fingerprint,
  LogOut,
  MessageCircle,
  Moon,
  Share,
  SquarePlay,
} from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import AsyncDataButton from "./asyn-data-button";

const SettingsButton = () => {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  return (
    <Dropdown radius="sm">
      <DropdownTrigger>
        <Button color="primary" size="md" variant="faded" isIconOnly>
          <EllipsisVertical />
        </Button>
      </DropdownTrigger>
      <DropdownMenu disabledKeys={["Share"]}>
        {isPending ? (
          <DropdownItem key="loading"><p className="text-center">Loading...</p></DropdownItem>
        ) : data ? (
          <>
            <DropdownItem key="SignOut">
              <button
                type="button"
                className="flex gap-2 items-center cursor-pointer"
                onClick={() =>
                  authClient.signOut().then(() => {
                    window.localStorage.clear();
                    router.push("/auth/sign-in");
                  })
                }>
                <LogOut size={14} /> Sign Out
              </button>
            </DropdownItem>
            <DropdownItem key={"AsyncData"} color="primary"><AsyncDataButton /></DropdownItem>
          </>
        ) : (
          <DropdownItem key="SignIn">
          <Link href="/auth/sign-in" className="flex gap-2 items-center">
            <Fingerprint size={14} />
            Sign In & Sign Up
          </Link>
          </DropdownItem>
        )}
        <DropdownItem key="Share">
          <div className="flex gap-2 items-center">
            <Share size={14} />
            Share
          </div>
        </DropdownItem>
        <DropdownItem key="tutorial">
          <div className="flex gap-2 items-center">
            <SquarePlay size={14} />
            Watch tutorial
          </div>
        </DropdownItem>
        <DropdownItem key="switch-appearance">
          <div className="flex gap-2 items-center">
            <Moon size={14} />
            Switch Appearance
          </div>
        </DropdownItem>
        <DropdownItem
          key="feedback"
          color="warning"
          className="text-warning hover:!text-white">
          <div className="flex gap-2 items-center">
            <MessageCircle size={14} />
            Contact & Feedback
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default SettingsButton;
