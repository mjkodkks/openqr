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
