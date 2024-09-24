import { Case, Client, Status } from "@prisma/client";
import Link from "next/link";
import { IoMdArrowUp } from "react-icons/io";
import CaseStatusBadge from "./CaseStatusBadge";

export interface CaseQuery {
  orderBy: keyof Case;
  client: boolean;
  page: string;
  status: Status;
}

export type ExtendedCase = Case & {
  client: Client;
};

export type ExtendedClient = Client & {
  cases: ExtendedCase[];
};

interface Props {
  searchParams: CaseQuery;
  cases?: ExtendedCase[] | undefined;
  client?: ExtendedClient | undefined;
}

const CaseTable = ({ searchParams, cases, client }: Props) => {
  const items = cases ?? client.cases;

  if (items.length === 0) return null;

  return (
    <div className="overflow-x-auto flex justify-center items-center mt-4">
      <table className="table lg:max-w-2xl">
        <thead className="text-lg text-black font-semibold">
          <tr>
            {columns.map((column) =>
              column.label === "Client" && client ? null : (
                <th key={column.value} className={column.className}>
                  <Link
                    href={{
                      query: {
                        ...searchParams,
                        orderBy:
                          column.value === "client" ? null : column.value,
                        client: column.value === "client",
                      },
                    }}
                  >
                    {column.label}
                  </Link>
                  {(column.value === searchParams.orderBy ||
                    (!searchParams.orderBy &&
                      column.value === "client" &&
                      searchParams.client)) && (
                    <IoMdArrowUp className="inline" />
                  )}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <Link
                  href={`/clients/cases/${item.id}`}
                  className="hover:text-secondary"
                >
                  {item.title}
                </Link>
              </td>
              <td>
                <CaseStatusBadge status={item.status} />
              </td>

              {client ? null : (
                <td>
                  <Link
                    href={`/clients/${item.clientId}`}
                    className="hover:text-secondary"
                  >
                    {item.client.lastname} {item.client.firstname}
                  </Link>
                </td>
              )}

              <td className="hidden md:table-cell">
                {item.updatedAt.toLocaleString("en-GB")}
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
  value?: keyof ExtendedCase;
  className?: string;
}[] = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status" },
  { label: "Client", value: "client" },
  {
    label: "Updated",
    value: "updatedAt",
    className: "hidden md:table-cell",
  },
];

export const columnNames = columns.map((column) => column.value);

export default CaseTable;
