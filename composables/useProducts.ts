import { products } from '~/data/products'
import type { Category, Status } from '~/types/product'

export function useProducts() {
  const searchQuery = ref('')
  const selectedCategory = ref<Category | ''>('')
  const selectedStatus = ref<Status | ''>('')

  const categories = computed<Category[]>(() => {
    const set = new Set(products.map((p) => p.category))
    return [...set].sort() as Category[]
  })

  const filteredProducts = computed(() => {
    return products.filter((product) => {
      const query = searchQuery.value.toLowerCase()
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query)

      const matchesCategory =
        !selectedCategory.value || product.category === selectedCategory.value

      const matchesStatus =
        !selectedStatus.value || product.status === selectedStatus.value

      return matchesSearch && matchesCategory && matchesStatus
    })
  })

  const stats = computed(() => ({
    total: products.length,
    active: products.filter((p) => p.status === 'active').length,
    inactive: products.filter((p) => p.status === 'inactive').length,
    outOfStock: products.filter((p) => p.stock === 0).length,
  }))

  return {
    searchQuery,
    selectedCategory,
    selectedStatus,
    categories,
    filteredProducts,
    stats,
  }
}
