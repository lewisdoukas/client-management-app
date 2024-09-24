import { Client } from "@prisma/client";
import { BsTelephone } from "react-icons/bs";
import { IoMailOutline } from "react-icons/io5";
import { BsBuilding } from "react-icons/bs";

import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

const ClientCard = ({ client }: { client: Client }) => {
  return (
    <div className="card bg-sky-100 w-[400px] shadow-xl flex flex-col justify-center items-center">
      <div className="card-body text-center w-full">
        <h2 className="card-title text-2xl">
          {client.lastname} {client.firstname}
        </h2>
        <div className="flex flex-col justify-start gap-2 my-2">
          <div className="flex justify-start items-center gap-x-2">
            <BsTelephone />
            {client.phoneNumber}
          </div>

          {client.email && (
            <div className="flex justify-start items-center gap-x-2">
              <IoMailOutline />
              {client.email}
            </div>
          )}

          {client.address && (
            <div className="flex justify-start items-center gap-x-2 text-start">
              <BsBuilding />
              {client.address}
            </div>
          )}
        </div>
        <div className="flex justify-center items-center w-full mt-4 space-x-4">
          <EditButton path={`/clients/edit/${client.id}`} card={false} />
          <DeleteButton
            path={`/clients/${client.id}`}
            client={client}
            card={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
