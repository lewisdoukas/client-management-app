import React from "react";
import CaseTable, { CaseQuery, columnNames } from "../CaseTable";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Status } from "@prisma/client";
import { prisma } from "@/prisma/client";
import Pagination from "@/components/Pagination";
import Link from "next/link";

const CasesPage = async ({ searchParams }: { searchParams: CaseQuery }) => {
  const session = await auth();

  if (!session.user.isAdmin) {
    redirect("/contact");
  }

  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  let orderBy;
  const isOrderByClient = searchParams.client;

  if (isOrderByClient) {
    orderBy = {
      client: {
        lastname: "asc",
      },
    };
  } else {
    orderBy = columnNames.includes(searchParams.orderBy)
      ? { [searchParams.orderBy]: "asc" }
      : undefined;
  }

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const cases = await prisma.case.findMany({
    where: { status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      client: true,
    },
  });

  const caseCount = await prisma.case.count();

  return (
    <main className="w-full h-full p-2">
      <div className="flex justify-between">
        <Link className="hover:underline" href="/clients">
          ← Back
        </Link>
      </div>

      <div role="tablist" className="tabs tabs-lifted mt-4 text-center">
        <CaseTable searchParams={searchParams} cases={cases} />
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={caseCount}
        />
      </div>
    </main>
  );
};

export default CasesPage;
