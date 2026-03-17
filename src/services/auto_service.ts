import { supabase } from '@/lib/supabase/client'

export const getAutoBrands = async (userId: string) => {
  const { data } = await supabase
    .from('auto_brands')
    .select('*')
    .eq('user_id', userId)
    .order('name')
  return data || []
}

export const createAutoBrand = async (userId: string, name: string) => {
  const { data, error } = await supabase
    .from('auto_brands')
    .insert({ user_id: userId, name })
    .select()
    .single()
  if (error) throw error
  return data
}

export const deleteAutoBrand = async (id: string) => {
  await supabase.from('auto_brands').delete().eq('id', id)
}

export const getAutoModels = async (userId: string) => {
  const { data } = await supabase
    .from('auto_models')
    .select('*, auto_brands(name)')
    .eq('user_id', userId)
    .order('name')
  return data || []
}

export const createAutoModel = async (userId: string, brand_id: string, name: string) => {
  const { data, error } = await supabase
    .from('auto_models')
    .insert({ user_id: userId, brand_id, name })
    .select()
    .single()
  if (error) throw error
  return data
}

export const deleteAutoModel = async (id: string) => {
  await supabase.from('auto_models').delete().eq('id', id)
}

export const getAutoDefects = async (userId: string) => {
  const { data } = await supabase
    .from('auto_defects')
    .select('*')
    .eq('user_id', userId)
    .order('name')
  return data || []
}

export const createAutoDefect = async (userId: string, name: string) => {
  const { data, error } = await supabase
    .from('auto_defects')
    .insert({ user_id: userId, name })
    .select()
    .single()
  if (error) throw error
  return data
}

export const deleteAutoDefect = async (id: string) => {
  await supabase.from('auto_defects').delete().eq('id', id)
}

export const getAutoServices = async (userId: string) => {
  const { data } = await supabase
    .from('auto_services')
    .select('*, auto_models(name, auto_brands(name)), auto_defects(name)')
    .eq('user_id', userId)
  return data || []
}

export const saveAutoService = async (userId: string, payload: any) => {
  const { data, error } = await supabase
    .from('auto_services')
    .upsert({ user_id: userId, ...payload }, { onConflict: 'model_id,defect_id' })
    .select()
    .single()
  if (error) throw error
  return data
}

export const deleteAutoService = async (id: string) => {
  await supabase.from('auto_services').delete().eq('id', id)
}

export const getPublicSettings = async (slug: string) => {
  const { data } = await supabase
    .from('business_settings')
    .select('user_id, business_name, logo_url, theme_color, whatsapp_number')
    .eq('slug', slug)
    .eq('auto_active', true)
    .single()
  return data
}

export const getPublicBrands = async (userId: string) => {
  const { data } = await supabase
    .from('auto_brands')
    .select('id, name, logo_url')
    .eq('user_id', userId)
    .eq('is_active', true)
    .order('name')
  return data || []
}

export const getPublicModels = async (brandId: string) => {
  const { data } = await supabase
    .from('auto_models')
    .select('id, name')
    .eq('brand_id', brandId)
    .order('name')
  return data || []
}

export const getPublicDefects = async (userId: string) => {
  const { data } = await supabase
    .from('auto_defects')
    .select('id, name, description')
    .eq('user_id', userId)
    .order('name')
  return data || []
}

export const getPublicService = async (modelId: string, defectId: string) => {
  const { data } = await supabase
    .from('auto_services')
    .select('price, estimated_time')
    .eq('model_id', modelId)
    .eq('defect_id', defectId)
    .maybeSingle()
  return data
}
