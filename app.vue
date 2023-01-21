<script setup>
useHead({
  title: 'OPENQR | Free online QR Code reader from image file',
  link: [
    {
      rel: 'icon', type: 'image/icon', href: '/favicon.ico',
    },
    {
      rel: 'manifest', href: '/manifest.json',
    },
  ],
  meta: [
    {
      name: 'description', content: 'Free online QR Code scanner from images (QR scanner, QR Code reader from image online, QR Code scanner online, how to scan a qr code from image)',
    },
  ],
  script: [
    {
      src: '/install-sw.js', async: true, defer: true,
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}

.cropper {
  height: 600px;
  background: #DDD;
}
</style>
