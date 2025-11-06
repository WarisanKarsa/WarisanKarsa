import type { WhatsAppWebhookPayload, WhatsAppIncomingMessage } from '@/types/whatsapp'
import { sendTextMessage, markMessageAsRead } from './client'
import { handleProductCommand } from './commands/product-commands'
import { handleOrderCommand } from './commands/order-commands'
import { handleHelpCommand } from './commands/help-commands'
import { createClient } from '@/lib/supabase/server'

export async function handleWebhook(payload: WhatsAppWebhookPayload): Promise<void> {
  const entry = payload.entry[0]
  const changes = entry.changes[0]
  const value = changes.value

  // Handle incoming messages
  if (value.messages && value.messages.length > 0) {
    const message = value.messages[0]
    const from = message.from

    // Log message to database
    await logMessage(message)

    // Mark as read
    await markMessageAsRead(message.id)

    // Process message
    await processMessage(from, message)
  }

  // Handle status updates
  if (value.statuses && value.statuses.length > 0) {
    const status = value.statuses[0]
    await updateMessageStatus(status.id, status.status)
  }
}

async function processMessage(from: string, message: WhatsAppIncomingMessage): Promise<void> {
  if (message.type !== 'text') {
    await sendTextMessage(from, 'Maaf, saat ini saya hanya dapat memproses pesan teks. Silakan kirim perintah dalam format teks.')
    return
  }

  const messageText = message.text?.body.trim().toLowerCase() || ''

  // Route to appropriate command handler
  if (messageText.startsWith('/produk') || messageText.startsWith('/product')) {
    await handleProductCommand(from, messageText)
  } else if (messageText.startsWith('/order') || messageText.startsWith('/pesanan')) {
    await handleOrderCommand(from, messageText)
  } else if (messageText === '/help' || messageText === '/bantuan' || messageText === '/start') {
    await handleHelpCommand(from)
  } else {
    await sendTextMessage(from, 
      `Maaf, saya tidak mengerti perintah tersebut. Ketik /help untuk melihat daftar perintah yang tersedia.`
    )
  }
}

async function logMessage(message: WhatsAppIncomingMessage): Promise<void> {
  const supabase = await createClient()

  // Find user by WhatsApp number
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('whatsapp_number', message.from)
    .single()

  await supabase
    .from('whatsapp_messages')
    .insert({
      user_id: profile?.id || null,
      message_type: 'inbound',
      content: message.text?.body || '',
      media_url: null,
      status: 'received',
      whatsapp_message_id: message.id
    })
}

async function updateMessageStatus(messageId: string, status: string): Promise<void> {
  const supabase = await createClient()

  await supabase
    .from('whatsapp_messages')
    .update({ status })
    .eq('whatsapp_message_id', messageId)
}
