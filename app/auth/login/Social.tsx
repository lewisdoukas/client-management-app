"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const SocialButton = () => {
  const handleSignIn = (provider: "google" | "github") => {
    console.log(provider);
  };
  return (
    <div className="flex flex-col space-y-4 items-center w-full gap-x-2">
      <button
        className="btn btn-outline w-full"
        onClick={() => {
          handleSignIn("google");
        }}
      >
        <FcGoogle className="h-5 w-5 me-2" />
        Sign In with Google
      </button>
      <button
        className="btn btn-outline w-full"
        onClick={() => {
          handleSignIn("github");
        }}
      >
        <FaGithub className="h-5 w-5 me-2" />
        Sign In with GitHub
      </button>
    </div>
  );
};

export default SocialButton;
