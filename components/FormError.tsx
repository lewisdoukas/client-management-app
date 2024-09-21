import { BsExclamationTriangleFill } from "react-icons/bs";

const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <div className="bg-error/15 mt-1 p-2 rounded-md flex items-center gap-x-2 text-sm text-error w-full">
      <BsExclamationTriangleFill className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
