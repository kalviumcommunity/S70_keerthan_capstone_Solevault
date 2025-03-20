"use client";
import React, { useState } from "react";

function AuthToggle() {
  const [activeTab, setActiveTab] = useState("signup");

  return (
    <nav className="flex flex-wrap gap-5 justify-between text-4xl whitespace-nowrap max-md:max-w-full">
      <button
        className={activeTab === "login" ? "text-indigo-700" : "text-slate-400"}
        onClick={() => setActiveTab("login")}
      >
        Login
      </button>
      <button
        className={
          activeTab === "signup" ? "text-indigo-700" : "text-slate-400"
        }
        onClick={() => setActiveTab("signup")}
      >
        Signup
      </button>
    </nav>
  );
}

export default AuthToggle;
