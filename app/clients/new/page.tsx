"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { clientSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "@/components/FormError";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";

type ClientFormData = z.infer<typeof clientSchema>;

const NewClientPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);

      await axios.post("/api/clients", data);

      setSubmitting(false);
      router.refresh();

      toast.success("Client created!");
    } catch {
      setSubmitting(false);
      setError("An unexpected error occured");
    }
  });

  return (
    <main className="max-w-xl h-full p-4">
      <form className="card-body" onSubmit={onSubmit}>
        <h1 className="font-semibold text-2xl">Add new client</h1>

        {error && <FormError message={error} />}

        <div className="form-control">
          <label className="label">
            <span className="label-text">Firtname</span>
          </label>
          <input
            placeholder="John"
            className="input input-sm input-bordered"
            {...register("firstname")}
          />
          <FormError message={errors.firstname?.message} />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Lastname</span>
          </label>
          <input
            placeholder="Doe"
            className="input input-sm input-bordered"
            {...register("lastname")}
          />
          <FormError message={errors.lastname?.message} />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone number</span>
          </label>
          <input
            placeholder="2103522123"
            className="input input-sm input-bordered"
            {...register("phoneNumber")}
          />
          <FormError message={errors.phoneNumber?.message} />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="john.doe@example.com"
            className="input input-sm input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Address</span>
          </label>
          <input
            placeholder="Ermou 15, Athens, 15123, Greece"
            className="input input-sm input-bordered"
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" disabled={isSubmitting}>
            Create Client {isSubmitting && <Spinner />}
          </button>
        </div>
      </form>
    </main>
  );
};

export default NewClientPage;
