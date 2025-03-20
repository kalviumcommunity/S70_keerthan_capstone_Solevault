"use client";
import React from "react";
import AuthToggle from "./AuthToggle";
import InputField from "./InputField";

function AuthCard() {
  const handleCreateAccount = () => {
    // Handle account creation logic here
    console.log("Creating account...");
  };

  return (
    <article className="flex flex-col self-center px-10 pt-14 pb-6 mt-20 max-w-full text-base bg-white rounded-2xl shadow-[0px_8px_24px_rgba(67,24,209,0.08)] w-[663px] max-md:px-5 max-md:mt-10">
      <AuthToggle />
      <hr className="flex shrink-0 mt-5 h-px bg-slate-200 max-md:max-w-full" />

      <h2 className="self-start mt-7 text-2xl text-gray-700">
        Create your account
      </h2>

      <form>
        <InputField label="First Name" placeholder="Enter your first name" />

        <InputField label="Last Name" placeholder="Enter your last name" />

        <InputField
          label="Email Address"
          placeholder="Enter your email address"
          type="email"
        />

        <InputField
          label="Password"
          placeholder="Create a secure password"
          type="password"
        />

        <button
          type="button"
          onClick={handleCreateAccount}
          className="w-full px-16 py-5 mt-11 text-lg font-semibold text-center text-white bg-indigo-700 rounded-xl shadow-[0px_4px_12px_rgba(67,24,209,0.25)] max-md:px-5 max-md:mt-10 max-md:max-w-full"
        >
          Create Account
        </button>
      </form>

      <div className="flex gap-1 self-center mt-10 max-w-full text-sm text-center w-[216px]">
        <p className="grow text-slate-500">Already have an account?</p>
        <button className="text-indigo-700">Log in</button>
      </div>
    </article>
  );
}

export default AuthCard;
