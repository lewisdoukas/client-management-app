"use client";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      <label className="text-sm">
        Page {currentPage} of {pageCount}
      </label>
      <button
        className="btn btn-sm"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <MdOutlineKeyboardDoubleArrowLeft />
      </button>
      <button
        className="btn btn-sm"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <HiOutlineChevronLeft />
      </button>
      <button
        className="btn btn-sm"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <HiOutlineChevronRight />
      </button>
      <button
        className="btn btn-sm"
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <MdOutlineKeyboardDoubleArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
