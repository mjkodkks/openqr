/* eslint-disable no-unused-vars */
import { ref } from "vue"

let isOpen = ref(false)
let title = ref("")
let description = ref("")
let resolvePromise = ref(undefined)
let rejectPromise = ref(undefined)

export default function userDialog() {

    const setOpen = (option) => {
        console.log(option)
        isOpen.value = true;
        title.value = option.title
        description.value = option.description

        return new Promise((resolve, reject) => {
            resolvePromise.value = resolve
            rejectPromise.value = reject
        })

    }

    const comfirmDialog = ()=> {
        isOpen.value = false;
        resolvePromise.value(true);
    }

    const cancelDialog = ()=> {
        isOpen.value = false;
        resolvePromise.value(false);
    }

    return {
        isOpen,
        title,
        description,
        comfirmDialog,
        cancelDialog,
        setOpen
    }
}