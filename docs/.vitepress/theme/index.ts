import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import HomePage from './HomePage.vue'
import Layout from './Layout.vue'
import AboutAuthor from './AboutAuthor.vue'
import '../custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('HomePage', HomePage)
    app.component('AboutAuthor', AboutAuthor)
  },
} satisfies Theme
