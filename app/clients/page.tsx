import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import SignOutButton from "../../components/SignOutButton";
import { prisma } from "@/prisma/client";

const ClientsPage = async () => {
  const session = await auth();

  if (!session.user.isAdmin) {
    redirect("/contact");
  }

  const clients = await prisma.client.findMany();

  return (
    <main className="w-full h-full">
      <div className="flex p-4 justify-between">
        <Link className="btn btn-primary" href="/clients/new">
          New Client
        </Link>
        <SignOutButton />
      </div>
      <div className="overflow-x-auto p-4">
        <table className="table">
          <thead className="text-lg text-black font-semibold">
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Phone number</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.firstname}</td>
                <td>{client.lastname}</td>
                <td>{client.phoneNumber}</td>
                <td>Edit</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default ClientsPage;
