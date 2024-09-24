import { Status } from "@prisma/client";

interface Props {
  status: Status;
}

const statusMap: Record<
  Status,
  {
    label: string;
    bg: "bg-red-200" | "bg-violet-200" | "bg-emerald-200";
    color: "text-red-500" | "text-violet-500" | "text-emerald-500";
  }
> = {
  OPEN: { label: "Open", bg: "bg-red-200", color: "text-red-500" },
  IN_PROGRESS: {
    label: "In Progress",
    bg: "bg-violet-200",
    color: "text-violet-500",
  },
  CLOSED: { label: "Closed", bg: "bg-emerald-200", color: "text-emerald-500" },
};

const CaseStatusBadge = ({ status }: Props) => {
  return (
    <div
      className={`badge font-semibold p-3 ${statusMap[status].bg} ${statusMap[status].color}`}
    >
      {statusMap[status].label}
    </div>
  );
};

export default CaseStatusBadge;
