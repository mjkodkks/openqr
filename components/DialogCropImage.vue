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

interface IProps {
  isOpen: boolean
  image: string
}

const { isOpen = false, image = '' } = defineProps<IProps>()
const emit = defineEmits(['update:isOpen', 'onCropUploaded'])
const imagetoScan = ref<string>('')

function closeModal() {
  emit('update:isOpen', false)
}
function openModal() {
  emit('update:isOpen', true)
}
function uploadCrop() {
  emit('onCropUploaded', imagetoScan.value)
  closeModal()
}
function cropSuccess({ coordinates, canvas }) {
  imagetoScan.value = canvas.toDataURL()
}

onMounted(() => {
})
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Crop Your QR Code
              </DialogTitle>
              <div class="mt-2">
                <Cropper
                  :src="image"
                  :stencil-props="{
                    minAspectRatio: 1 / 1,
                    maxAspectRatio: 16 / 8,
                  }"
                  @change="cropSuccess"
                />
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
