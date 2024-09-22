import { Client } from "@prisma/client";
import React from "react";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

const ClientCard = ({ client }: { client: Client }) => {
  return (
    <div className="card bg-base-100 max-w-[400px] shadow-xl flex flex-col justify-center items-center border border-black">
      <div className="card-body text-center">
        <h2 className="card-title text-2xl">
          {client.lastname} {client.firstname}
        </h2>

        {columns.map((column) => (
          <div
            key={column.value}
            className="grid grid-cols-2 text-start gap-x-6 gap-y-3"
          >
            <p className="font-semibold">{column.label}</p>
            <p>{client[column.value.toString()] ?? "-"}</p>
          </div>
        ))}
        <div className="flex justify-center items-center w-full px-2 mt-4 space-x-4">
          <EditButton path={`/clients/edit/${client.id}`} />
          <DeleteButton path={`/clients/${client.id}`} />
        </div>
      </div>
    </div>
  );
};

const columns: {
  label: string;
  value: keyof Client;
}[] = [
  {
    label: "Phone number:",
    value: "phoneNumber",
  },
  {
    label: "Email:",
    value: "email",
  },
  { label: "Address:", value: "address" },
];

export default ClientCard;
