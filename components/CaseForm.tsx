"use client";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
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

type CaseFormData = z.infer<typeof caseSchema>;

interface Props {
  _case?: Case;
}

const CaseForm = ({ _case }: Props) => {
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

  const clientId = usePathname().split("/").at(-2);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      console.log(data);

      if (_case) await axios.patch("/api/cases/" + _case.id, data);
      else await axios.post("/api/cases", data);

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

      <div className="form-control hidden">
        <label className="label">
          <span className="label-text">CliendId</span>
        </label>
        <input
          defaultValue={clientId}
          className="input input-sm input-bordered"
          {...register("clientId")}
        />
        <FormError message={errors.clientId?.message} />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Status</span>
        </label>
        <select
          className="select select-bordered select-sm w-full max-w-xs"
          defaultValue="OPEN"
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
