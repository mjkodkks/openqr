import {
  presetUno,
} from 'unocss'
export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
  ],
  experimental: {
    // reactivityTransform: true,
  },
  devServer: {
    port: 3000,
  },
  unocss: {
    preflight: true,
    presets: [
      presetUno(
        {
          dark: 'class',
        },
      ),
    ],
  },
})
