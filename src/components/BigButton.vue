<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <button class="big-button">
    {{ text }}
  </button>
</template>

<style scoped>
.big-button {
  padding: 16px 32px;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #40E0D0; /* Turquoise color */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.big-button:hover {
  background-color: #30C0B0; /* Darker turquoise on hover */
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.big-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
