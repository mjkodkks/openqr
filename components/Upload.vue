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

    if (!fileImage.type.match('image.*')) {
      alert('Accept only image file such as .png .jpg')
      return
    }
    emit('filesDropped', fileImage)
    if (uploadRef.value)
      uploadRef.value.value = ''
  }
}
</script>

<template>
  <div>
    <button class="border border-dashed border-gray-400 pa-4 rounded-md" @click="clickUpload">
      Upload Your QR Code image Here <br> Or Drag and Drop
    </button>
    <input v-show="showInput" ref="uploadRef" type="file" accept="image/*" @change="upload">
  </div>
</template>
