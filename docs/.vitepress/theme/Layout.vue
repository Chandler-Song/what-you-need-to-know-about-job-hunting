<template>
  <Layout>
    <template #layout-bottom>
      <ReadingProgress />
      <button
        class="back-to-top"
        :class="{ 'back-to-top--hidden': !showBackToTop }"
        @click="scrollToTop"
        aria-label="回到顶部"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 16V4M10 4L4 10M10 4L16 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import ReadingProgress from './ReadingProgress.vue'

const { Layout } = DefaultTheme
const showBackToTop = ref(false)

function handleScroll() {
  showBackToTop.value = window.scrollY > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background-color: var(--color-brand-primary);
  color: #fff;
}
@media (min-width: 960px) {
  .back-to-top {
    bottom: 32px;
    right: 32px;
    width: 44px;
    height: 44px;
  }
}
.back-to-top:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
}
.back-to-top--hidden {
  opacity: 0;
  pointer-events: none;
  transform: scale(0.75);
}
</style>
