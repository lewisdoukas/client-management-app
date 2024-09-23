import { auth } from "@/auth";
import ClientCard from "@/components/ClientCard";
import { prisma } from "@/prisma/client";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import CaseTable, { CaseQuery, ExtendedClient } from "../CaseTable";

interface Props {
  params: { id: string };
  searchParams: CaseQuery;
}

const fetchClient = cache((clientId: string) =>
  prisma.client.findUnique({
    where: { id: clientId },
    include: { cases: true },
  })
);

const ClientDetailsPage = async ({ params, searchParams }: Props) => {
  const session = await auth();

  if (!session.user.isAdmin) {
    redirect("/contact");
  }

  const client = (await fetchClient(params.id)) as ExtendedClient;

  if (!client) notFound();

  return (
    <main className="flex flex-col justify-center items-center text-center">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-2">
        <ClientCard client={client} />
        <div className="lg:col-span-3 px-4">
          <div className="flex items-center justify-between lg:justify-center lg:space-x-12">
            <Link className="btn btn-primary" href="/clients/new">
              New Case
            </Link>
            <Link className="hover:underline" href="/clients">
              ← Back
            </Link>
          </div>
          <CaseTable searchParams={searchParams} client={client} />
        </div>
      </div>
    </main>
  );
};

export default ClientDetailsPage;
