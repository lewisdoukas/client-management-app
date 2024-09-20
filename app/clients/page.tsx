import { auth } from "@/auth";

const ClientsPage = async () => {
  const session = await auth();
  console.log("CLIENTS PAGE: ", session);

  return <div>Clients page</div>;
};

export default ClientsPage;
