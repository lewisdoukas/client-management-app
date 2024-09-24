import React from "react";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import { ExtendedCase } from "@/components/CaseTable";
import { LuUser2 } from "react-icons/lu";
import { BsTelephone } from "react-icons/bs";

const CaseCard = ({ _case }: { _case: ExtendedCase }) => {
  return (
    <div className="card bg-slate-100 w-[400px] md:w-1/2 shadow-xl flex flex-col justify-center items-center">
      <div className="card-body text-center w-full">
        <div className="flex items-center justify-between">
          <h2 className="card-title text-2xl">{_case.title}</h2>
          <p className="text-end">{_case.status}</p>
        </div>
        <div className="flex flex-col justify-start my-2 md:flex-row md:space-x-10">
          <div className="flex justify-start items-center gap-x-2">
            <LuUser2 />
            {_case.client.lastname} {_case.client.firstname}
          </div>
          <div className="flex justify-start items-center gap-x-2">
            <BsTelephone />
            {_case.client.phoneNumber}
          </div>
        </div>
        <p className="text-pretty break-words text-start overflow-y-auto">
          {_case.description}
        </p>
        <div className="flex justify-center items-center w-full mt-4 space-x-4">
          <EditButton path={`/clients/${_case.clientId}/edit-case`} />
          <DeleteButton path={`/cases/${_case.id}`} _case={_case} />
        </div>
      </div>
    </div>
  );
};

export default CaseCard;
