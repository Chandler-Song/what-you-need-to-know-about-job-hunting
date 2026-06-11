import { defineConfig } from 'vitepress'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/what-you-need-to-know-about-job-hunting/' : '/',
  lang: 'zh-CN',
  title: '关于求职，你要知道的那些事',
  description: '一个猎头老炮儿的10年血泪真经',

  vite: {
    build: {
      // 将警告阈值从默认 500kB 提升至 2000kB
      // 图书站点含 16 章内容 + 本地搜索索引，主包体积较大属正常现象
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          // 使用函数式 manualChunks 按模块 ID 智能分组
          // 注意：vue/vitepress 被 VitePress 标记为外部模块，不能在此处配置
          manualChunks(id) {
            // 搜索索引（minisearch + mark.js）单独分包
            if (id.includes('minisearch') || id.includes('mark.js')) {
              return 'search-vendor'
            }
            // Markdown 渲染相关单独分包
            if (id.includes('markdown-it') || id.includes('shiki')) {
              return 'markdown-vendor'
            }
          },
        },
      },
    },
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#f8f9fa' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@400;600;700&display=swap', rel: 'stylesheet' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '求职指南',

    nav: [
      { text: '首页', link: '/' },
      { text: '总序', link: '/intro/' },
      { text: '章节阅读', link: '/chapter-01/' },
      { text: '关于本书', link: '/about' },
      { text: '资源推荐', link: '/resources' },
    ],

    sidebar: sidebarConfig(),

    outline: {
      level: [2, 3],
      label: '本节目录',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com' },
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },

    docFooter: {
      prev: '上一节',
      next: '下一节',
    },

    lastUpdated: {
      text: '最后更新于',
    },
  },
})

function ch(label: string, title: string, link: string, sections: [string, string][]): { text: string; link: string; collapsed: true; items: { text: string; link: string }[] } {
  return {
    text: `${label} ${title}`,
    link,
    collapsed: true,
    items: sections.map(([t, l]) => ({ text: t, link: l })),
  }
}

