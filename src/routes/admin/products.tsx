import { createFileRoute } from '@tanstack/react-router'
import { useShallow } from 'zustand/react/shallow'

import ProductsTable from '@/components/tables/products.table'
import ProductsToolbar from '@/components/toolbars/products.toolbar'
import PaginationBar from '@/components/ui-kit/pagination-bar'
import { useFindProducts } from '@/hooks/api/products/use-find-products'
import { useProductsStore } from '@/store/use-products.store'

export const Route = createFileRoute('/admin/products')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isPending } = useFindProducts()
  const { page, limit, setPage, search, setSearch } = useProductsStore(
    useShallow((s) => ({
      page: s.page,
      limit: s.limit,
      search: s.search,
      setPage: s.setPage,
      setSearch: s.setSearch,
    })),
  )

  const products = data?.data || []

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-slate-900 text-3xl font-extrabold leading-8">
          Products
        </h1>
      </div>

      <p className="mt-2 text-base leading-7 text-slate-500">
        Manage and organize your medical products for easy access and control.
      </p>

      <div className="mt-6">
        <ProductsToolbar search={search || ''} onSearchChange={setSearch} />
      </div>

      <div className="mt-10 flex flex-col h-full justify-between">
        <ProductsTable products={products} isLoading={isPending} />

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
