<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

export interface IProps {
  isOpen?: boolean
  image?: string
}

const props = withDefaults(defineProps<IProps>(), {
  isOpen: false,
  image: '',
})
const emit = defineEmits(['update:isOpen', 'onCropUploaded'])
const imagetoScan = ref<string>('')
const cropperRefs = ref()

function closeModal(isUpload?: boolean) {
  if (isUpload)
    emit('onCropUploaded', imagetoScan.value)

  emit('update:isOpen', false)
  imagetoScan.value = ''
}
function openModal() {
  emit('update:isOpen', true)
}
function uploadCrop() {
  closeModal(true)
}
function cropSuccess({ canvas }: any) {
  imagetoScan.value = canvas.toDataURL()
}

onMounted(() => {
})

// watch(() => image, (current, prev) => {
//   console.log(cropperRefs.value)
// })
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                Crop Your QR Code
              </DialogTitle>
              <div class="mt-2">
                <Cropper ref="cropperRefs" :src="image" @change="cropSuccess" />
              </div>

              <div class="mt-4 flex justify-center">
                <button
                  type="button"
                  class="flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="uploadCrop"
                >
                  Scan QR Code 😚
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style>
/* Ensure the size of the image fit the container perfectly */
img {
  display: block;

  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>
