"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { caseSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "@/components/FormError";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";
import Link from "next/link";
import { Case } from "@prisma/client";
import classnames from "classnames";

type CaseFormData = z.infer<typeof caseSchema>;

interface Props {
  _case?: Case;
  clientId: string;
}

const CaseForm = ({ _case, clientId }: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CaseFormData>({
    resolver: zodResolver(caseSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);

      const caseData = { ...data, clientId };

      if (_case) await axios.patch("/api/cases/" + _case.id, caseData);
      else await axios.post("/api/cases", caseData);

      setSubmitting(false);
      router.push("/clients/" + clientId);
      router.refresh();

      toast.success(_case ? "Case updated!" : "Case created!");
    } catch {
      setSubmitting(false);
      setError("An unexpected error occured");
    }
  });
  return (
    <form className="card-body" onSubmit={onSubmit}>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl">
          {_case ? "Update case" : "Add new case"}
        </h1>
        <Link href={"/clients/" + clientId} className="hover:underline">
          ← Back
        </Link>
      </div>

      {error && <FormError message={error} />}

      <div
        className={classnames({
          "form-control": true,
          hidden: !_case,
        })}
      >
        <label className="label">
          <span className="label-text">Status</span>
        </label>
        <select
          className="select select-bordered select-sm w-full max-w-xs"
          defaultValue={_case?.status || "OPEN"}
          {...register("status")}
        >
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="CLOSED">Closed</option>
        </select>
        <FormError message={errors.status?.message} />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          defaultValue={_case?.title}
          placeholder="Contract"
          className="input input-sm input-bordered"
          {...register("title")}
        />
        <FormError message={errors.title?.message} />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          defaultValue={_case?.description}
          className="textarea textarea-bordered"
          placeholder="This is the description of this contract.."
          {...register("description")}
        ></textarea>
        <FormError message={errors.description?.message} />
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary" disabled={isSubmitting}>
          {_case ? "Update Case" : "Create New Case"}{" "}
          {isSubmitting && <Spinner />}
        </button>
      </div>
    </form>
  );
};

export default CaseForm;
