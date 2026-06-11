<template>
  <div class="homepage">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-cover">
          <img src="/book-cover.png" alt="关于求职，你要知道的那些事" class="cover-img" />
        </div>
        <div class="hero-text">
          <h1 class="hero-title">关于求职，你要知道的那些事</h1>
          <p class="hero-subtitle">一个猎头老炮儿的10年血泪真经</p>
          <p class="hero-meta">5 大部分 · 16 章 · 79节 · 5 篇附录 · 实战导向</p>
          <div class="hero-actions">
            <a :href="withBase('/intro/')" class="btn-primary">开始阅读</a>
            <a :href="withBase('/about')" class="btn-outline">了解更多</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 目录导航 -->
    <section class="toc-section">
      <h2 class="section-title">目录导航</h2>
      <div v-for="(part, pi) in parts" :key="part.name" class="part-group">
        <div class="part-header">
          <span class="part-index">0{{ pi + 1 }}</span>
          <h3 class="part-title">{{ part.name }}</h3>
        </div>
        <div class="chapters-grid" :class="`grid-${part.chapters.length > 3 ? 3 : part.chapters.length}`">
          <a
            v-for="chapter in part.chapters"
            :key="chapter.chapterId"
            :href="withBase(chapter.link)"
            class="chapter-card"
          >
            <div class="card-top">
              <span class="card-icon">{{ chapter.icon }}</span>
              <span class="card-label">{{ chapter.label }}</span>
            </div>
            <h4 class="card-title">{{ chapter.title }}</h4>
            <ul class="card-sections">
              <li v-for="(section, si) in chapter.sections.slice(0, 3)" :key="section.sectionId">
                <a :href="withBase(section.link)" @click.stop>{{ section.title }}</a>
              </li>
              <li v-if="chapter.sections.length > 3" class="more-link">
                <a :href="withBase(chapter.link)" @click.stop>还有 {{ chapter.sections.length - 3 }} 节…</a>
              </li>
            </ul>
          </a>
        </div>
      </div>
    </section>

    <!-- 推荐语 -->
    <section class="endorsements-section">
      <h2 class="section-title">他们这样说</h2>
      <div class="endorsements-grid">
        <div v-for="item in endorsements" :key="item.name" class="endorsement-card">
          <div class="endorsement-avatar">{{ item.avatar }}</div>
          <blockquote class="endorsement-quote">{{ item.quote }}</blockquote>
          <div class="endorsement-author">
            <span class="endorsement-name">{{ item.name }}</span>
            <span class="endorsement-title">{{ item.title }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <h2 class="cta-title">准备好开启你的求职之旅了吗？</h2>
      <p class="cta-desc">从认知祛魅到面试出牌，从薪资谈判到职业规划，一位猎头老炮儿为你拆解求职博弈的全部规则。</p>
      <a :href="withBase('/intro/')" class="btn-primary cta-btn">立即开始阅读</a>
    </section>
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'

const endorsements = [
  {
    name: 'Doris Li',
    title: '一线大厂 HRBP 负责人',
    quote: '这本书把求职博弈的底层逻辑讲透了。不是鸡汤，不是话术，而是真正帮你理解招聘方视角的认知升级。',
    avatar: '李',
  },
  {
    name: 'Audrey Zhang',
    title: '500强组织战略专家',
    quote: '从简历到薪资谈判，每一章都有可以直接用的方法论。特别是 Offer 评估五维模型，我推荐给所有做职业咨询的同行。',
    avatar: '张',
  },
  {
    name: 'David Cui',
    title: '资深猎头顾问 / 职场博主',
    quote: '做了15年猎头，这本书说出了我一直想告诉候选人却说不清楚的话。尤其是候选人分级和跳槽进化那两章，值得反复读。',
    avatar: '崔',
  },
]

const parts = [
  {
    name: '祛魅——把求职这件事看清楚',
    chapters: [
      {
        chapterId: 'chapter-01', label: '第1章', icon: '🔍',
        title: '你以为你在找工作，其实你在做什么？',
        link: '/chapter-01/',
        sections: [
          { sectionId: '1.1', title: '1.1 求职的本质：信息不对称的双向筛选', link: '/chapter-01/01' },
          { sectionId: '1.2', title: '1.2 你不是在应聘，你是在销售', link: '/chapter-01/02' },
          { sectionId: '1.3', title: '1.3 读懂JD背后没写出来的话', link: '/chapter-01/03' },
          { sectionId: '1.4', title: '1.4 公司为什么招人：九种真实动机', link: '/chapter-01/04' },
          { sectionId: '1.5', title: '1.5 猎头眼中的候选人分级', link: '/chapter-01/05' },
        ],
      },
      {
        chapterId: 'chapter-02', label: '第2章', icon: '📊',
        title: '市场不骗人，只是你没看懂它',
        link: '/chapter-02/',
        sections: [
          { sectionId: '2.1', title: '2.1 人才市场行情与供需关系', link: '/chapter-02/01' },
          { sectionId: '2.2', title: '2.2 行业周期与求职窗口', link: '/chapter-02/02' },
          { sectionId: '2.3', title: '2.3 大厂光环的真相', link: '/chapter-02/03' },
          { sectionId: '2.4', title: '2.4 学历的半衰期', link: '/chapter-02/04' },
          { sectionId: '2.5', title: '2.5 35岁焦虑的社会学解剖', link: '/chapter-02/05' },
        ],
      },
      {
        chapterId: 'chapter-03', label: '第3章', icon: '🎭',
        title: '人性的暗面在招聘里',
        link: '/chapter-03/',
        sections: [
          { sectionId: '3.1', title: '3.1 面试官的议程', link: '/chapter-03/01' },
          { sectionId: '3.2', title: '3.2 认知偏见与前5分钟', link: '/chapter-03/02' },
          { sectionId: '3.3', title: '3.3 HR的KPI', link: '/chapter-03/03' },
          { sectionId: '3.4', title: '3.4 用人部门 vs HR', link: '/chapter-03/04' },
          { sectionId: '3.5', title: '3.5 内推的真实权重', link: '/chapter-03/05' },
        ],
      },
    ],
  },
  {
    name: '备战——上场之前先做人前的功课',
    chapters: [
      {
        chapterId: 'chapter-04', label: '第4章', icon: '🪞',
        title: '你真的了解自己吗？',
        link: '/chapter-04/',
        sections: [
          { sectionId: '4.1', title: '4.1 核心竞争力', link: '/chapter-04/01' },
          { sectionId: '4.2', title: '4.2 可迁移技能', link: '/chapter-04/02' },
          { sectionId: '4.3', title: '4.3 职业叙事', link: '/chapter-04/03' },
          { sectionId: '4.4', title: '4.4 弱点的处理方式', link: '/chapter-04/04' },
          { sectionId: '4.5', title: '4.5 过度自信 vs 自我否定', link: '/chapter-04/05' },
        ],
      },
      {
        chapterId: 'chapter-05', label: '第5章', icon: '🎯',
        title: '目标清单——你到底要去哪里？',
        link: '/chapter-05/',
        sections: [
          { sectionId: '5.1', title: '5.1 好工作是陷阱', link: '/chapter-05/01' },
          { sectionId: '5.2', title: '5.2 Target Company List', link: '/chapter-05/02' },
          { sectionId: '5.3', title: '5.3 短期跳板 vs 长期平台', link: '/chapter-05/03' },
          { sectionId: '5.4', title: '5.4 城市、行业、赛道', link: '/chapter-05/04' },
          { sectionId: '5.5', title: '5.5 透支未来的offer', link: '/chapter-05/05' },
        ],
      },
      {
        chapterId: 'chapter-06', label: '第6章', icon: '📝',
        title: '简历——你的第一张名片',
        link: '/chapter-06/',
        sections: [
          { sectionId: '6.1', title: '6.1 简历被Pass的20种死法', link: '/chapter-06/01' },
          { sectionId: '6.2', title: '6.2 匹配度证明', link: '/chapter-06/02' },
          { sectionId: '6.3', title: '6.3 STAR法则写亮点', link: '/chapter-06/03' },
          { sectionId: '6.4', title: '6.4 数字的魔力', link: '/chapter-06/04' },
          { sectionId: '6.5', title: '6.5 ATS系统与关键词', link: '/chapter-06/05' },
          { sectionId: '6.6', title: '6.6 求职信', link: '/chapter-06/06' },
          { sectionId: '6.7', title: '6.7 不同段位的简历策略', link: '/chapter-06/07' },
        ],
      },
    ],
  },
  {
    name: '出牌——面试是一场有剧本的即兴表演',
    chapters: [
      {
        chapterId: 'chapter-07', label: '第7章', icon: '🕵️',
        title: '面试前的情报工作',
        link: '/chapter-07/',
        sections: [
          { sectionId: '7.1', title: '7.1 研究公司的正确姿势', link: '/chapter-07/01' },
          { sectionId: '7.2', title: '7.2 还原公司真实状况', link: '/chapter-07/02' },
          { sectionId: '7.3', title: '7.3 摸清面试官背景', link: '/chapter-07/03' },
          { sectionId: '7.4', title: '7.4 行业话术速成', link: '/chapter-07/04' },
          { sectionId: '7.5', title: '7.5 锦囊问题', link: '/chapter-07/05' },
        ],
      },
      {
        chapterId: 'chapter-08', label: '第8章', icon: '🛡️',
        title: 'HR面——生存法则',
        link: '/chapter-08/',
        sections: [
          { sectionId: '8.1', title: '8.1 HR面的真实目的', link: '/chapter-08/01' },
          { sectionId: '8.2', title: '8.2 你为什么离职', link: '/chapter-08/02' },
          { sectionId: '8.3', title: '8.3 期望薪资多少', link: '/chapter-08/03' },
          { sectionId: '8.4', title: '8.4 情绪稳定性测试', link: '/chapter-08/04' },
          { sectionId: '8.5', title: '8.5 通过HR面的核心秘诀', link: '/chapter-08/05' },
        ],
      },
      {
        chapterId: 'chapter-09', label: '第9章', icon: '⚔️',
        title: '业务面——跟决策者过招',
        link: '/chapter-09/',
        sections: [
          { sectionId: '9.1', title: '9.1 用人经理关心什么', link: '/chapter-09/01' },
          { sectionId: '9.2', title: '9.2 STAR+L框架', link: '/chapter-09/02' },
          { sectionId: '9.3', title: '9.3 与强势面试官周旋', link: '/chapter-09/03' },
          { sectionId: '9.4', title: '9.4 技术测试应对策略', link: '/chapter-09/04' },
          { sectionId: '9.5', title: '9.5 反向提问的艺术', link: '/chapter-09/05' },
        ],
      },
      {
        chapterId: 'chapter-10', label: '第10章', icon: '👔',
        title: '终面与高管面',
        link: '/chapter-10/',
        sections: [
          { sectionId: '10.1', title: '10.1 高管的评估维度', link: '/chapter-10/01' },
          { sectionId: '10.2', title: '10.2 战略思维现场展示', link: '/chapter-10/02' },
          { sectionId: '10.3', title: '10.3 闲聊都是考题', link: '/chapter-10/03' },
          { sectionId: '10.4', title: '10.4 表达野心', link: '/chapter-10/04' },
          { sectionId: '10.5', title: '10.5 终面失败的五大原因', link: '/chapter-10/05' },
        ],
      },
      {
        chapterId: 'chapter-11', label: '第11章', icon: '🧠',
        title: '面试心理学',
        link: '/chapter-11/',
        sections: [
          { sectionId: '11.1', title: '11.1 压力面试', link: '/chapter-11/01' },
          { sectionId: '11.2', title: '11.2 沉默的力量', link: '/chapter-11/02' },
          { sectionId: '11.3', title: '11.3 镜像效应与共情', link: '/chapter-11/03' },
          { sectionId: '11.4', title: '11.4 认知过载陷阱', link: '/chapter-11/04' },
          { sectionId: '11.5', title: '11.5 面试后跟进礼仪', link: '/chapter-11/05' },
        ],
      },
    ],
  },
  {
    name: '谈判——Offer只是起点，薪资才是终局',
    chapters: [
      {
        chapterId: 'chapter-12', label: '第12章', icon: '💰',
        title: '薪资谈判',
        link: '/chapter-12/',
        sections: [
          { sectionId: '12.1', title: '12.1 为什么80%的人留下了钱', link: '/chapter-12/01' },
          { sectionId: '12.2', title: '12.2 锚定效应', link: '/chapter-12/02' },
          { sectionId: '12.3', title: '12.3 薪酬包十个维度', link: '/chapter-12/03' },
          { sectionId: '12.4', title: '12.4 内部讨论的含义', link: '/chapter-12/04' },
          { sectionId: '12.5', title: '12.5 使用竞争性offer', link: '/chapter-12/05' },
        ],
      },
      {
        chapterId: 'chapter-13', label: '第13章', icon: '📋',
        title: 'Offer决策',
        link: '/chapter-13/',
        sections: [
          { sectionId: '13.1', title: '13.1 Offer比较框架', link: '/chapter-13/01' },
          { sectionId: '13.2', title: '13.2 判断公司天花板', link: '/chapter-13/02' },
          { sectionId: '13.3', title: '13.3 试用期陷阱', link: '/chapter-13/03' },
          { sectionId: '13.4', title: '13.4 背调的真相', link: '/chapter-13/04' },
          { sectionId: '13.5', title: '13.5 优雅离职', link: '/chapter-13/05' },
        ],
      },
    ],
  },
  {
    name: '进化——求职只是起点，职业才是终身命题',
    chapters: [
      {
        chapterId: 'chapter-14', label: '第14章', icon: '👁️',
        title: '猎头眼中的那些人',
        link: '/chapter-14/',
        sections: [
          { sectionId: '14.1', title: '14.1 越跳越好的人', link: '/chapter-14/01' },
          { sectionId: '14.2', title: '14.2 越跳越差的人', link: '/chapter-14/02' },
          { sectionId: '14.3', title: '14.3 被边缘化的人', link: '/chapter-14/03' },
          { sectionId: '14.4', title: '14.4 印象深刻的候选人', link: '/chapter-14/04' },
          { sectionId: '14.5', title: '14.5 痛心的案例', link: '/chapter-14/05' },
        ],
      },
      {
        chapterId: 'chapter-15', label: '第15章', icon: '🗺️',
        title: '关于职业规划的真相',
        link: '/chapter-15/',
        sections: [
          { sectionId: '15.1', title: '15.1 被误解的词', link: '/chapter-15/01' },
          { sectionId: '15.2', title: '15.2 规划不是预测', link: '/chapter-15/02' },
          { sectionId: '15.3', title: '15.3 T型/π型/蜂巢型人才', link: '/chapter-15/03' },
          { sectionId: '15.4', title: '15.4 护城河思维', link: '/chapter-15/04' },
          { sectionId: '15.5', title: '15.5 从猎物到猎手', link: '/chapter-15/05' },
        ],
      },
      {
        chapterId: 'chapter-16', label: '第16章', icon: '💌',
        title: '写给特殊处境的人',
        link: '/chapter-16/',
        sections: [
          { sectionId: '16.1', title: '16.1 写给应届生', link: '/chapter-16/01' },
          { sectionId: '16.2', title: '16.2 写给被裁员的人', link: '/chapter-16/02' },
          { sectionId: '16.3', title: '16.3 写给35+的人', link: '/chapter-16/03' },
          { sectionId: '16.4', title: '16.4 写给大厂出走的人', link: '/chapter-16/04' },
          { sectionId: '16.5', title: '16.5 写给反复跳槽的人', link: '/chapter-16/05' },
        ],
      },
    ],
  },
  {
    name: '尾声',
    chapters: [
      {
        chapterId: 'epilogue', label: '终章', icon: '💌',
        title: '求职的尽头，是认识你自己',
        link: '/epilogue/',
        sections: [],
      },
      {
        chapterId: 'appendix', label: '附录', icon: '📎',
        title: '实战工具包',
        link: '/appendix/',
        sections: [
          { sectionId: 'A', title: 'A 猎头评估维度速查表', link: '/appendix/a' },
          { sectionId: 'B', title: 'B 30个高频面试题拆解', link: '/appendix/b' },
          { sectionId: 'C', title: 'C 薪资谈判话术模板', link: '/appendix/c' },
          { sectionId: 'D', title: 'D 背调问题标准库', link: '/appendix/d' },
          { sectionId: 'E', title: 'E 推荐阅读书单', link: '/appendix/e' },
        ],
      },
    ],
  },
]
</script>

<style scoped>
.homepage {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* ===== Hero ===== */
.hero {
  padding: 3.5rem 0 2.5rem;
}
.hero-inner {
  display: flex;
  align-items: center;
  gap: 3.5rem;
}
.hero-cover { flex-shrink: 0; }
.cover-img {
  width: 300px;
  height: auto;
  border-radius: 6px;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  box-shadow: 0 10px 36px rgba(0,0,0,0.18);
}
.cover-img:hover {
  transform: translateY(-8px) rotate(-1.5deg);
  box-shadow: 0 18px 48px rgba(0,0,0,0.25);
}
.hero-text { flex: 1; }
.hero-title {
  font-family: 'Noto Serif SC', Georgia, serif;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.25;
  margin: 0 0 0.75rem;
  color: var(--vp-c-text-1);
  letter-spacing: -0.02em;
}
.hero-subtitle {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 1.1rem;
  font-weight: 400;
  color: var(--vp-c-text-2);
  margin: 0 0 0.4rem;
  letter-spacing: 0.04em;
}
.hero-meta {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
  margin: 0 0 1.75rem;
  letter-spacing: 0.06em;
}
.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* ===== Buttons ===== */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1.75rem;
  border-radius: 6px;
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  color: #fff;
  background-color: var(--color-brand-primary);
  text-decoration: none;
  transition: all 0.2s;
  letter-spacing: 0.04em;
}
.btn-primary:hover {
  opacity: 0.9;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
}
.btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1.75rem;
  border-radius: 6px;
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  border: 2px solid var(--color-brand-primary);
  color: var(--color-brand-primary);
  text-decoration: none;
  transition: all 0.2s;
  letter-spacing: 0.04em;
}
.btn-outline:hover {
  background-color: var(--color-brand-primary);
  color: #fff;
}

