<template>
  <div class="category-dropdown">
    <div class="select-group">
      <select v-model="selectedMainCategory" @change="onMainCategoryChange">
        <option value="">대분류 선택</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>

      <select v-model="selectedSubCategory" @change="onSubCategoryChange" :disabled="!selectedMainCategory">
        <option value="">소분류 선택</option>
        <option v-for="subCategory in subCategories" :key="subCategory" :value="subCategory">
          {{ subCategory }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import recipes from '../assets/recipes.json'

const props = defineProps<{
  categories: string[]
}>()

const emit = defineEmits<{
  (e: 'category-change', mainCategory: string, subCategory: string): void
}>()

const selectedMainCategory = ref('')
const selectedSubCategory = ref('')

const subCategories = computed(() => {
  if (!selectedMainCategory.value) return []
  return Object.keys(recipes[selectedMainCategory.value] || {})
})

const onMainCategoryChange = () => {
  selectedSubCategory.value = ''
  emit('category-change', selectedMainCategory.value, '')
}

const onSubCategoryChange = () => {
  emit('category-change', selectedMainCategory.value, selectedSubCategory.value)
}
</script>

<style scoped>
.category-dropdown {
  margin: 1rem 0;
}

.select-group {
  display: flex;
  gap: 1rem;
}

select {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 200px;
}

select:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}
</style> 