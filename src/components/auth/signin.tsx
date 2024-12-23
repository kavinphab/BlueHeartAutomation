"use client";

import * as React from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Oauth from "./oauth";
import { Input, InputWithShow } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const Signin = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [type, setType] = React.useState("password");
  const router = useRouter();

  // Handle the submission of the sign-in form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // if (!signIn) return null

  // const signInWith = (strategy: OAuthStrategy) => {
  //   return signIn.authenticateWithRedirect({
  //     strategy,
  //     redirectUrl: '/sign-up/sso-callback',
  //     redirectUrlComplete: '/',
  //   })
  // }
  // Display a form to capture the user's email and password
  return (
    <div className="flex justify-center h-screen items-center p-2 md:p-0">
      <div className="h-auto bg-white border border-black w-full md:w-1/3">
        <div className="p-6 md:p-8">
          <h1 className="mb-6 text-5xl font-bold text-center text-ttickles-blue">
            Welcome Back
          </h1>
          <p className=" text-sm font-medium text-center whitespace-normal">
            Join us and make a difference! By registering, you'll gain aces to a
            vibrant community of changemakers and unlock tools to help your
            nonprofit shine. Share your mission, connect with supporters, and
            amplify your impact
          </p>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col items-center w-full space-y-4 mt-5"
          >
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="email">Email Address</Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                value={email}
                className="border border-black rounded"
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="password">Password</Label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type={type}
                value={password}
                // onShow={() => {
                //   setType((prevType) => {
                //     const isPassword = prevType === 'password';
                //     return isPassword ? 'text' : 'password';
                //   });
                // } }
                className="border border-black rounded"
              />
            </div>
            <div className="flex flex-col font-semibold items-center">
              or
              <Oauth />
            </div>
            <p className="text-sm font-medium text-center text-black">
              Don&apos;t have an acccount?
              <Link className="ml-2 text-ttickles-blue" href="/signup">
                Sign up
              </Link>
            </p>
            <Button
              variant="ttickle"
              type="submit"
              className="px-6 py-2 text-white bg-ttickles-blue font-semibold hover:opacity-75 duration-300"
            >
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
