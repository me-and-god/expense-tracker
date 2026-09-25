'use client';

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

type PaginationProps = {
  totalPages: number; // pass from parent if dynamic
};

const Pagination = ({ totalPages }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. URL is the single source of truth
  const currentPage = Number(searchParams.get('page')) || 1;

  function updatePage(type: 'prev' | 'next') {
    const params = new URLSearchParams(searchParams.toString());
    const targetPage = type === 'next' ? currentPage + 1 : currentPage - 1;

    // Boundary guards
    if (type === 'prev' && currentPage <= 1) return;
    if (type === 'next' && totalPages !== undefined && currentPage >= totalPages) return;

    // 2. Set or clean up the param based on the TARGET page
    if (targetPage <= 1) {
      params.delete('page');
    } else {
      params.set('page', targetPage.toString());
    }

    // 3. Navigate with the full path + query string
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  }

  return (
    <div className="flex items-center gap-4 md:gap-10 justify-evenly mt-5">


        <button
          onClick={() => updatePage('prev')}
          disabled={currentPage <= 1}
          className={`flex items-center ${ currentPage <=1 ? "opacity-30" : ""} cursor-pointer`}
        >
          <ChevronLeft size={30} className="md:hidden"/>
          <ChevronLeft size={34} className="hidden md:flex"/>
          <p className="md:text-[18px] font-semibold">prev</p>
        </button>


      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => updatePage('next')}
        disabled={ currentPage >= totalPages}
        className={`flex items-center ${currentPage >= totalPages ? "opacity-30" : ""} cursor-pointer`}
      >
          <p className="md:text-[18px] font-semibold">next</p>
          <ChevronRight size={30} className="md:hidden"/>
          <ChevronRight size={34} className="hidden md:flex"/>
      </button>
    </div>
  );
};

export default Pagination;