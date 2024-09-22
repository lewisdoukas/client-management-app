import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import SignOutButton from "../../components/SignOutButton";
import { prisma } from "@/prisma/client";
import ClientTable, { ClientQuery, columnNames } from "./ClientTable";
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
    <main className="w-full h-full p-4">
      <div className="flex justify-between">
        <Link className="btn btn-primary" href="/clients/new">
          New Client
        </Link>
        <SignOutButton />
      </div>

      <div role="tablist" className="tabs tabs-lifted mt-6 text-center">
        <input
          type="radio"
          name="tabs"
          role="tab"
          className="tab font-semibold"
          aria-label="Clients"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <ClientTable searchParams={searchParams} clients={clients} />
          <Pagination
            pageSize={pageSize}
            currentPage={page}
            itemCount={clientCount}
          />
        </div>

        <input
          type="radio"
          name="tabs"
          role="tab"
          className="tab font-semibold"
          aria-label="Cases"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          cases
        </div>
      </div>
    </main>
  );
};

export default ClientsPage;
