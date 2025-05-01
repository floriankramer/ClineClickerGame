<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Ref } from 'vue';

const props = defineProps<{
  cost: number;
  perClickBonus: number;
  perSecondBonus: number;
  currentCount: number;
}>();

const emit = defineEmits<{
  'upgrade': [cost: number, perClickBonus: number, perSecondBonus: number]
}>();

// Track if the upgrade has been purchased
const isPurchased: Ref<boolean> = ref(false);

// Computed property to determine if the upgrade is available
const isAvailable = computed(() => {
  return !isPurchased.value && props.currentCount >= props.cost;
});

// Handle the upgrade purchase
const purchaseUpgrade = () => {
  if (isAvailable.value) {
    isPurchased.value = true;
    emit('upgrade', props.cost, props.perClickBonus, props.perSecondBonus);
  }
};
</script>

<template>
  <button 
    class="upgrade-button" 
    :class="{ 'available': isAvailable, 'purchased': isPurchased }"
    :disabled="!isAvailable"
    @click="purchaseUpgrade"
  >
    <slot></slot>
    <div class="upgrade-details" v-if="!isPurchased">
      <div class="threshold">Cost: {{ cost }}</div>
      <div class="bonuses">
        <span v-if="perClickBonus > 0">+{{ perClickBonus }} per click</span>
        <span v-if="perSecondBonus > 0">+{{ perSecondBonus }} per second</span>
      </div>
    </div>
    <div class="purchased-text" v-else>Purchased!</div>
  </button>
</template>

<style scoped>
.upgrade-button {
  padding: 16px 24px;
  margin: 8px 0;
  width: 100%;
  max-width: 300px;
  font-size: 1rem;
  font-weight: bold;
  background-color: #6c757d; /* Gray color when not available */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.7;
}

.upgrade-button.available {
  background-color: #40E0D0; /* Turquoise color when available */
  opacity: 1;
  cursor: pointer;
}

.upgrade-button.available:hover {
  background-color: #30C0B0; /* Darker turquoise on hover */
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.upgrade-button.available:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.upgrade-button.purchased {
  background-color: #28a745; /* Green color when purchased */
  cursor: default;
}

.upgrade-details {
  margin-top: 8px;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.threshold {
  font-weight: bold;
}

.bonuses {
  display: flex;
  gap: 8px;
}

.purchased-text {
  margin-top: 8px;
  font-size: 0.8rem;
  color: #e0f0e0;
}
</style>
