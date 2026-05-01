<script setup lang="ts">
const {
  searchQuery,
  selectedCategory,
  selectedStatus,
  categories,
  filteredProducts,
  stats,
} = useProducts()
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">商品一覧</h1>
      <p class="text-sm text-gray-500 mt-1">商品の検索・在庫状況の確認ができます</p>
    </div>

    <StatsBar
      :total="stats.total"
      :active="stats.active"
      :inactive="stats.inactive"
      :out-of-stock="stats.outOfStock"
    />

    <FilterBar
      v-model:search-query="searchQuery"
      v-model:selected-category="selectedCategory"
      v-model:selected-status="selectedStatus"
      :categories="categories"
    />

    <!-- Results count -->
    <div class="flex items-center justify-between">
      <p class="text-sm text-gray-500">
        <span class="font-semibold text-gray-900">{{ filteredProducts.length }}</span> 件
      </p>
    </div>

    <!-- Product grid -->
    <div
      v-if="filteredProducts.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>

    <!-- Empty state -->
    <div v-else class="flex flex-col items-center justify-center py-24 text-gray-400">
      <svg class="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <p class="text-lg font-medium">商品が見つかりません</p>
      <p class="text-sm mt-1">検索条件を変えてお試しください</p>
    </div>
  </main>
</template>
