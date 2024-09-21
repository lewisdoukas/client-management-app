import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import SignOutButton from "../../components/SignOutButton";
import { prisma } from "@/prisma/client";
import ClientTable, { ClientQuery, columnNames } from "./ClientTable";

const ClientsPage = async ({ searchParams }: { searchParams: ClientQuery }) => {
  const session = await auth();

  if (!session.user.isAdmin) {
    redirect("/contact");
  }

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const clients = await prisma.client.findMany({
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return (
    <main className="w-full h-full">
      <div className="flex p-4 justify-between">
        <Link className="btn btn-primary" href="/clients/new">
          New Client
        </Link>
        <SignOutButton />
      </div>
      <ClientTable searchParams={searchParams} clients={clients} />
    </main>
  );
};

export default ClientsPage;
