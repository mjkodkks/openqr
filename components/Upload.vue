<script setup lang="ts">
const emit = defineEmits(['filesDropped'])
const showInput = ref(false)
const uploadRef = ref<HTMLInputElement | null>(null)
function clickUpload() {
  if (!uploadRef.value)
    return
  uploadRef.value.click()
}
function upload(e: any) {
  const file = e.target.files
  if (file.length) {
    const fileImage = file[0]
    emit('filesDropped', fileImage)
  }
}
</script>

<template>
  <div>
    <button class="border border-dashed pa-4" @click="clickUpload">
      Upload Your QR Code image Here :D
    </button>
    <input v-show="showInput" ref="uploadRef" type="file" @change="upload">
  </div>
</template>
