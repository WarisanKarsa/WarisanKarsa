import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { validateProductInput } from '@/lib/utils/validation'
import { handleError } from '@/lib/utils/error-handling'

export const runtime = 'edge'

// GET /api/products - List all products with filters
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const searchParams = request.nextUrl.searchParams
    
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const status = searchParams.get('status') || 'active'
    const sellerId = searchParams.get('sellerId')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    
    let query = supabase
      .from('products')
      .select('*, profiles!seller_id(id, full_name)', { count: 'exact' })
      .eq('status', status)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)
    
    if (category) {
      query = query.eq('category', category)
    }
    
    if (sellerId) {
      query = query.eq('seller_id', sellerId)
    }
    
    if (search) {
      query = query.ilike('name', `%${search}%`)
    }
    
    const { data: products, error, count } = await query
    
    if (error) {
      throw error
    }
    
    return NextResponse.json({
      products,
      total: count,
      limit,
      offset
    })
  } catch (error) {
    const { message, statusCode } = handleError(error)
    return NextResponse.json({ error: message }, { status: statusCode })
  }
}

// POST /api/products - Create new product
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Verify authentication
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await request.json()
    
    // Validate input
    const validation = validateProductInput(body)
    if (!validation.valid) {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: validation.errors 
      }, { status: 400 })
    }
    
    // Create product
    const { data: product, error } = await supabase
      .from('products')
      .insert({
        seller_id: user.id,
        name: body.name,
        description: body.description,
        ai_generated_description: body.ai_generated_description,
        category: body.category,
        price: body.price,
        stock: body.stock,
        images: body.images || [],
        metadata: body.metadata || {},
        status: body.status || 'draft'
      })
      .select()
      .single()
    
    if (error) {
      throw error
    }
    
    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    const { message, statusCode } = handleError(error)
    return NextResponse.json({ error: message }, { status: statusCode })
  }
}
