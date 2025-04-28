<template>
  <div class="calculator">
    <h1>모바노기 계산기</h1>
    <CategoryDropdown 
      :categories="mainCategories" 
      @category-change="handleCategoryChange"
    />
    <ItemList 
      :items="currentItems" 
      @item-select="handleItemSelect"
    />
    <ItemCalculator 
      :item-name="selectedItemName"
      :selected-item="selectedItem"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CategoryDropdown from '../components/CategoryDropdown.vue'
import ItemList from '../components/ItemList.vue'
import ItemCalculator from '../components/ItemCalculator.vue'
import recipes from '../assets/recipes.json'

const mainCategories = Object.keys(recipes)
const selectedMainCategory = ref('')
const selectedSubCategory = ref('')
const selectedItemName = ref('')
const selectedItem = ref(null)

const currentItems = computed(() => {
  if (!selectedMainCategory.value || !selectedSubCategory.value) return {}
  return recipes[selectedMainCategory.value][selectedSubCategory.value] || {}
})

const handleCategoryChange = (mainCategory: string, subCategory: string) => {
  selectedMainCategory.value = mainCategory
  selectedSubCategory.value = subCategory
  selectedItemName.value = ''
  selectedItem.value = null
}

const handleItemSelect = (name: string, details: any) => {
  selectedItemName.value = name
  selectedItem.value = details
}
</script>

<style scoped>
.calculator {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}
</style> 