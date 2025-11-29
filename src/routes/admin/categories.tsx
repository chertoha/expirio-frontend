import { createFileRoute } from '@tanstack/react-router'
import { useShallow } from 'zustand/react/shallow'

import CategoriesTable from '@/components/tables/categories.table'
import CategoriesToolbar from '@/components/toolbars/categories.toolbar'
import PaginationBar from '@/components/ui-kit/pagination-bar'
import { useFindCategories } from '@/hooks/api/categories/use-find-categories'
import { useCategoriesStore } from '@/store/use-categories.store'

export const Route = createFileRoute('/admin/categories')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isPending } = useFindCategories()
  const { page, limit, setPage, search, setSearch } = useCategoriesStore(
    useShallow((s) => ({
      page: s.page,
      limit: s.limit,
      search: s.search,
      setPage: s.setPage,
      setSearch: s.setSearch,
    })),
  )

  const categories = data?.data || []

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-slate-900 text-3xl font-extrabold leading-8">
          Categories
        </h1>
      </div>

      <p className="mt-2 text-base leading-7 text-slate-500">
        Manage and organize your medical supply categories for easy access and
        control.
      </p>

      <div className="mt-6">
        <CategoriesToolbar search={search || ''} onSearchChange={setSearch} />
      </div>

      <div className="mt-10 flex flex-col h-full justify-between">
        <CategoriesTable categories={categories} isLoading={isPending} />

        <PaginationBar
          page={page}
          limit={limit}
          total={data?.totalElements}
          onPageClick={(page: number) => setPage(page)}
        />
      </div>
    </>
  )
}
