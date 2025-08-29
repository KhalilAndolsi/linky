import { Logo } from "@/components/icons";
import React from "react";
import GoogleSigninBtn from "../_components/google-signin-btn";
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { notFound } from "next/navigation";

const SignInPage = async () => {
  const session = await auth.api.getSession({
        headers: await headers()
    })
  if (session) {
    return notFound()
  }
  return (
    <section className="flex flex-col items-center gap-8">
      <Logo />
      <form action="" className="max-w-[95vw] w-xl p-12 rounded-2xl bg-white">
        <h2 className="text-xl lg:text-2xl font-bold mb-1">Login</h2>
        <p className="text-neutral-500 lg:text-lg mb-6">
          Add your details below to get back into the app
        </p>

        <div>
          <GoogleSigninBtn />
        </div>
      </form>
    </section>
  );
};

export default SignInPage;
