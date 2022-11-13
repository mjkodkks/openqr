import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    fileUpload: undefined as string | undefined,
    dialogCrop: false,
  }),
  actions: {
    setFileUpload(image: string) {
      if (image)
        this.fileUpload = image
    },
  },
})
