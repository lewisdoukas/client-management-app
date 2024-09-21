import { auth } from "@/auth";
import ClientForm from "@/components/ClientForm";
import { prisma } from "@/prisma/client";
import { notFound, redirect } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const EditClientPage = async ({ params }: Props) => {
  const session = await auth();

  if (!session.user.isAdmin) {
    redirect("/contact");
  }

  const client = await prisma.client.findUnique({
    where: { id: params.id },
  });

  if (!client) notFound();

  return (
    <main className="max-w-xl h-full p-4">
      <ClientForm client={client} />
    </main>
  );
};

export default EditClientPage;
