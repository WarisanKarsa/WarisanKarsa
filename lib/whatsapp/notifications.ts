import { sendTextMessage } from './client'
import { createClient } from '@/lib/supabase/server'

export async function sendOrderNotification(orderId: string): Promise<void> {
  const supabase = await createClient()

  // Get order with seller details
  const { data: order, error } = await supabase
    .from('orders')
    .select(`
      *,
      products(name),
      buyer:profiles!buyer_id(full_name),
      seller:profiles!seller_id(full_name, whatsapp_number)
    `)
    .eq('id', orderId)
    .single()

  if (error || !order || !order.seller?.whatsapp_number) {
    return
  }

  const message = `
🎉 *Pesanan Baru!*

Anda mendapat pesanan baru:

*Produk:* ${order.products?.name}
*Pembeli:* ${order.buyer?.full_name}
*Jumlah:* ${order.quantity}
*Total:* Rp ${order.total_price.toLocaleString('id-ID')}

Lihat detail di dashboard:
${process.env.NEXT_PUBLIC_APP_URL}/dashboard/orders

Segera konfirmasi pesanan!
  `.trim()

  await sendTextMessage(order.seller.whatsapp_number, message)
}

export async function sendOrderStatusUpdate(orderId: string, newStatus: string): Promise<void> {
  const supabase = await createClient()

  // Get order with buyer details
  const { data: order, error } = await supabase
    .from('orders')
    .select(`
      *,
      products(name),
      buyer:profiles!buyer_id(full_name, whatsapp_number),
      seller:profiles!seller_id(full_name)
    `)
    .eq('id', orderId)
    .single()

  if (error || !order || !order.buyer?.whatsapp_number) {
    return
  }

  const statusMessages: Record<string, string> = {
    confirmed: '✅ Pesanan Anda telah dikonfirmasi!',
    shipped: '🚚 Pesanan Anda dalam pengiriman!',
    delivered: '📦 Pesanan Anda telah sampai!',
    cancelled: '❌ Pesanan Anda dibatalkan.'
  }

  const message = `
${statusMessages[newStatus] || '📦 Update Pesanan'}

*Produk:* ${order.products?.name}
*Status Baru:* ${newStatus}
*Penjual:* ${order.seller?.full_name}

Lihat detail:
${process.env.NEXT_PUBLIC_APP_URL}/dashboard/orders
  `.trim()

  await sendTextMessage(order.buyer.whatsapp_number, message)
}
