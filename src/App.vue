<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import BigButton from './components/BigButton.vue'
import Counter from './components/Counter.vue'
import Upgrade from './components/Upgrade.vue'
import { GameState } from './gamestate'

// Create an instance of GameState wrapped in a ref
const gameState: Ref<GameState> = ref(new GameState())

// Start the auto increment when the component is mounted
onMounted(() => {
  gameState.value.startAutoIncrement()
})

// Handle upgrade purchases
const handleUpgrade = (cost: number, perClickBonus: number, perSecondBonus: number) => {
  gameState.value.purchaseUpgrade(cost, perClickBonus, perSecondBonus)
}
</script>

<template>
  <div class="app-container">
    <div class="content-wrapper">
      <Counter 
        :modelValue="gameState" 
      />
      <BigButton text="Click Me!" @click="gameState.increment()" />
      
      <div class="upgrades-container">
        <h2>Upgrades</h2>
        <div class="upgrades-grid">
          <Upgrade 
            :cost="10" 
            :perClickBonus="1" 
            :perSecondBonus="0" 
            :currentCount="gameState.count"
            @upgrade="handleUpgrade"
          >
            Better Clicks
          </Upgrade>
          
          <Upgrade 
            :cost="25" 
            :perClickBonus="2" 
            :perSecondBonus="0" 
            :currentCount="gameState.count"
            @upgrade="handleUpgrade"
          >
            Super Clicks
          </Upgrade>
          
          <Upgrade 
            :cost="50" 
            :perClickBonus="0" 
            :perSecondBonus="1" 
            :currentCount="gameState.count"
            @upgrade="handleUpgrade"
          >
            Auto Clicker
          </Upgrade>
          
          <Upgrade 
            :cost="100" 
            :perClickBonus="0" 
            :perSecondBonus="5" 
            :currentCount="gameState.count"
            @upgrade="handleUpgrade"
          >
            More Auto Clicker
          </Upgrade>
          
          <Upgrade 
            :cost="500" 
            :perClickBonus="0" 
            :perSecondBonus="15" 
            :currentCount="gameState.count"
            @upgrade="handleUpgrade"
          >
            Let the machine WORK!
          </Upgrade>
          
          <Upgrade 
            :cost="1000" 
            :perClickBonus="0" 
            :perSecondBonus="50" 
            :currentCount="gameState.count"
            @upgrade="handleUpgrade"
          >
            I'm sure adding AI to increase the counter is a good idea.
          </Upgrade>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em; /* Spacing between elements */
  padding: 2em;
  max-width: 800px;
  width: 100%;
}

.upgrades-container {
  width: 100%;
  margin-top: 2em;
}

.upgrades-container h2 {
  text-align: center;
  color: #40E0D0;
  margin-bottom: 1em;
}

.upgrades-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1em;
  width: 100%;
}

@media (max-width: 600px) {
  .upgrades-grid {
    grid-template-columns: 1fr;
  }
}
</style>
