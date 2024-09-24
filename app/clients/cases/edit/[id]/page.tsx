import { auth } from "@/auth";
import CaseForm from "@/components/CaseForm";
import { prisma } from "@/prisma/client";
import { Case } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: { id: string };
  searchParams: {
    clientId: keyof Case;
  };
}

const EditCasePage = async ({ params, searchParams }: Props) => {
  const session = await auth();

  if (!session.user.isAdmin) {
    redirect("/contact");
  }

  const _case = await prisma.case.findUnique({
    where: { id: params.id },
  });

  if (!_case) notFound();

  return (
    <main className="max-w-xl h-full p-4">
      <CaseForm _case={_case} clientId={searchParams.clientId} />
    </main>
  );
};

export default EditCasePage;
