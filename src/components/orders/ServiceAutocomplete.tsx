import { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/lib/supabase/client'

export function ServiceAutocomplete({
  value,
  onChange,
  onSelectService,
}: {
  value: string
  onChange: (val: string) => void
  onSelectService: (service: any) => void
}) {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [services, setServices] = useState<any[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (user) {
      supabase
        .from('services')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'Ativo')
        .then(({ data }) => {
          if (data) setServices(data)
        })
    }
  }, [user])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filtered = services.filter((s) =>
    s.name.toLowerCase().includes((value || '').toLowerCase()),
  )

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <Input
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        placeholder="Descrição do serviço/peça"
        className="w-full"
      />
      {open && filtered.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filtered.map((s) => (
            <div
              key={s.id}
              className="px-3 py-2 hover:bg-muted cursor-pointer text-sm flex justify-between items-center transition-colors"
              onClick={() => {
                onChange(s.name)
                onSelectService(s)
                setOpen(false)
              }}
            >
              <span className="font-medium truncate mr-2">{s.name}</span>
              <span className="text-emerald-500 font-semibold shrink-0">R$ {s.final_price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
