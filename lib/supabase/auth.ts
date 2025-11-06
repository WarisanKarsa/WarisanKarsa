import { createClient } from './server'

export async function getUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return null
  }
  
  return user
}

export async function getUserProfile() {
  const supabase = await createClient()
  const user = await getUser()
  
  if (!user) {
    return null
  }
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  
  if (error) {
    return null
  }
  
  return profile
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
}
