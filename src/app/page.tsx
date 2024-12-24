// import Signin from "@/components/auth/signin";
"use client";

import { SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
const Page = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-between py-2 mx-3">
        <p className="text-2xl font-semibold">BlueHeart</p>
        <SignedOut>
          <Link href={"signin"}>Sign In</Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Page;
