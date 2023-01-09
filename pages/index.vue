<script setup lang="ts">
import type { QRCode } from 'jsqr'
import jsQR from 'jsqr'
import { useMainStore } from '~~/store/main'

const mainStore = useMainStore()
const fileBase64 = ref<string>('')
const fileBase64Crop = ref<string>()
const showScannerLine = ref(true)

function onFileDropped(e: any) {
  mainStore.dialogCrop = true
  const reader = new FileReader()
  reader.onload = (img) => {
    if (img && img.target)
      fileBase64.value = img.target.result as string
  }
  reader.readAsDataURL(e)
}

function onCropUploaded(e: string) {
  // set state to initial before read
  removeImage()
  fileBase64Crop.value = e
  setTimeout(() => {
    scannQRCode()
  }, 2.5 * 1000)
}

// check and clear state dialog closed
mainStore.$subscribe((mutation, state) => {
  if (state.dialogCrop === false)
    fileBase64.value = ''
})

function removeImage() {
  showScannerLine.value = true
  fileBase64.value = ''
  fileBase64Crop.value = ''
}

function scannQRCode() {
  showScannerLine.value = false

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const image = new Image()
  image.src = fileBase64Crop.value || ''
  image.onload = function () {
    // access image size here
    const widthImg = image.width
    const heightImg = image.height
    canvas.width = widthImg
    canvas.height = heightImg
    if (context) {
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      const imageData = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      ).data

      const readResult = jsQR(imageData, widthImg, heightImg)
      checkUrl(readResult)
    }
  }
}

const link = ref<string | null>(null)

function checkUrl(resultRead: QRCode | null) {
  if (resultRead) {
    link.value = resultRead.data
    if (isUrl(resultRead.data)) {
      const resuleDialog = window.confirm(
        `Found Link
         We found link ${resultRead.data}. Do you want to open this link?
        `)
      if (resuleDialog)
        setTimeout(() => window.open(resultRead.data, '_blank'), 1000)

      else
        link.value = resultRead.data
    }
    else {
      window.alert(`${resultRead.data}`)
    }
  }
  else {
    window.alert('Not found any qr code ')
  }
}

function isUrl(urlString: string) {
  let url: string | URL = ''
  try { url = new URL(urlString) }
  catch (e) { return false }
  return url.protocol === 'http:' || url.protocol === 'https:'
}
</script>

<template>
  <div>
    <Suspense>
      <Upload @files-dropped="onFileDropped" />
      <template #fallback>
        <div op50 italic>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
    <div v-if="fileBase64Crop" class="flex justify-center mt-4 ">
      <div class="relative w-[400px] h-[400px] bg-gray-50 dark:bg-gray-700">
        <button class="absolute top-4 right-4" @click="removeImage">
          <div class="i-carbon-close-filled" />
        </button>
        <div v-show="showScannerLine" class="w-full h-1 bg-red-400 absolute top-0 scanner-animation" />
        <img class="w-[100%] border border-gray-300 rounded-2xl" :src="fileBase64Crop" alt="fileBase64Crop">
      </div>
    </div>
    <div v-if="link" class="mt-4 flex justify-center">
      <textarea v-model="link" rows="4" cols="40" class="block p-2.5 w-[400px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..." />
    </div>
    <DialogCropImage v-model:is-open="mainStore.dialogCrop" :image="fileBase64" @on-crop-uploaded="onCropUploaded" />
  </div>
</template>

<style>
.scanner-animation {
  animation: scanner 2.5s;
}
@keyframes scanner {
  from {
    transform: translateY(0%)
  }
  to {
    transform: translateY(400px)
  }
}
</style>
