<template>
  <div
    v-if="!isHome"
    class="reading-progress"
    :style="{ width: progress + '%' }"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const progress = ref(0)
const isHome = computed(() => route.path === '/' || route.path === '/index.html')

function updateProgress() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  progress.value = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>

<style scoped>
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  z-index: 50;
  background-color: var(--color-progress);
  transition: none;
  pointer-events: none;
}
</style>
