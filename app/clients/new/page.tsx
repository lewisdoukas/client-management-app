import { auth } from "@/auth";
import ClientForm from "@/components/ClientForm";
import { redirect } from "next/navigation";

const NewClientPage = async () => {
  const session = await auth();

  if (!session.user.isAdmin) {
    redirect("/contact");
  }

  return (
    <main className="max-w-xl h-full p-4">
      <ClientForm />
    </main>
  );
};

export default NewClientPage;
