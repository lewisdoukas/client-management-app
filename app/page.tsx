import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col h-full justify-center items-center text-center">
      <div className="text-center space-y-4">
        <h1 className="font-bold text-4xl ">
          👋 Welcome to Client Management App!
        </h1>
        <div className="flex justify-center items-center space-x-4">
          <Link href="/auth/login" className="btn btn-secondary">
            Login
          </Link>
          {/* <Link href="contact" className="btn btn-accent">
            Contact
          </Link> */}
        </div>
      </div>
    </main>
  );
}
