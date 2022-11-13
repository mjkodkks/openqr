<script setup lang="ts">
import { useMainStore } from '~~/store/main'

const mainStore = useMainStore()
const fileBase64 = ref<string>()

function onFileDropped(e) {
  console.log(e)
  mainStore.dialogCrop = true
  const reader = new FileReader()
  reader.onload = (img) => {
    console.log(img)
    if (img && img.target) {
      fileBase64.value = img.target.result
      console.log(fileBase64.value)
    }

    // const canvas = document.createElement('canvas')
    // const context = canvas.getContext('2d')
    // const image = new Image()
    // image.src = fileBase64.value
  }
  reader.readAsDataURL(e)
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
    <DialogCropImage v-model:is-open="mainStore.dialogCrop" :image="fileBase64" />
  </div>
</template>
