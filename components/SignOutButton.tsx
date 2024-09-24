"use client";
import { signOut } from "next-auth/react";
import { IoExitOutline } from "react-icons/io5";

const SignOutButton = () => {
  const handleSignOut = () => {
    signOut();
  };

  return (
    <button
      className="btn btn-outline btn-sm btn-error"
      onClick={handleSignOut}
    >
      <IoExitOutline />
      Sign Out
    </button>
  );
};

export default SignOutButton;
