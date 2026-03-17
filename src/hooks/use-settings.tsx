import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from './use-auth'

export type ThemeMode = 'light' | 'dark' | 'auto'
export type ThemeColor = 'purple' | 'blue' | 'green' | 'red' | 'orange'

export interface BusinessSettings {
  id?: string
  business_name: string
  phone: string
  address: string
  description: string
  logo_url: string
  theme_mode: ThemeMode
  theme_color: ThemeColor
}

const DEFAULT_SETTINGS: BusinessSettings = {
  business_name: 'Minha Assistência',
  phone: '',
  address: '',
  description: '',
  logo_url: '',
  theme_mode: 'dark',
  theme_color: 'purple',
}

const COLOR_MAP: Record<ThemeColor, string> = {
  purple: '262 83% 58%',
  blue: '217 91% 60%',
  green: '142 71% 45%',
  red: '0 84% 60%',
  orange: '24 95% 53%',
}

interface SettingsContextType {
  settings: BusinessSettings
  updateSettings: (newSettings: Partial<BusinessSettings>) => void
  saveSettings: () => Promise<{ error: any }>
  loading: boolean
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) throw new Error('useSettings must be used within a SettingsProvider')
  return context
}

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()
  const [settings, setSettings] = useState<BusinessSettings>(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)

  // Fetch settings from DB
  useEffect(() => {
    if (!user) {
      setSettings(DEFAULT_SETTINGS)
      setLoading(false)
      return
    }

    const fetchSettings = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('business_settings')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (data && !error) {
        setSettings({
          id: data.id,
          business_name: data.business_name || '',
          phone: data.phone || '',
          address: data.address || '',
          description: data.description || '',
          logo_url: data.logo_url || '',
          theme_mode: (data.theme_mode as ThemeMode) || 'dark',
          theme_color: (data.theme_color as ThemeColor) || 'purple',
        })
      }
      setLoading(false)
    }

    fetchSettings()
  }, [user])

  // Apply Theme to DOM immediately when settings change
  useEffect(() => {
    const root = document.documentElement

    // Apply Mode
    const isDark =
      settings.theme_mode === 'dark' ||
      (settings.theme_mode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)

    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    // Apply Color
    const hslColor = COLOR_MAP[settings.theme_color] || COLOR_MAP.purple
    root.style.setProperty('--primary', hslColor)
    root.style.setProperty('--ring', hslColor)
    root.style.setProperty('--sidebar-primary', hslColor)
    root.style.setProperty('--sidebar-ring', hslColor)
  }, [settings.theme_mode, settings.theme_color])

  const updateSettings = (newSettings: Partial<BusinessSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }

  const saveSettings = async () => {
    if (!user) return { error: 'No user authenticated' }

    const { id, ...dataToSave } = settings
    const { error } = await supabase.from('business_settings').upsert(
      {
        user_id: user.id,
        ...dataToSave,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' },
    )

    return { error }
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, saveSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  )
}
