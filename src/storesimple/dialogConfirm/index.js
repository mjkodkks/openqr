/* eslint-disable no-unused-vars */
import { reactive } from "vue"


const state = reactive({
    isOpen: false,
    title: '',
    description: '',
    resolvePromise : undefined,
    rejectPromise : undefined
})


const methods = {
     setOpen (option) {
        state.isOpen = true;
        state.title = option.title
        state.description = option.description

        return new Promise((resolve, reject) => {
            state.resolvePromise = resolve
            state.rejectPromise = reject
        })

    },
    comfirmDialog () {
        state.isOpen = false;
        state.resolvePromise(true);
    },
    cancelDialog () {
        state.isOpen = false;
        state.resolvePromise(false);
    }
}

export default {
    state,
    methods
}