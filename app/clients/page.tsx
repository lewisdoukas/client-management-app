import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
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
      <Link className="btn btn-primary" href="/clients/new">
        New Client
      </Link>

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
