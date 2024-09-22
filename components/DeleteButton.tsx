"use client";
import { useState } from "react";
import { GoTrash } from "react-icons/go";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DeleteButton = ({ path }: { path: string }) => {
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const router = useRouter();

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
        className="btn btn-outline btn-sm btn-error w-1/2"
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
          <p className="py-4">Are you sure you want to delete client?</p>
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
