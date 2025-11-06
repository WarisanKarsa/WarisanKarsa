import { sendTextMessage } from '../client'

export async function handleHelpCommand(from: string): Promise<void> {
  const helpMessage = `
🌟 *Selamat datang di Warisan Karsa!*

Saya adalah asisten virtual untuk membantu Anda mengelola produk dan pesanan.

*Perintah yang tersedia:*

📦 *Produk*
/produk list - Lihat daftar produk Anda
/produk detail [id] - Lihat detail produk
/produk tambah - Petunjuk menambah produk

🛍️ *Pesanan*
/order list - Lihat daftar pesanan
/order detail [id] - Lihat detail pesanan

ℹ️ *Informasi*
/help - Tampilkan menu bantuan ini

🌐 *Dashboard Web*
Kelola produk dan pesanan lengkap di:
${process.env.NEXT_PUBLIC_APP_URL}/dashboard

Butuh bantuan? Hubungi tim support kami.
  `.trim()

  await sendTextMessage(from, helpMessage)
}
