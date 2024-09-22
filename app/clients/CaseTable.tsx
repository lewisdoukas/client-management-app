import { Case, Client, Status } from "@prisma/client";
import Link from "next/link";
import { IoMdArrowUp } from "react-icons/io";

export interface CaseQuery {
  orderBy: keyof Case;
  client: boolean;
  page: string;
  status: Status;
}

export type ExtendedCase = Case & {
  client: Client;
};

interface Props {
  searchParams: CaseQuery;
  cases: ExtendedCase[];
}

const CaseTable = ({ searchParams, cases }: Props) => {
  if (!cases) return null;

  return (
    <div className="overflow-x-auto flex justify-center items-center">
      <table className="table lg:max-w-2xl">
        <thead className="text-lg text-black font-semibold">
          <tr>
            {columns.map((column) => (
              <th key={column.value} className={column.className}>
                <Link
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value === "client" ? null : column.value,
                      client: column.value === "client",
                    },
                  }}
                >
                  {column.label}
                </Link>
                {(column.value === searchParams.orderBy ||
                  (!searchParams.orderBy &&
                    column.value === "client" &&
                    searchParams.client)) && <IoMdArrowUp className="inline" />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cases.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.status}</td>
              <td>
                {item.client.lastname} {item.client.firstname}
              </td>
              <td className="hidden md:table-cell">
                {item.updatedAt.toLocaleString()}
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
