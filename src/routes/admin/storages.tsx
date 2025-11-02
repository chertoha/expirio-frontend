import type { Storage } from '@/components/storage/storage-card'

// import PageHeader from "@/components/ui/page-header";

import { createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import * as React from 'react'

import StorageCard from '@/components/storage/storage-card'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/admin/storages')({
  component: RouteComponent,
})

function RouteComponent() {
  const [storages, setStorages] = React.useState<Storage[]>([
    {
      id: '1',
      name: 'Refrigerator Unit 1',
      description: 'Main pharmaceutical refrigerator',
      temperatureLabel: '2–8°C',
    },
    {
      id: '2',
      name: 'Cabinet A - Room 101',
      description: 'General medicine storage cabinet',
      temperatureLabel: 'Room temperature',
    },
    {
      id: '3',
      name: 'Controlled Substances Safe',
      description: 'Main pharmaceutical refrigerator',
      temperatureLabel: '2–8°C',
    },
    {
      id: '4',
      name: 'Emergency Kit Storage',
      description: 'Main pharmaceutical refrigerator',
      temperatureLabel: '2–8°C',
    },
  ])

  const handleCreate = () => alert('Open form to add new storage')
  const handleEdit = (id: string) => alert(`Edit storage ${id}`)

  return (
    <div className="p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        {/* <PageHeader
          title="Storage Locations"
          text="Manage your medicine storage areas"
        /> */}

        <Button onClick={handleCreate} variant="default" size="default">
          <Plus size={18} />
          Add location
        </Button>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {storages.map((s) => (
          <StorageCard
            key={s.id}
            storage={s}
            onEdit={handleEdit}
            // onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}
