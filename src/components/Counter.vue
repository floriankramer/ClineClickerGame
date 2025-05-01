<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { Ref } from 'vue';
import type { GameState } from '../gamestate';

const props = defineProps<{
  modelValue?: GameState
}>();

// Ref to track animation state
const isAnimating: Ref<boolean> = ref(false);

// Lookup table for the first 9 powers of ten
const rewardNumbers: number[] = [
  10,
  42,
  100,
  200,
  300,
  400,
  500,
  600,
  700,
  800,
  900,
  1000,
  2000,
  3000,
  4000,
  5000,
  6000,
  7000,
  8000,
  9000,
  10000,
];

// Check if a number is a power of ten using the lookup table
const isRewardNumber = (num: number): boolean => {
  if (num <= 0) return false;
  return rewardNumbers.includes(num);
};

// Watch for changes in the count property
watch(() => props.modelValue?.count, (newValue) => {
  // If the new value is a power of ten, trigger the animation
  if (newValue !== undefined && isRewardNumber(newValue)) {
    isAnimating.value = true;
    // Reset animation after it completes
    setTimeout(() => {
      isAnimating.value = false;
    }, 500); // Animation duration
  }
});

// Computed class based on animation state
const counterClass = computed<{ [key: string]: boolean }>(() => {
  return {
    'counter-display': true,
    'jiggle-animation': isAnimating.value
  };
});
</script>

<template>
  <div class="counter-container">
    <div :class="counterClass">
      {{ modelValue?.count ?? 0 }}
    </div>
  </div>
</template>

<style scoped>
.counter-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.counter-display {
  font-size: 5rem;
  font-weight: bold;
  color: #40E0D0;
  /* Matching the turquoise color of the BigButton */
  padding: 1rem 2rem;
  border-radius: 12px;
  background-color: rgba(64, 224, 208, 0.1);
  min-width: 200px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

/* Jiggle animation */
@keyframes jiggle {
  0% {
    transform: scale(1);
  }

  25% {
    transform: scale(1.1) rotate(5deg);
  }

  50% {
    transform: scale(1.1) rotate(-5deg);
  }

  75% {
    transform: scale(1.05) rotate(3deg);
  }

  100% {
    transform: scale(1);
  }
}

.jiggle-animation {
  animation: jiggle 0.5s ease;
}
</style>
