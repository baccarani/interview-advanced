import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination'

import { Dispatch, SetStateAction } from 'react'

type Props = {
  totalCount: number
  currentPage: number
  perPageCount: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export const CustomPagination = ({
  totalCount,
  perPageCount,
  currentPage,
  setCurrentPage,
}: Props) => {
  const pages = [
    ...Array(Math.ceil(totalCount / perPageCount) + 1).keys(),
  ].slice(1)

  const prevHandler: React.MouseEventHandler = () => {
    if (currentPage !== 1) setCurrentPage((prev) => prev - 1)
  }

  const nextHandler: React.MouseEventHandler = () => {
    if (currentPage !== pages[pages.length - 1])
      setCurrentPage((prev) => prev + 1)
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={prevHandler}
            className='cursor-pointer'
          />
        </PaginationItem>
        <PaginationItem>
          {pages
            .filter((page) => 
            (currentPage === 1 && page <= 3) ||
            (currentPage === pages[pages.length - 1] && page >= pages[pages.length - 1] - 2) ||
            (currentPage !== 1 && currentPage !== pages[pages.length - 1] && Math.abs(currentPage - page) <= 1)
          )
            .map((page) => {
              return (
                <PaginationLink
                  className='cursor-pointer'
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              )
            })}
        </PaginationItem>
        {currentPage < pages[pages.length - 1] - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext onClick={nextHandler} className='cursor-pointer' />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
