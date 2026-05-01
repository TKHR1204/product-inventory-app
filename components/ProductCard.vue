<script setup lang="ts">
import type { Product } from '~/types/product'

defineProps<{
  product: Product
}>()
</script>

<template>
  <NuxtLink
    :to="`/products/${product.id}`"
    class="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-indigo-200 transition-all duration-200 flex flex-col"
  >
    <!-- Color accent bar -->
    <div class="h-2 w-full" :class="product.accentColor" />

    <div class="p-5 flex flex-col flex-1">
      <!-- Header -->
      <div class="flex items-start justify-between gap-2 mb-3">
        <div class="flex-1 min-w-0">
          <p class="text-xs text-gray-400 font-mono mb-1">{{ product.sku }}</p>
          <h3 class="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
            {{ product.name }}
          </h3>
        </div>
        <span
          class="shrink-0 text-xs font-medium px-2 py-0.5 rounded-full"
          :class="product.status === 'active'
            ? 'bg-green-50 text-green-700'
            : 'bg-red-50 text-red-600'"
        >
          {{ product.status === 'active' ? '販売中' : '販売停止' }}
        </span>
      </div>

      <!-- Category -->
      <span class="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md w-fit mb-4">
        {{ product.category }}
      </span>

      <!-- Footer -->
      <div class="mt-auto flex items-end justify-between">
        <div>
          <p class="text-xs text-gray-400 mb-0.5">在庫</p>
          <p
            class="text-sm font-semibold"
            :class="product.stock === 0 ? 'text-red-500' : 'text-gray-700'"
          >
            {{ product.stock === 0 ? '在庫切れ' : `${product.stock.toLocaleString()} 個` }}
          </p>
        </div>
        <p class="text-lg font-bold text-gray-900">
          ¥{{ product.price.toLocaleString() }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
