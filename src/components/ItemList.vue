<template>
  <div class="item-list">
    <div v-if="!items || Object.keys(items).length === 0" class="no-items">
      카테고리를 선택해주세요
    </div>
    <div v-else class="items-grid">
      <div v-for="(item, itemName) in items" :key="itemName" class="item-card"
        @click="selectItem(itemName as string, item)">
        <div class="item-name">{{ itemName }}</div>
        <div class="item-info">생산량: {{ item.생산량 }}개</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Material {
  [key: string]: number
}

interface Recipe {
  생산량: number
  재료: Material
}

interface Items {
  [key: string]: Recipe
}

const props = defineProps<{
  items: Items
}>()

const emit = defineEmits<{
  (e: 'item-select', name: string, details: Recipe): void
}>()

const selectItem = (name: string, details: Recipe) => {
  emit('item-select', name, details)
}
</script>

<style scoped>
.item-list {
  margin-top: 1rem;
}

.no-items {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.item-card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.item-card:hover {
  background-color: #f5f5f5;
  transform: translateY(-2px);
}

.item-name {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.item-info {
  font-size: 0.9rem;
  color: #666;
}
</style>
