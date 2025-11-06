export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  // Indonesian phone number format
  const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/
  return phoneRegex.test(phone.replace(/\s|-/g, ''))
}

export function validatePrice(price: number): boolean {
  return price > 0 && price < 1000000000 // Max 1 billion
}

export function validateStock(stock: number): boolean {
  return stock >= 0 && stock < 1000000
}

export function sanitizeString(input: string): string {
  return input
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim()
}

export function validateProductInput(input: any): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!input.name || input.name.length < 3) {
    errors.push('Product name must be at least 3 characters')
  }

  if (!input.category) {
    errors.push('Category is required')
  }

  if (!validatePrice(input.price)) {
    errors.push('Invalid price')
  }

  if (!validateStock(input.stock)) {
    errors.push('Invalid stock quantity')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}
