import { createClient } from './server'

export async function uploadProductImage(
  userId: string,
  file: File
): Promise<string> {
  const supabase = await createClient()
  
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${Date.now()}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })
  
  if (error) {
    throw new Error(`Failed to upload image: ${error.message}`)
  }
  
  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(data.path)
  
  return publicUrl
}

export async function deleteProductImage(imageUrl: string): Promise<void> {
  const supabase = await createClient()
  
  // Extract path from URL
  const path = imageUrl.split('/product-images/')[1]
  
  if (!path) {
    throw new Error('Invalid image URL')
  }
  
  const { error } = await supabase.storage
    .from('product-images')
    .remove([path])
  
  if (error) {
    throw new Error(`Failed to delete image: ${error.message}`)
  }
}

export async function getImageUrl(path: string): Promise<string> {
  const supabase = await createClient()
  
  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(path)
  
  return publicUrl
}
