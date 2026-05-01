<script setup lang="ts">
import { products } from '~/data/products'

const route = useRoute()
const product = computed(() => products.find((p) => p.id === Number(route.params.id)))

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found' })
}

const stockStatus = computed(() => {
  if (!product.value) return ''
  if (product.value.stock === 0) return '在庫切れ'
  if (product.value.stock <= 10) return '残りわずか'
  return '在庫あり'
})

const stockStatusClass = computed(() => {
  if (!product.value) return ''
  if (product.value.stock === 0) return 'text-red-600 bg-red-50'
  if (product.value.stock <= 10) return 'text-amber-600 bg-amber-50'
  return 'text-green-700 bg-green-50'
})
</script>

<template>
  <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Back link -->
    <NuxtLink
      to="/"
      class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-6"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      商品一覧へ戻る
    </NuxtLink>

    <div v-if="product" class="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <!-- Accent bar -->
      <div class="h-3 w-full" :class="product.accentColor" />

      <div class="p-6 sm:p-8 space-y-6">
        <!-- Title section -->
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-sm font-mono text-gray-400 mb-1">{{ product.sku }}</p>
            <h1 class="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
              {{ product.name }}
            </h1>
          </div>
          <span
            class="shrink-0 text-sm font-medium px-3 py-1 rounded-full"
            :class="product.status === 'active'
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-600'"
          >
            {{ product.status === 'active' ? '販売中' : '販売停止' }}
          </span>
        </div>

        <!-- Description -->
        <p class="text-gray-600 leading-relaxed text-sm">{{ product.description }}</p>

        <!-- Details grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-xs text-gray-400 mb-1">価格</p>
            <p class="text-xl font-bold text-gray-900">¥{{ product.price.toLocaleString() }}</p>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-xs text-gray-400 mb-1">在庫数</p>
            <p class="text-xl font-bold text-gray-900">{{ product.stock.toLocaleString() }}</p>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-xs text-gray-400 mb-1">カテゴリ</p>
            <p class="text-sm font-semibold text-gray-900">{{ product.category }}</p>
          </div>
        </div>

        <!-- Stock status badge -->
        <div class="flex items-center gap-2">
          <span
            class="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg"
            :class="stockStatusClass"
          >
            <span
              class="w-2 h-2 rounded-full"
              :class="product.stock === 0 ? 'bg-red-500' : product.stock <= 10 ? 'bg-amber-500' : 'bg-green-500'"
            />
            {{ stockStatus }}
          </span>
          <span v-if="product.stock > 0" class="text-sm text-gray-400">
            残り {{ product.stock.toLocaleString() }} 個
          </span>
        </div>

        <!-- Metadata -->
        <div class="pt-4 border-t border-gray-100">
          <dl class="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <div class="flex justify-between">
              <dt class="text-gray-400">SKU</dt>
              <dd class="font-mono text-gray-700">{{ product.sku }}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-gray-400">商品ID</dt>
              <dd class="font-mono text-gray-700">#{{ product.id }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </main>
</template>
