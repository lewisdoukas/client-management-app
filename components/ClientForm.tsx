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
import Link from "next/link";
import { Client } from "@prisma/client";

type ClientFormData = z.infer<typeof clientSchema>;

interface Props {
  client?: Client;
}

const ClientForm = ({ client }: Props) => {
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

      if (client) await axios.patch("/api/clients/" + client.id, data);
      else await axios.post("/api/clients", data);

      setSubmitting(false);
      router.push("/clients");
      router.refresh();

      toast.success(client ? "Client updated!" : "Client created!");
    } catch {
      setSubmitting(false);
      setError("An unexpected error occured");
    }
  });
  return (
    <form className="card-body" onSubmit={onSubmit}>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl">Add new client</h1>
        <Link href="/clients" className="hover:underline">
          ← Back
        </Link>
      </div>

      {error && <FormError message={error} />}

      <div className="form-control">
        <label className="label">
          <span className="label-text">Firstname</span>
        </label>
        <input
          defaultValue={client?.firstname}
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
          defaultValue={client?.lastname}
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
          defaultValue={client?.phoneNumber}
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
          defaultValue={client?.email}
          placeholder="john.doe@example.com"
          className="input input-sm input-bordered"
          {...register("email")}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Address</span>
        </label>
        <input
          defaultValue={client?.address}
          placeholder="Ermou 15, Athens, 15123, Greece"
          className="input input-sm input-bordered"
          {...register("address")}
        />
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary" disabled={isSubmitting}>
          {client ? "Update Client" : "Create New Client"}{" "}
          {isSubmitting && <Spinner />}
        </button>
      </div>
    </form>
  );
};

export default ClientForm;
