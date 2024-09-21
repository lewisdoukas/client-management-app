import { auth } from "@/auth";
import { prisma } from "@/prisma/client";
import { Client } from "@prisma/client";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import { BsPencil } from "react-icons/bs";

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
      <Link className="hover:underline mb-4" href="/clients">
        ← Back
      </Link>
      <div className="card bg-base-100 max-w-[400px] shadow-xl flex flex-col justify-center items-center border border-black">
        <div className="card-body text-center">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title text-2xl">
              {client.lastname} {client.firstname}
            </h2>
            <Link
              className="btn btn-secondary btn-sm px-4"
              href={`/clients/edit/${client.id}`}
            >
              <BsPencil />
              Edit
            </Link>
          </div>

          {columns.map((column) => (
            <div
              key={column.value}
              className="grid grid-cols-2 text-start gap-x-6 gap-y-3"
            >
              <p className="font-semibold">{column.label}</p>
              <p>{client[column.value.toString()] ?? "-"}</p>
            </div>
          ))}
          <div className="grid grid-cols-2 text-start gap-x-6 gap-y-3">
            <Link href="" className="font-semibold hover:underline">
              Cases
            </Link>
            <p>0</p>
          </div>
        </div>
      </div>
    </main>
  );
};

const columns: {
  label: string;
  value: keyof Client;
}[] = [
  {
    label: "Phone number:",
    value: "phoneNumber",
  },
  {
    label: "Email:",
    value: "email",
  },
  { label: "Address:", value: "address" },
];

export default ClientDetailsPage;
