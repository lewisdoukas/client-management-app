import Link from "next/link";
import React from "react";
import { BsPencil } from "react-icons/bs";

const EditButton = ({ path }: { path: string }) => {
  return (
    <Link className="btn btn-secondary btn-sm px-4" href={path}>
      <BsPencil />
      Edit
    </Link>
  );
};

export default EditButton;
