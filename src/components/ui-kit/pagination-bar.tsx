import Paginator from './paginator'

type PaginationBarProps = {
  page?: number
  limit?: number
  total?: number
  onPageClick: (page: number) => void
}

export default function PaginationBar({
  page = 1,
  limit = 10,
  total = 0,
  onPageClick,
}: PaginationBarProps) {
  const from = (page - 1) * limit + 1
  const to = Math.min(page * limit, total)

  return (
    <div className="mt-6 flex max-xs:flex-col-reverse gap-4 items-center justify-between">
      <p className="shrink-0 flex gap-x-1 text-sm leading-[1.285] font-medium">
        <span className="text-slate-400">Items</span>
        {from}-{to}
        <span className="text-text-label text-slate-400">of </span>
        {total}
      </p>

      <Paginator
        currentPage={page}
        perPage={limit}
        totalItems={total}
        onPageClick={onPageClick}
      />
    </div>
  )
}
