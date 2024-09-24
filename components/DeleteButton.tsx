"use client";
import { useState } from "react";
import { GoTrash } from "react-icons/go";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Case, Client } from "@prisma/client";
import classnames from "classnames";

interface Props {
  path: string;
  client?: Client;
  _case?: Case;
  card: boolean;
}

const DeleteButton = ({ path, client, _case, card = false }: Props) => {
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const router = useRouter();

  const message = client
    ? `client ${client.lastname} ${client.firstname}?`
    : `case ${_case.title}?`;

  const handleDelete = async () => {
    try {
      setSubmitting(true);

      await axios.delete("/api" + path);

      setSubmitting(false);
      router.push("/clients");
      router.refresh();

      toast.success("Client deleted!");
    } catch (err) {
      setSubmitting(false);
      setError("An unexpected error occured");
      toast.error(error);
      console.error(err);
    }
  };

  return (
    <>
      <button
        className={classnames({
          "btn btn-outline btn-sm btn-error w-1/2": true,
          "lg:w-1/4": card,
        })}
        onClick={() =>
          (
            document.getElementById("deleteModal") as HTMLDialogElement
          )?.showModal()
        }
      >
        <GoTrash />
        Delete
      </button>
      <dialog id="deleteModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete client</h3>
          <p className="py-4">{`Are you sure you want to delete ${message}`}</p>
          <div className="modal-action">
            <form method="dialog">
              <div className="flex justify-end items-center space-x-4">
                <button
                  className="btn btn-sm btn-outline btn-error"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                >
                  Delete
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  disabled={isSubmitting}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeleteButton;
