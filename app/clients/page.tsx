import { auth } from "@/auth";
import { redirect } from "next/navigation";

const ClientsPage = async () => {
  const session = await auth();
  console.log("CLIENTS PAGE: ", session);

  if (!session.user.isAdmin) {
    redirect("/contact");
  }

  return <div>Clients page</div>;
};

export default ClientsPage;
