import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/server'
import { ProductCard } from '@/components/products/ProductCard'

export default async function HomePage() {
  const supabase = await createClient()
  
  // Get featured products
  const { data: products } = await supabase
    .from('products')
    .select('*, profiles!seller_id(full_name)')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(8)

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Warisan Karsa
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Discover authentic cultural products from Indonesian artisans.
              Preserve heritage, support local craftsmanship.
            </p>
            <div className="flex gap-4">
              <Link href="/products">
                <Button size="lg" variant="secondary">
                  Browse Products
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="bg-white text-primary-600 hover:bg-primary-50">
                  Sell Your Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link href="/products">
            <Button variant="ghost">View All →</Button>
          </Link>
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No products available yet. Be the first to list!</p>
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Batik', 'Keramik', 'Ukiran', 'Tenun', 'Perhiasan', 'Wayang', 'Topeng', 'Seni Lukis'].map((category) => (
              <Link
                key={category}
                href={`/categories/${category.toLowerCase()}`}
                className="p-6 bg-gray-50 rounded-lg text-center hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                <span className="font-semibold">{category}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
