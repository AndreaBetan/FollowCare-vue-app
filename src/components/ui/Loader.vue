<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner'
</script>

<template>
  <div class="loader-overlay">
    <ProgressSpinner
      style="width: 60px; height: 60px"
      strokeWidth="6"
      animationDuration=".8s"
      aria-label="Loading"
    />
  </div>
</template>

<style scoped>
.loader-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(2px);
}
</style>


