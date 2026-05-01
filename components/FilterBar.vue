<script setup lang="ts">
import type { Category, Status } from '~/types/product'

defineProps<{
  categories: Category[]
}>()

const searchQuery = defineModel<string>('searchQuery', { required: true })
const selectedCategory = defineModel<Category | ''>('selectedCategory', { required: true })
const selectedStatus = defineModel<Status | ''>('selectedStatus', { required: true })
</script>

<template>
  <div class="bg-white rounded-xl border border-gray-200 p-4">
    <div class="flex flex-col sm:flex-row gap-3">
      <!-- Search -->
      <div class="relative flex-1">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="商品名・SKUで検索..."
          class="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <!-- Category filter -->
      <select
        v-model="selectedCategory"
        class="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
      >
        <option value="">全カテゴリ</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>

      <!-- Status filter -->
      <select
        v-model="selectedStatus"
        class="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
      >
        <option value="">全ステータス</option>
        <option value="active">販売中</option>
        <option value="inactive">販売停止</option>
      </select>
    </div>
  </div>
</template>
