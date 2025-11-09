import type { Control, Path } from 'react-hook-form'

import { Check, ChevronsUpDown, XIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Controller } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type Option = {
  label: string
  value: string | number
}

type BaseProps = {
  options: Option[]
  placeholder?: string
  emptyText?: string
  labelledId?: string
  className?: string
  isNumber?: boolean
}

type RhfProps<T extends Record<string, any>> = {
  control: Control<T>
  name: Path<T>
  value?: never
  onChange?: never
}

type ControlledProps = {
  control?: never
  name?: never
  value: string | number | null
  onChange: (value: string | number | null) => void
}

type SearchSelectProps<T extends Record<string, any>> = BaseProps &
  (RhfProps<T> | ControlledProps)

export default function SearchSelect<T extends Record<string, any>>(
  props: SearchSelectProps<T>,
) {
  const {
    options,
    placeholder = 'Select option...',
    emptyText = 'No options found.',
    labelledId,
    className,
    isNumber = false,
  } = props

  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filteredOptions = useMemo(() => {
    const s = search.toLowerCase().trim()
    return s
      ? options.filter((opt) => opt.label.toLowerCase().includes(s))
      : options
  }, [search, options])

  const renderSelect = (
    value: string | number | null,
    onChange: (val: string | number | null) => void,
  ) => {
    const selectedOption = options.find(
      (opt) => String(opt.value) === String(value),
    )

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger id={labelledId} asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              'justify-between',
              !selectedOption
                ? 'text-muted-foreground font-normal'
                : 'text-inherit',
              className,
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
            {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
             */}

            <div className="flex items-center gap-1">
              {selectedOption && (
                <span
                  onClick={(e) => {
                    e.stopPropagation()
                    onChange(null)
                  }}
                  className="cursor-pointer text-muted-foreground hover:text-destructive"
                >
                  <XIcon />
                </span>
              )}
              <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search..."
              className="h-9"
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              {filteredOptions.length === 0 ? (
                <CommandEmpty>{emptyText}</CommandEmpty>
              ) : (
                <CommandGroup>
                  {filteredOptions.map((opt) => (
                    <CommandItem
                      key={opt.value}
                      value={String(opt.value)}
                      onSelect={(currentValue) => {
                        const castedValue = isNumber
                          ? Number(currentValue)
                          : String(currentValue)

                        const newValue =
                          String(value) === String(currentValue)
                            ? null
                            : castedValue

                        onChange(newValue)
                        setOpen(false)
                        setSearch('')
                      }}
                    >
                      {opt.label}
                      <Check
                        className={cn(
                          'ml-auto h-4 w-4',
                          String(value) === String(opt.value)
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }

  if ('control' in props && props.control) {
    return (
      <Controller
        control={props.control}
        name={props.name}
        render={({ field }) => renderSelect(field.value, field.onChange)}
      />
    )
  }

  return renderSelect(props.value, props.onChange)
}

// type Option = {
//   label: string
//   value: string | number
// }

// type SearchSelectProps<T extends Record<string, any>> = {
//   control: Control<T>
//   name: Path<T>
//   options: Option[]
//   placeholder?: string
//   emptyText?: string
//   labelledId?: string
//   className?: string
//   isNumber?: boolean
// }

// export default function SearchSelect<T extends Record<string, any>>({
//   control,
//   name,
//   options,
//   placeholder = 'Select option...',
//   emptyText = 'No options found.',
//   labelledId,
//   className,
//   isNumber = false,
// }: SearchSelectProps<T>) {
//   const [open, setOpen] = useState(false)
//   const [search, setSearch] = useState('')

//   const filteredOptions = useMemo(() => {
//     const s = search.toLowerCase().trim()
//     return s
//       ? options.filter((opt) => opt.label.toLowerCase().includes(s))
//       : options
//   }, [search, options])

//   return (
//     <Controller
//       control={control}
//       name={name}
//       render={({ field }) => {
//         const selectedOption = options.find(
//           (opt) => String(opt.value) === String(field.value),
//         )

//         return (
//           <Popover open={open} onOpenChange={setOpen} modal>
//             <PopoverTrigger id={labelledId} asChild>
//               <Button
//                 variant="outline"
//                 role="combobox"
//                 aria-expanded={open}
//                 className={cn(
//                   'justify-between',
//                   !selectedOption
//                     ? 'text-muted-foreground font-normal'
//                     : 'text-inherit',
//                   className,
//                 )}
//               >
//                 {selectedOption ? selectedOption.label : placeholder}
//                 <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//               </Button>
//             </PopoverTrigger>

//             <PopoverContent className={cn('p-0')}>
//               <Command shouldFilter={false}>
//                 <CommandInput
//                   placeholder="Search..."
//                   className="h-9"
//                   value={search}
//                   onValueChange={setSearch}
//                 />
//                 <CommandList>
//                   {filteredOptions.length === 0 ? (
//                     <CommandEmpty>{emptyText}</CommandEmpty>
//                   ) : (
//                     <CommandGroup>
//                       {filteredOptions.map((opt) => (
//                         <CommandItem
//                           key={opt.value}
//                           value={String(opt.value)}
//                           onSelect={(currentValue) => {
//                             const castedValue = isNumber
//                               ? Number(currentValue)
//                               : String(currentValue)

//                             field.onChange(
//                               currentValue === String(field.value)
//                                 ? 0
//                                 : castedValue,
//                             )
//                             setOpen(false)
//                             setSearch('')
//                           }}
//                         >
//                           {opt.label}
//                           <Check
//                             className={cn(
//                               'ml-auto h-4 w-4',
//                               String(field.value) === String(opt.value)
//                                 ? 'opacity-100'
//                                 : 'opacity-0',
//                             )}
//                           />
//                         </CommandItem>
//                       ))}
//                     </CommandGroup>
//                   )}
//                 </CommandList>
//               </Command>
//             </PopoverContent>
//           </Popover>
//         )
//       }}
//     />
//   )
// }
