import { nanoid } from 'nanoid'
import { useEffect } from 'react'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination'

import { calculatePagination } from './utils/calculation'

interface IPaginatorProps {
  totalItems: number
  currentPage: number
  onPageClick: (page: number) => void
  perPage: number
  nearbyQtyPages?: number
  shouldScrollUp?: boolean
  hasArrows?: boolean
}

export default function Paginator({
  totalItems,
  currentPage = 1,
  onPageClick,
  perPage = 20,
  nearbyQtyPages = 1,
  shouldScrollUp = false,
  hasArrows = true,
}: IPaginatorProps) {
  useEffect(() => {
    if (shouldScrollUp) window.scrollTo(0, 0)
  })

  if (totalItems <= perPage) {
    return null
  }

  const lastPageNumber = Math.ceil(Number(totalItems) / Number(perPage))
  const calculatedList = calculatePagination({
    currentPage,
    lastPageNumber,
    nearbyQtyPages,
    hasArrows,
  })

  return (
    <Pagination className="block">
      <PaginationContent>
        {calculatedList.map(({ title, value, type, Btn }) => (
          <PaginationItem key={nanoid(5)}>
            {Btn !== PaginationEllipsis ? (
              <Btn
                isActive={type === 'current'}
                href="#"
                onClick={() => {
                  onPageClick(value)
                }}
              >
                {title}
              </Btn>
            ) : (
              <PaginationEllipsis />
            )}
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  )
}
