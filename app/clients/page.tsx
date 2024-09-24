import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import SignOutButton from "../../components/SignOutButton";
import ClientTable, {
  ClientQuery,
  columnNames,
} from "../../components/ClientTable";
import { prisma } from "@/prisma/client";
import Pagination from "@/components/Pagination";

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

  const clientCount = await prisma.client.count();

  return (
    <main className="w-full h-full p-2">
      <div className="flex justify-between">
        <div className="flex justify-center items-center space-x-4">
          <Link className="btn btn-neutral" href="/clients/new">
            New Client
          </Link>
          <Link className="btn btn-secondary" href="/clients/cases">
            Cases
          </Link>
        </div>
        <SignOutButton />
      </div>

      <div role="tablist" className="tabs tabs-lifted mt-4 text-center">
        <ClientTable searchParams={searchParams} clients={clients} />
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={clientCount}
        />
      </div>
    </main>
  );
};

export default ClientsPage;
