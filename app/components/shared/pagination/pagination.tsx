"use client";
import { BasicPagination } from "@/app/models/pagination";
import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/redux/store";
import { ReplaceAllIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
	count: number;
	length: number;
	dispatch: AppDispatch;
	searchParam?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fetchAction: (params: BasicPagination) => any; // Fetch action for different entities
}

const Pagination = ({
	count,
	length,
	searchParam,
	dispatch,
	fetchAction,
}: Props) => {
	const totalPages = Math.ceil(count / (length || 1));
	const [currentPage, setCurrentPage] = useState(1);
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		const page = Number(searchParams.get("page")) || 1; // Default to page 1 if null
		setCurrentPage(page); // This updates state correctly
		dispatch(
			fetchAction({
				page, // Use the extracted page number directly
				search: searchParam,
				search_exact: searchParam ? true : undefined,
			})
		); 
	}, [searchParams]);

  //this method updated the url params so that useEffect runs again
	const goToPage = (page: number) => {
		// Create a new URLSearchParams instance to modify the query params
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", page.toString());
		// Update the URL without a full page reload
		router.push(`?${params.toString()}`);
    window.scroll({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	};

    const renderPageNumbers = () => {
      const pages = [];
      const screenWidth = window.innerWidth;
      const maxVisiblePages = 6;

      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (screenWidth > 768) {
          if (currentPage <= 3) {
            pages.push(1, 2, 3, 4, "...", totalPages);
          } else if (currentPage >= totalPages - 2) {
            pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
          } else {
            pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
          }
        } else {
          if (currentPage <= 2) {
            pages.push(1, 2, 3, "...");
          } else if (currentPage >= totalPages - 1) {
            pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
          } else {
            pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...");
          }
        }
      }

		return pages;
	};

	return (
		<div className="flex items-center justify-center space-x-2 mt-4">
			<Button
				className={`hover:cursor-pointer ${
					currentPage === 1 ? "brightness-50" : ""
				} border border-[#464444] hover:bg-[#ffffff3d] active:scale-95  max-sm:py-1 max-sm:px-3 max-sm:text-xs`}
				onClick={() => goToPage(currentPage - 1)}
				inert={currentPage === 1}
				variant="outline"
			>
				Prev
			</Button>
			{renderPageNumbers().map((page, index) => (
				<Button
					className={`hover:cursor-pointer border border-[#464444] hover:bg-[#ffffff3d] active:scale-95 max-sm:py-1 max-sm:px-3 max-sm:text-xs ${
						currentPage === page ? "!bg-[#e6e6e6] text-[#242424] font-bold" : ""
					}`}
					key={index}
					onClick={() =>
						typeof page === "number" ? goToPage(page) : undefined
					}
					variant={currentPage === page ? "default" : "outline"}
					disabled={typeof page !== "number"}
					inert={currentPage === page}
				>
					{page}
				</Button>
			))}
			<Button
				className={`hover:cursor-pointer ${
					currentPage === totalPages ? "brightness-50" : ""
				} border border-[#464444] hover:bg-[#ffffff3d] active:scale-95  max-sm:py-1 max-sm:px-3 max-sm:text-xs`}
				onClick={() => goToPage(currentPage + 1)}
				disabled={currentPage === totalPages}
				variant="outline"
			>
				Next
			</Button>
		</div>
	);
};

export default Pagination;
