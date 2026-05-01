<script setup lang="ts">
defineProps<{
  total: number
  active: number
  inactive: number
  outOfStock: number
}>()
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
    <div class="bg-white rounded-xl p-4 border border-gray-200">
      <p class="text-sm text-gray-500">全商品</p>
      <p class="text-2xl font-bold text-gray-900 mt-1">{{ total }}</p>
    </div>
    <div class="bg-white rounded-xl p-4 border border-gray-200">
      <p class="text-sm text-gray-500">販売中</p>
      <p class="text-2xl font-bold text-green-600 mt-1">{{ active }}</p>
    </div>
    <div class="bg-white rounded-xl p-4 border border-gray-200">
      <p class="text-sm text-gray-500">販売停止</p>
      <p class="text-2xl font-bold text-red-500 mt-1">{{ inactive }}</p>
    </div>
    <div class="bg-white rounded-xl p-4 border border-gray-200">
      <p class="text-sm text-gray-500">在庫切れ</p>
      <p class="text-2xl font-bold text-amber-500 mt-1">{{ outOfStock }}</p>
    </div>
  </div>
</template>
