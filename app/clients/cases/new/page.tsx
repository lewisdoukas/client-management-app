import { auth } from "@/auth";
import CaseForm from "@/components/CaseForm";
import { Case } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    clientId: keyof Case;
  };
}

const NewCasePage = async ({ searchParams }: Props) => {
  const session = await auth();

  if (!session.user.isAdmin) {
    redirect("/contact");
  }

  return (
    <main className="max-w-xl h-full p-4">
      <CaseForm clientId={searchParams.clientId} />
    </main>
  );
};

export default NewCasePage;