/* ===== Section Title ===== */
.section-title {
  font-family: 'Noto Serif SC', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin: 0 0 2.5rem;
  color: var(--vp-c-text-1);
  letter-spacing: 0.02em;
}

/* ===== TOC Section ===== */
.toc-section {
  padding: 2rem 0 3rem;
  border-top: 1px solid var(--vp-c-divider);
}

/* ===== Part Group ===== */
.part-group {
  margin-bottom: 2.5rem;
}
.part-group:last-child {
  margin-bottom: 0;
}
.part-header {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 1rem;
}
.part-index {
  font-family: 'Noto Serif SC', Georgia, serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-brand-primary);
  opacity: 0.25;
  line-height: 1;
}
.part-title {
  font-family: 'Noto Serif SC', Georgia, serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin: 0;
  letter-spacing: 0.02em;
}

/* ===== Chapters Grid ===== */
.chapters-grid {
  display: grid;
  gap: 1rem;
}
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }

/* ===== Chapter Card ===== */
.chapter-card {
  display: block;
  border-radius: 8px;
  padding: 1.15rem 1.25rem;
  border: 1px solid var(--vp-c-border);
  background-color: var(--vp-c-bg-soft);
  text-decoration: none;
  transition: all 0.2s ease;
}
.chapter-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  border-color: var(--color-brand-primary);
}
.card-top {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
}
.card-icon { font-size: 1.15rem; }
.card-label {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.card-title {
  font-family: 'Noto Serif SC', Georgia, serif;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.4;
  margin: 0 0 0.65rem;
  color: var(--vp-c-text-1);
}
.card-sections {
  list-style: none;
  padding: 0;
  margin: 0;
}
.card-sections li {
  margin-bottom: 0.25rem;
}
.card-sections a {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  text-decoration: none;
  transition: color 0.15s;
  line-height: 1.5;
}
.card-sections a:hover {
  color: var(--color-brand-primary);
}
.more-link a {
  font-style: italic;
  color: var(--color-brand-primary) !important;
  opacity: 0.7;
}

/* ===== Endorsements ===== */
.endorsements-section {
  padding: 3rem 0;
  border-top: 1px solid var(--vp-c-divider);
}
.endorsements-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
.endorsement-card {
  border-radius: 8px;
  padding: 1.5rem 1.25rem;
  border: 1px solid var(--vp-c-border);
  background-color: var(--vp-c-bg-soft);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.endorsement-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-brand-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Noto Serif SC', Georgia, serif;
  font-size: 1rem;
  font-weight: 700;
  flex-shrink: 0;
}
.endorsement-quote {
  margin: 0;
  font-family: 'Noto Serif SC', Georgia, serif;
  font-size: 0.88rem;
  line-height: 1.75;
  color: var(--vp-c-text-2);
  flex: 1;
  position: relative;
  padding-left: 1rem;
  border-left: 3px solid var(--color-brand-primary);
  opacity: 0.85;
}
.endorsement-author {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.endorsement-name {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.endorsement-title {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

/* ===== CTA ===== */
.cta-section {
  padding: 3.5rem 0;
  text-align: center;
  border-top: 1px solid var(--vp-c-divider);
}
.cta-title {
  font-family: 'Noto Serif SC', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.75rem;
  color: var(--vp-c-text-1);
  letter-spacing: 0.02em;
}
.cta-desc {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  margin: 0 auto 2rem;
  max-width: 560px;
  line-height: 1.75;
}
.cta-btn {
  padding: 0.85rem 2.25rem;
  font-size: 1rem;
}

/* ===== Responsive ===== */
@media (max-width: 960px) {
  .hero-inner {
    flex-direction: column;
    text-align: center;
  }
  .hero-actions {
    justify-content: center;
  }
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
  .endorsements-grid { grid-template-columns: 1fr; }
  .hero-title { font-size: 2rem; }
  .cover-img { width: 240px; }
}
@media (max-width: 640px) {
  .homepage { padding: 0 1.25rem; }
  .grid-2, .grid-3 { grid-template-columns: 1fr; }
  .endorsements-grid { grid-template-columns: 1fr; }
  .hero-actions { flex-direction: column; }
  .hero-actions .btn-primary,
  .hero-actions .btn-outline { width: 100%; }
  .hero-title { font-size: 1.65rem; }
  .hero-subtitle { font-size: 1rem; }
  .cover-img { width: 200px; }
  .part-header { gap: 0.5rem; }
  .part-index { font-size: 1.4rem; }
  .section-title { font-size: 1.25rem; }
}
</style>
