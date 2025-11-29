import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { useGetCategoryList } from '@/hooks/api/categories/use-get-category-list'

import { Card, CardContent } from '../ui/card'

export default function CategoriesPieChart() {
  const { categoryList = [] } = useGetCategoryList()

  const categoryData = categoryList.map((c) => ({
    name: c.name,
    value: c.products.length,
  }))

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-4">
        <h2 className="mb-4 text-3xl font-medium">Categories</h2>

        <div className="flex">
          <ResponsiveContainer width="60%" height={280}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {categoryData.map((entry, i) => (
                  <Cell key={i} fill={getPastelColorFromString(entry.name)} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div
            className="grow custom-scroll w-1/3 overflow-y-auto pr-3"
            style={{ maxHeight: '280px' }}
          >
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center gap-2 py-1">
                <div
                  className="h-3 w-3 rounded-sm"
                  style={{
                    backgroundColor: getPastelColorFromString(cat.name),
                  }}
                />

                <span className="text-gray-800 text-sm">{cat.name}</span>

                <span className="ml-auto text-sm font-medium">{cat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function getPastelColorFromString(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = Math.abs(hash) % 360
  return `hsl(${hue}, 80%, 70%)`
}
