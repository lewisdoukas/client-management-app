import { Client } from "@prisma/client";
import { BsTelephone } from "react-icons/bs";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

const ClientCard = ({ client }: { client: Client }) => {
  return (
    <div className="card bg-sky-100 w-[400px] shadow-xl flex flex-col justify-center items-center">
      <div className="card-body text-center">
        <h2 className="card-title text-2xl">
          {client.lastname} {client.firstname}
        </h2>
        <div className="flex flex-col justify-start gap-2 my-2">
          <div className="flex justify-start items-center gap-x-2">
            <BsTelephone />
            {client.phoneNumber}
          </div>
          <p>{client.email}</p>
          {client.address && <p>{client.address}</p>}
        </div>

        {/* {columns.map((column) => (
          <div
            key={column.value}
            className="grid grid-cols-2 text-start gap-x-6 gap-y-3 break-words"
          >
            <p className="font-semibold">{column.label}</p>
            <p>{client[column.value.toString()] ?? "-"}</p>
          </div>
        ))} */}
        <div className="flex justify-center items-center w-full px-2 mt-4 space-x-4">
          <EditButton path={`/clients/edit/${client.id}`} />
          <DeleteButton path={`/clients/${client.id}`} />
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
