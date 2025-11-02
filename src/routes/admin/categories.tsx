import { createFileRoute } from '@tanstack/react-router'

import CreateCategoryButton from '@/components/buttons/create-category.button'
import CategoriesTable from '@/components/tables/categories.table'

export const Route = createFileRoute('/admin/categories')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-slate-900 text-3xl font-extrabold leading-8">
          Categories
        </h1>

        <CreateCategoryButton />
      </div>

      <p className="mt-2 text-base leading-7 text-slate-500">
        Manage and organize your medical supply categories for easy access and
        control.
      </p>

      <div className="mt-10">
        <CategoriesTable />
      </div>
    </div>
  )
}
