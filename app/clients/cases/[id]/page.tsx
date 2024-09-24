import { auth } from "@/auth";
import { prisma } from "@/prisma/client";
import { notFound, redirect } from "next/navigation";
import React, { cache } from "react";
import { ExtendedCase } from "../../../../components/CaseTable";
import CaseCard from "@/components/CaseCard";
import Link from "next/link";

interface Props {
  params: { id: string };
}

const fetchCase = cache((caseId: string) =>
  prisma.case.findUnique({
    where: { id: caseId },
    include: { client: true },
  })
);

const CaseDetailPage = async ({ params }: Props) => {
  const session = await auth();

  if (!session.user.isAdmin) {
    redirect("/contact");
  }

  const _case = (await fetchCase(params.id)) as ExtendedCase;

  if (!_case) notFound();

  return (
    <main className="flex flex-col justify-center items-center text-center">
      <Link className="hover:underline" href={`/clients/${_case.clientId}`}>
        ← Back
      </Link>

      <CaseCard _case={_case} />
    </main>
  );
};

export default CaseDetailPage;
