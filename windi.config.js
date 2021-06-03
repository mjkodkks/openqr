// windi.config.js
// @ts-check - enable TS check for js file
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: 'class',
  theme: {
    textColor: {
      primary: '#10b981',
      secondary: '#ffed4a',
      primaryBold: '#059862',
      danger: '#e3342f',
      white: '#ffff'
    },
  },
})