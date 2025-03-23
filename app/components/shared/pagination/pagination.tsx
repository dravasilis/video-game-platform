"use client";
import { BasicPagination } from "@/app/models/pagination";
import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/redux/store";
import { useState } from "react";

interface Props {
	count: number;
	length: number;
	dispatch: AppDispatch;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchAction: (params: BasicPagination) => any; // Fetch action for different entities
}

const Pagination = ({
	count,
	length,
	dispatch,
	fetchAction,
}: Props) => {
	const totalPages = Math.ceil(count / length);
	const [currentPage, setCurrentPage] = useState(1);

	const goToPage = (page: number ) => {
        window.scroll({
            top: 0,
            left:0,
            behavior:'smooth'
        })
		setCurrentPage(page);
         dispatch(fetchAction({ page }));

	};

	const renderPageNumbers = () => {
        const pages = [];
        const screenWidth = window.innerWidth;
        const maxVisiblePages = 6;
      
        if (totalPages <= maxVisiblePages) {
          // If there are fewer pages than the maxVisiblePages, show them all
          for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          if (screenWidth > 768) {
            // For wider screens, we keep the logic as before
            if (currentPage <= 3) {
              pages.push(1, 2, 3, 4, "...", totalPages);
            } else if (currentPage >= totalPages - 2) {
              pages.push(
                1,
                "...",
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages
              );
            }
             else {
              pages.push(
                1,
                "...",
                currentPage - 1,
                currentPage,
                currentPage + 1,
                "...",
                totalPages
              );
            }
          } else {
            // For smaller screens (under 768px), show only 1, 2, and last page
            if (currentPage <=2) {
              pages.push(1, 2,3,"...");
            }   
            else if(currentPage ===3){
              pages.push(1, 2,3,4,"...");
            }
            else{
              pages.push(1,"...",currentPage - 1, currentPage, currentPage + 1,"...");

            }
          }
        }
      
        return pages;
      };
      
      
      
      

	return (
		<div className="flex items-center justify-center space-x-2 mt-4">
			<Button
				className="hover:cursor-pointer border border-[#464444] hover:bg-[#ffffff3d] active:scale-95  max-sm:py-1 max-sm:px-3 max-sm:text-xs"
				onClick={() => goToPage(currentPage - 1 )}
				disabled={currentPage === 1}
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
                    inert={ currentPage ===page}
				>
					{page}
				</Button>
			))}
			<Button
				className="hover:cursor-pointer border border-[#464444] hover:bg-[#ffffff3d] active:scale-95 max-sm:py-1 max-sm:px-3 max-sm:text-xs "
				onClick={() => goToPage(currentPage + 1 )}
				disabled={currentPage === totalPages}
				variant="outline"
			>
				Next
			</Button>
		</div>
	);
};

export default Pagination;
