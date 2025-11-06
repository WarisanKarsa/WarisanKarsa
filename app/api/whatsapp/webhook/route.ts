import { NextRequest, NextResponse } from 'next/server'
import { handleWebhook } from '@/lib/whatsapp/webhook-handler'
import { handleError } from '@/lib/utils/error-handling'

export const runtime = 'edge'

// GET /api/whatsapp/webhook - Webhook verification
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')
  
  const VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN
  
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 })
  }
  
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}

// POST /api/whatsapp/webhook - Receive WhatsApp messages
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Handle webhook payload
    await handleWebhook(body)
    
    return NextResponse.json({ status: 'success' })
  } catch (error) {
    const { message, statusCode } = handleError(error)
    console.error('WhatsApp webhook error:', error)
    // Return 200 to avoid webhook retries
    return NextResponse.json({ status: 'error', message }, { status: 200 })
  }
}
