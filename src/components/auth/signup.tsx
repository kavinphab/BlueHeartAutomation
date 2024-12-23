"use client";

import * as React from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Verification from "./verification";

const Signup = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [verifying, setVerifying] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [clerkError, setClerkError] = React.useState("");
  const router = useRouter();

  // Handle submission of the sign-up form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      // Set 'verifying' true to display second form
      // and capture the OTP code
      setVerifying(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setClerkError(err.errors[0].message);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle the submission of the verification form
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setClerkError(err.errors[0].message);
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  // Display the verification form to capture the OTP code
  // if (verifying) {
  //   return (
  //     <>
  //       <h1>Verify your email</h1>
  //       <form onSubmit={handleVerify}>
  //         <label id="code">Enter your verification code</label>
  //         <input
  //           value={code}
  //           id="code"
  //           name="code"
  //           onChange={(e) => setCode(e.target.value)}
  //         />
  //         <button type="submit">Verify</button>
  //       </form>
  //     </>
  //   );
  // }

  // Display the initial sign-up form to capture the email and password
  return (
    <div className="flex justify-center h-screen items-center p-2 md:p-0">
      {!verifying ? (
        <div className="h-auto bg-white border border-black w-full md:w-1/3">
          <div className="p-6 md:p-8">
            <h1 className="mb-6 text-5xl font-bold text-center text-ttickles-blue">
              Register your Organization
            </h1>
            <p className=" text-sm font-medium text-center whitespace-normal">
              Join us and make a difference! By registering, you{"'"}ll gain
              aces to a vibrant community of changemakers and unlock tools to
              help your nonprofit shine. Share your mission, connect with
              supporters, and amplify your impact
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center space-y-4 w-full"
            >
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="border border-black rounded"
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-black rounded"
                />
              </div>
              {/* CAPTCHA Widget */}
              <div id="clerk-captcha" />
              <div className="text-red-600 mb-8">
                {clerkError && <p>{clerkError}</p>}
              </div>
              <div>
                <p className="text-sm font-medium text-center text-black">
                  Already have an acccount?
                  <Link className="ml-2 text-ttickles-blue" href="/signin">
                    Sign in
                  </Link>
                </p>
                <div className="flex justify-center mt-4">
                  <button
                    type="submit"
                    className="px-6 py-2 text-white bg-ttickles-blue hover:opacity-75 duration-300"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <Verification
          handleVerify={handleVerify}
          code={code}
          setCode={setCode}
        />
      )}
    </div>
  );
};

export default Signup;