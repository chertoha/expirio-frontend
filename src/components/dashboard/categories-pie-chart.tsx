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

        <ResponsiveContainer width="100%" height={280}>
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
