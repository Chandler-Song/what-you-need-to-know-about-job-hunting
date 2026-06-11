<template>
  <div class="author-card">
    <div class="author-avatar-wrap">
      <img :src="withBase('/avatar.jpg')" alt="宋秀强" class="author-avatar" />
    </div>
    <div class="author-info">
      <h3 class="author-name">宋秀强</h3>
      <p class="author-tagline">深耕人力资源和职业发展领域的实践者</p>
      <div class="author-tags">
        <span class="tag">10年猎头</span>
        <span class="tag">世界500强招聘经理</span>
        <span class="tag">GCDF职业规划师</span>
      </div>
      <div class="author-highlights">
        <div class="highlight-item">
          <span class="highlight-num">5000<span class="highlight-plus">+</span></span>
          <span class="highlight-label">服务求职者</span>
        </div>
        <div class="highlight-item">
          <span class="highlight-num">10<span class="highlight-plus">+</span></span>
          <span class="highlight-label">年从业经验</span>
        </div>
        <div class="highlight-item">
          <span class="highlight-num">6<span class="highlight-plus">+</span></span>
          <span class="highlight-label">行业覆盖</span>
        </div>
      </div>
      <p class="author-desc">
        覆盖互联网、高科技、人工智能、芯片、智能硬件、金融等多个行业。长期跟踪就业市场趋势，深谙招聘方与求职者的博弈逻辑。
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
</script>

<style scoped>
.author-card {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem;
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  position: relative;
  overflow: hidden;
}
.author-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--color-brand-primary), var(--vp-c-brand-2));
}

/* Avatar */
.author-avatar-wrap {
  flex-shrink: 0;
}
.author-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--color-brand-primary);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}
.author-avatar:hover {
  transform: scale(1.05);
}

/* Info */
.author-info {
  flex: 1;
  min-width: 0;
}
.author-name {
  font-family: 'Noto Serif SC', Georgia, serif;
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
  color: var(--vp-c-text-1);
}
.author-tagline {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin: 0 0 0.75rem;
  font-style: italic;
}

/* Tags */
.author-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}
.tag {
  display: inline-block;
  padding: 0.2rem 0.65rem;
  border-radius: 20px;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border: 1px solid transparent;
}

/* Highlights */
.author-highlights {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  padding: 0.75rem 0;
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
}
.highlight-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
}
.highlight-num {
  font-family: 'Noto Serif SC', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-brand-primary);
  line-height: 1;
}
.highlight-plus {
  font-size: 1rem;
  opacity: 0.7;
}
.highlight-label {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}

/* Description */
.author-desc {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.85rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* Responsive */
@media (max-width: 640px) {
  .author-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem;
    gap: 1.25rem;
  }
  .author-avatar {
    width: 100px;
    height: 100px;
  }
  .author-tags {
    justify-content: center;
  }
  .author-highlights {
    justify-content: center;
  }
  .author-name {
    font-size: 1.2rem;
  }
}
</style>