function sidebarConfig() {
  const fullSidebar = [
    { text: '总序', items: [{ text: '我见过太多人，毁在不懂游戏规则上', link: '/intro/' }] },
    {
      text: '第一部分：祛魅——把求职这件事看清楚',
      collapsed: true,
      items: [
        ch('第1章', '你以为你在找工作，其实你在做什么？', '/chapter-01/', [
          ['1.1 求职的本质', '/chapter-01/01'],
          ['1.2 你不是在应聘，你是在销售', '/chapter-01/02'],
          ['1.3 读懂JD背后的话', '/chapter-01/03'],
          ['1.4 公司为什么招人', '/chapter-01/04'],
          ['1.5 候选人分级', '/chapter-01/05'],
        ]),
        ch('第2章', '市场不骗人，只是你没看懂它', '/chapter-02/', [
          ['2.1 人才市场行情', '/chapter-02/01'],
          ['2.2 行业周期与求职窗口', '/chapter-02/02'],
          ['2.3 大厂光环的真相', '/chapter-02/03'],
          ['2.4 学历的半衰期', '/chapter-02/04'],
          ['2.5 35岁焦虑的社会学解剖', '/chapter-02/05'],
        ]),
        ch('第3章', '人性的暗面在招聘里', '/chapter-03/', [
          ['3.1 面试官的议程', '/chapter-03/01'],
          ['3.2 认知偏见与前5分钟', '/chapter-03/02'],
          ['3.3 HR的KPI', '/chapter-03/03'],
          ['3.4 用人部门 vs HR', '/chapter-03/04'],
          ['3.5 内推的真实权重', '/chapter-03/05'],
        ]),
      ],
    },
    {
      text: '第二部分：备战——上场之前先做人前的功课',
      collapsed: true,
      items: [
        ch('第4章', '你真的了解自己吗？', '/chapter-04/', [
          ['4.1 核心竞争力', '/chapter-04/01'],
          ['4.2 可迁移技能', '/chapter-04/02'],
          ['4.3 职业叙事', '/chapter-04/03'],
          ['4.4 弱点的处理方式', '/chapter-04/04'],
          ['4.5 过度自信 vs 自我否定', '/chapter-04/05'],
        ]),
        ch('第5章', '目标清单——你到底要去哪里？', '/chapter-05/', [
          ['5.1 好工作是陷阱', '/chapter-05/01'],
          ['5.2 Target Company List', '/chapter-05/02'],
          ['5.3 短期跳板 vs 长期平台', '/chapter-05/03'],
          ['5.4 城市、行业、赛道', '/chapter-05/04'],
          ['5.5 透支未来的offer', '/chapter-05/05'],
        ]),
        ch('第6章', '简历——你的第一张名片', '/chapter-06/', [
          ['6.1 简历被Pass的20种死法', '/chapter-06/01'],
          ['6.2 匹配度证明', '/chapter-06/02'],
          ['6.3 STAR法则写亮点', '/chapter-06/03'],
          ['6.4 数字的魔力', '/chapter-06/04'],
          ['6.5 ATS系统与关键词', '/chapter-06/05'],
          ['6.6 求职信', '/chapter-06/06'],
          ['6.7 不同段位的简历策略', '/chapter-06/07'],
        ]),
      ],
    },
    {
      text: '第三部分：出牌——面试是一场有剧本的即兴表演',
      collapsed: true,
      items: [
        ch('第7章', '面试前的情报工作', '/chapter-07/', [
          ['7.1 研究公司的正确姿势', '/chapter-07/01'],
          ['7.2 还原公司真实状况', '/chapter-07/02'],
          ['7.3 摸清面试官背景', '/chapter-07/03'],
          ['7.4 行业话术速成', '/chapter-07/04'],
          ['7.5 锦囊问题', '/chapter-07/05'],
        ]),
        ch('第8章', 'HR面——生存法则', '/chapter-08/', [
          ['8.1 HR面的真实目的', '/chapter-08/01'],
          ['8.2 你为什么离职', '/chapter-08/02'],
          ['8.3 期望薪资多少', '/chapter-08/03'],
          ['8.4 情绪稳定性测试', '/chapter-08/04'],
          ['8.5 通过HR面的核心秘诀', '/chapter-08/05'],
        ]),
        ch('第9章', '业务面——跟决策者过招', '/chapter-09/', [
          ['9.1 用人经理关心什么', '/chapter-09/01'],
          ['9.2 STAR+L框架', '/chapter-09/02'],
          ['9.3 与强势面试官周旋', '/chapter-09/03'],
          ['9.4 技术测试应对策略', '/chapter-09/04'],
          ['9.5 反向提问的艺术', '/chapter-09/05'],
        ]),
        ch('第10章', '终面与高管面', '/chapter-10/', [
          ['10.1 高管的评估维度', '/chapter-10/01'],
          ['10.2 战略思维现场展示', '/chapter-10/02'],
          ['10.3 闲聊都是考题', '/chapter-10/03'],
          ['10.4 表达野心', '/chapter-10/04'],
          ['10.5 终面失败的五大原因', '/chapter-10/05'],
        ]),
        ch('第11章', '面试心理学', '/chapter-11/', [
          ['11.1 压力面试', '/chapter-11/01'],
          ['11.2 沉默的力量', '/chapter-11/02'],
          ['11.3 镜像效应与共情', '/chapter-11/03'],
          ['11.4 认知过载陷阱', '/chapter-11/04'],
          ['11.5 面试后跟进礼仪', '/chapter-11/05'],
        ]),
      ],
    },
    {
      text: '第四部分：谈判——Offer只是起点，薪资才是终局',
      collapsed: true,
      items: [
        ch('第12章', '薪资谈判', '/chapter-12/', [
          ['12.1 为什么80%的人留下了钱', '/chapter-12/01'],
          ['12.2 锚定效应', '/chapter-12/02'],
          ['12.3 薪酬包十个维度', '/chapter-12/03'],
          ['12.4 内部讨论的含义', '/chapter-12/04'],
          ['12.5 使用竞争性offer', '/chapter-12/05'],
        ]),
        ch('第13章', 'Offer决策', '/chapter-13/', [
          ['13.1 Offer比较框架', '/chapter-13/01'],
          ['13.2 判断公司天花板', '/chapter-13/02'],
          ['13.3 试用期陷阱', '/chapter-13/03'],
          ['13.4 背调的真相', '/chapter-13/04'],
          ['13.5 优雅离职', '/chapter-13/05'],
        ]),
      ],
    },
    {
      text: '第五部分：进化——求职只是起点，职业才是终身命题',
      collapsed: true,
      items: [
        ch('第14章', '猎头眼中的那些人', '/chapter-14/', [
          ['14.1 越跳越好的人', '/chapter-14/01'],
          ['14.2 越跳越差的人', '/chapter-14/02'],
          ['14.3 被边缘化的人', '/chapter-14/03'],
          ['14.4 印象深刻的候选人', '/chapter-14/04'],
          ['14.5 痛心的案例', '/chapter-14/05'],
        ]),
        ch('第15章', '关于职业规划的真相', '/chapter-15/', [
          ['15.1 被误解的词', '/chapter-15/01'],
          ['15.2 规划不是预测', '/chapter-15/02'],
          ['15.3 T型/π型/蜂巢型人才', '/chapter-15/03'],
          ['15.4 护城河思维', '/chapter-15/04'],
          ['15.5 从猎物到猎手', '/chapter-15/05'],
        ]),
        ch('第16章', '写给特殊处境的人', '/chapter-16/', [
          ['16.1 写给应届生', '/chapter-16/01'],
          ['16.2 写给被裁员的人', '/chapter-16/02'],
          ['16.3 写给35+的人', '/chapter-16/03'],
          ['16.4 写给大厂出走的人', '/chapter-16/04'],
          ['16.5 写给反复跳槽的人', '/chapter-16/05'],
        ]),
      ],
    },
    {
      text: '终章',
      items: [{ text: '写在最后：求职是一场修行', link: '/epilogue/' }],
    },
    {
      text: '附录',
      collapsed: true,
      items: [
        { text: '附录A 猎头常用候选人评估维度速查表', link: '/appendix/a' },
        { text: '附录B 30个高频面试题与底层逻辑拆解', link: '/appendix/b' },
        { text: '附录C 薪资谈判话术模板（分场景）', link: '/appendix/c' },
        { text: '附录D 背调问题标准库', link: '/appendix/d' },
        { text: '附录E 推荐阅读书单', link: '/appendix/e' },
      ],
    },
  ]

  // 将完整侧边栏映射到所有章节路径，/about /resources 等不在映射中则无侧边栏
  const paths = [
    '/intro/',
    '/chapter-01/', '/chapter-02/', '/chapter-03/',
    '/chapter-04/', '/chapter-05/', '/chapter-06/',
    '/chapter-07/', '/chapter-08/', '/chapter-09/',
    '/chapter-10/', '/chapter-11/',
    '/chapter-12/', '/chapter-13/',
    '/chapter-14/', '/chapter-15/', '/chapter-16/',
    '/epilogue/',
    '/appendix/',
  ]
  return Object.fromEntries(paths.map(p => [p, fullSidebar])) as Record<string, typeof fullSidebar>
}
