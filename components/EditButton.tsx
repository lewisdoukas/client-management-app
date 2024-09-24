import Link from "next/link";
import React from "react";
import { BsPencil } from "react-icons/bs";
import classnames from "classnames";

const EditButton = ({ path, card=false }: { path: string; card: boolean }) => {
  return (
    <Link
      className={classnames({
        "btn btn-neutral btn-sm w-1/2": true,
        "lg:w-1/4": card,
      })}
      href={path}
    >
      <BsPencil />
      Edit
    </Link>
  );
};

export default EditButton;
