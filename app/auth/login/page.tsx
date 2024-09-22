"use client";
import { useSearchParams } from "next/navigation";
import Social from "./Social";
import FormError from "../../../components/FormError";
import Link from "next/link";

const LoginPage = () => {
  const searchParams = useSearchParams();

  const error = searchParams.get("error");
  const message =
    error === "OAuthAccountNotLinked"
      ? "Please use the provider you have signed up"
      : error;

  return (
    <main className="w-full h-full flex justify-center items-center">
      <div className="card card-compact bg-base-100 w-[400px] shadow-3xl border border-black p-4">
        <div className="card-body text-center">
          <div className="flex justify-between items-center mb-2">
            <h2 className="card-title">Login</h2>
            <Link href="/" className="hover:underline">
              ← Back
            </Link>
          </div>
          <div className="card-actions justify-end">
            <FormError message={message} />
            <Social />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
