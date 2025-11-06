import { sendTextMessage } from '../client'
import { createClient } from '@/lib/supabase/server'

export async function handleProductCommand(from: string, command: string): Promise<void> {
  const parts = command.split(' ')
  const subCommand = parts[1]

  switch (subCommand) {
    case 'list':
    case 'daftar':
      await listUserProducts(from)
      break
    case 'detail':
      if (parts[2]) {
        await getProductDetail(from, parts[2])
      } else {
        await sendTextMessage(from, 'Format: /produk detail [id_produk]')
      }
      break
    case 'add':
    case 'tambah':
      await sendTextMessage(from, 
        'Untuk menambah produk, silakan gunakan dashboard web di:\n' +
        process.env.NEXT_PUBLIC_APP_URL + '/dashboard/products/new'
      )
      break
    default:
      await sendTextMessage(from,
        'Perintah produk:\n' +
        '/produk list - Lihat daftar produk Anda\n' +
        '/produk detail [id] - Detail produk\n' +
        '/produk tambah - Petunjuk menambah produk'
      )
  }
}

async function listUserProducts(from: string): Promise<void> {
  const supabase = await createClient()

  // Find user
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, full_name')
    .eq('whatsapp_number', from)
    .single()

  if (!profile) {
    await sendTextMessage(from, 'Akun Anda tidak terdaftar. Silakan daftar di ' + process.env.NEXT_PUBLIC_APP_URL)
    return
  }

  // Get products
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, price, stock, status')
    .eq('seller_id', profile.id)
    .order('created_at', { ascending: false })
    .limit(10)

  if (error || !products || products.length === 0) {
    await sendTextMessage(from, 'Anda belum memiliki produk. Tambahkan produk di dashboard.')
    return
  }

  let message = `📦 *Produk Anda (${profile.full_name})*\n\n`
  
  products.forEach((product, index) => {
    message += `${index + 1}. *${product.name}*\n`
    message += `   💰 Rp ${product.price.toLocaleString('id-ID')}\n`
    message += `   📊 Stok: ${product.stock}\n`
    message += `   🏷️ Status: ${product.status}\n`
    message += `   🆔 ID: ${product.id.substring(0, 8)}...\n\n`
  })

  await sendTextMessage(from, message)
}

async function getProductDetail(from: string, productId: string): Promise<void> {
  const supabase = await createClient()

  const { data: product, error } = await supabase
    .from('products')
    .select('*, profiles!seller_id(full_name)')
    .eq('id', productId)
    .single()

  if (error || !product) {
    await sendTextMessage(from, 'Produk tidak ditemukan.')
    return
  }

  let message = `📦 *Detail Produk*\n\n`
  message += `*Nama:* ${product.name}\n`
  message += `*Kategori:* ${product.category}\n`
  message += `*Harga:* Rp ${product.price.toLocaleString('id-ID')}\n`
  message += `*Stok:* ${product.stock}\n`
  message += `*Status:* ${product.status}\n`
  
  if (product.description) {
    message += `\n*Deskripsi:*\n${product.description.substring(0, 200)}...\n`
  }

  message += `\n🔗 Lihat di web: ${process.env.NEXT_PUBLIC_APP_URL}/products/${product.id}`

  await sendTextMessage(from, message)
}
