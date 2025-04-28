<template>
  <div class="item-calculator" v-if="selectedItem">
    <div class="selected-item">
      <h3>{{ itemName }}</h3>
      <div class="quantity-input">
        <label>생산 수량:</label>
        <input 
          type="number" 
          v-model="quantity" 
          min="1" 
          @input="calculateMaterials"
        >
        <span class="production-info">(1회 생산량: {{ selectedItem.생산량 }}개)</span>
      </div>
    </div>
    
    <div class="materials-list">
      <h4>필요한 재료</h4>
      <div class="material-item" v-for="(count, name) in calculatedMaterials" :key="name">
        <span class="material-name">{{ name }}</span>
        <span class="material-count">{{ count }}개</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Material {
  [key: string]: number
}

interface Item {
  생산량: number
  재료: Material
}

const props = defineProps<{
  itemName: string
  selectedItem: Item | null
}>()

const quantity = ref(1)
const calculatedMaterials = ref<Material>({})

const calculateMaterials = () => {
  if (!props.selectedItem) return
  
  const batchesNeeded = Math.ceil(quantity.value / props.selectedItem.생산량)
  calculatedMaterials.value = Object.entries(props.selectedItem.재료).reduce((acc, [name, count]) => {
    acc[name] = count * batchesNeeded
    return acc
  }, {} as Material)
}

watch(() => props.selectedItem, () => {
  quantity.value = 1
  calculateMaterials()
}, { immediate: true })
</script>

<style scoped>
.item-calculator {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.selected-item {
  margin-bottom: 1rem;
}

.quantity-input {
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-input input {
  width: 80px;
  padding: 0.25rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.production-info {
  color: #666;
  font-size: 0.9rem;
}

.materials-list {
  margin-top: 1rem;
}

.material-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

.material-item:last-child {
  border-bottom: none;
}

.material-name {
  font-weight: 500;
}

.material-count {
  color: #666;
}
</style> 