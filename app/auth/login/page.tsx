import React from "react";
import Social from "./Social";

const LoginPage = () => {
  return (
    <main className="w-full h-full flex justify-center items-center">
      <div className="card card-compact bg-base-100 w-[400px] shadow-3xl">
        <div className="card-body text-center">
          <h2 className="card-title">Login</h2>
          <div className="card-actions justify-end">
            <Social />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
