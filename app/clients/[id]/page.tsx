import { auth } from "@/auth";
import ClientCard from "@/components/ClientCard";
import { prisma } from "@/prisma/client";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";

interface Props {
  params: { id: string };
}

const fetchClient = cache((clientId: string) =>
  prisma.client.findUnique({ where: { id: clientId } })
);

const ClientDetailsPage = async ({ params }: Props) => {
  const session = await auth();

  if (!session.user.isAdmin) {
    redirect("/contact");
  }

  const client = await fetchClient(params.id);

  if (!client) notFound();

  return (
    <main className="flex flex-col justify-center items-center text-center">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-2">
        <ClientCard client={client} />
        <div className="lg:col-span-3 px-4">
          <div className="flex items-center justify-between">
            <Link className="btn btn-primary" href="/clients/new">
              New Case
            </Link>
            <Link className="hover:underline mb-4" href="/clients">
              ← Back
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ClientDetailsPage;
