import { IconAdjustmentsAlt } from '@tabler/icons-react'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import CreateBatchButton from './create-batch.button'
import ImportBatchesButton from './import-batches.button'

export default function BatchesSettingsDropDownButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="">
        <Button variant="outline" className="w-9 h-9">
          <IconAdjustmentsAlt />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="py-4 " align="end">
        <div className="p-2">
          <ImportBatchesButton />
        </div>

        <div className="p-2">
          <CreateBatchButton />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
