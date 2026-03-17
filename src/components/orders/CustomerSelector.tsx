import { useState, useEffect } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { getCustomers } from '@/services/customers'
import { useAuth } from '@/hooks/use-auth'

export function CustomerSelector({
  onSelect,
}: {
  onSelect: (id: string | null, name?: string) => void
}) {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const [customers, setCustomers] = useState<any[]>([])

  useEffect(() => {
    if (user) {
      getCustomers(user.id).then(setCustomers)
    }
  }, [user])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-background"
        >
          {value
            ? customers.find((c) => c.id === value)?.name
            : 'Selecione um cliente existente...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder="Buscar cliente..." />
          <CommandList>
            <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
            <CommandGroup>
              {customers.map((c) => (
                <CommandItem
                  key={c.id}
                  value={c.name}
                  onSelect={(currentValue) => {
                    const selected = customers.find(
                      (cust) => cust.name.toLowerCase() === currentValue,
                    )
                    setValue(selected?.id === value ? '' : selected?.id || '')
                    setOpen(false)
                    onSelect(selected?.id === value ? null : selected?.id || null, selected?.name)
                  }}
                >
                  <Check
                    className={cn('mr-2 h-4 w-4', value === c.id ? 'opacity-100' : 'opacity-0')}
                  />
                  {c.name}
                  <span className="ml-auto text-xs text-muted-foreground">{c.phone}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
