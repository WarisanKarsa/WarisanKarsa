import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { formatPrice } from '@/lib/utils/formatting'
import type { Product } from '@/types/database'

interface ProductCardProps {
  product: Product & {
    profiles?: {
      full_name: string
    }
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images[0] || '/placeholder-product.jpg'
  
  return (
    <Link href={`/products/${product.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Sold Out</span>
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="mb-2">
            <span className="text-xs text-gray-500 uppercase">{product.category}</span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          {product.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {product.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary-600">
              {formatPrice(Number(product.price))}
            </span>
            
            {product.stock > 0 && (
              <span className="text-sm text-gray-500">
                Stock: {product.stock}
              </span>
            )}
          </div>
          
          {product.profiles && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <span className="text-xs text-gray-500">
                by {product.profiles.full_name}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
