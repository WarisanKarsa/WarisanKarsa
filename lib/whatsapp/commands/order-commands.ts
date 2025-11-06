import { sendTextMessage } from '../client'
import { createClient } from '@/lib/supabase/server'

export async function handleOrderCommand(from: string, command: string): Promise<void> {
  const parts = command.split(' ')
  const subCommand = parts[1]

  switch (subCommand) {
    case 'list':
    case 'daftar':
      await listUserOrders(from)
      break
    case 'detail':
      if (parts[2]) {
        await getOrderDetail(from, parts[2])
      } else {
        await sendTextMessage(from, 'Format: /order detail [id_order]')
      }
      break
    default:
      await sendTextMessage(from,
        'Perintah order:\n' +
        '/order list - Lihat daftar pesanan\n' +
        '/order detail [id] - Detail pesanan'
      )
  }
}

async function listUserOrders(from: string): Promise<void> {
  const supabase = await createClient()

  // Find user
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, full_name, role')
    .eq('whatsapp_number', from)
    .single()

  if (!profile) {
    await sendTextMessage(from, 'Akun Anda tidak terdaftar.')
    return
  }

  // Get orders (as buyer or seller)
  const query = supabase
    .from('orders')
    .select(`
      id,
      quantity,
      total_price,
      status,
      created_at,
      products(name)
    `)
    .order('created_at', { ascending: false })
    .limit(10)

  if (profile.role === 'seller') {
    query.eq('seller_id', profile.id)
  } else {
    query.eq('buyer_id', profile.id)
  }

  const { data: orders, error } = await query

  if (error || !orders || orders.length === 0) {
    await sendTextMessage(from, 'Anda belum memiliki pesanan.')
    return
  }

  let message = `📦 *Pesanan Anda*\n\n`
  
  orders.forEach((order: any, index: number) => {
    message += `${index + 1}. *${order.products?.name || 'Produk'}*\n`
    message += `   💰 Rp ${order.total_price.toLocaleString('id-ID')}\n`
    message += `   📊 Status: ${order.status}\n`
    message += `   🆔 ${order.id.substring(0, 8)}...\n\n`
  })

  await sendTextMessage(from, message)
}

async function getOrderDetail(from: string, orderId: string): Promise<void> {
  const supabase = await createClient()

  const { data: order, error } = await supabase
    .from('orders')
    .select(`
      *,
      products(name, price),
      buyer:profiles!buyer_id(full_name, phone),
      seller:profiles!seller_id(full_name, phone)
    `)
    .eq('id', orderId)
    .single()

  if (error || !order) {
    await sendTextMessage(from, 'Pesanan tidak ditemukan.')
    return
  }

  let message = `📦 *Detail Pesanan*\n\n`
  message += `*Produk:* ${order.products?.name}\n`
  message += `*Jumlah:* ${order.quantity}\n`
  message += `*Total:* Rp ${order.total_price.toLocaleString('id-ID')}\n`
  message += `*Status:* ${order.status}\n`
  message += `*Pembeli:* ${order.buyer?.full_name}\n`
  message += `*Penjual:* ${order.seller?.full_name}\n`
  
  if (order.shipping_address) {
    message += `\n*Alamat Pengiriman:*\n`
    message += `${order.shipping_address.city}, ${order.shipping_address.province}\n`
  }

  message += `\n🔗 ${process.env.NEXT_PUBLIC_APP_URL}/dashboard/orders`

  await sendTextMessage(from, message)
}
