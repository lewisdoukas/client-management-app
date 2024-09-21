import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import SignOutButton from "../../components/SignOutButton";

const ClientsPage = async () => {
  const session = await auth();

  if (!session.user.isAdmin) {
    redirect("/contact");
  }

  return (
    <div className="flex p-4 justify-between">
      <Link className="btn btn-primary" href="/clients/new">
        New Client
      </Link>
      <SignOutButton />
    </div>
  );
};

export default ClientsPage;
