import { auth } from "@/auth";
import CaseForm from "@/components/CaseForm";
import { redirect } from "next/navigation";

const NewCasePage = async () => {
  const session = await auth();

  if (!session.user.isAdmin) {
    redirect("/contact");
  }

  return (
    <main className="max-w-xl h-full p-4">
      <CaseForm />
    </main>
  );
};

export default NewCasePage;
