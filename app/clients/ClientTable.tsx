import { Client } from "@prisma/client";
import Link from "next/link";
import { IoMdArrowUp } from "react-icons/io";

export interface ClientQuery {
  orderBy: keyof Client;
  page: string;
}

interface Props {
  searchParams: ClientQuery;
  clients: Client[];
}

const ClientTable = ({ searchParams, clients }: Props) => {
  return (
    <div className="overflow-x-auto p-4 flex justify-center items-center">
      <table className="table lg:max-w-2xl">
        <thead className="text-lg text-black font-semibold">
          <tr>
            {columns.map((column) => (
              <th key={column.value} className={column.className}>
                <Link
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </Link>
                {column.value === searchParams.orderBy && (
                  <IoMdArrowUp className="inline" />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>
                <Link href={`/clients/${client.id}`}>
                  {client.lastname} {client.firstname}
                </Link>
              </td>
              <td>{client.phoneNumber}</td>
              <td className="hidden md:table-cell">
                {client.updatedAt.toDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const columns: {
  label: string;
  value: keyof Client;
  className?: string;
}[] = [
  { label: "Client", value: "lastname" },
  {
    label: "Phone number",
    value: "phoneNumber",
  },
  { label: "Updated", value: "updatedAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);

export default ClientTable;
