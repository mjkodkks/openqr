<template>
  <div class="dialog-warpper" v-if="store.state.isOpen">
      <div class="title">❕ {{ store.state.title }} ❕</div>
      <div class="description">{{ store.state.description }}</div>
      <div class="footer">
          <button class="confirm" @click="store.methods.comfirmDialog">OK</button>
          <button class="reject"  @click="store.methods.cancelDialog">cancel</button>
      </div>
  </div>
  <div class="blackdrop" v-if="store.state.isOpen" @click="store.methods.cancelDialog"></div>
</template>

<script>
import { inject } from '@vue/runtime-core'
export default {
    name: 'DialogConfirm',
    setup() {
        const store = inject('storeDialog')
        return {
            store
        }
    }

}
</script>

<style lang="scss">
.dialog-warpper {
    width: 400px;
    min-height: 200px;
    position: fixed;
    z-index: 1000;
    display: grid;
    background: floralwhite;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: rgb(36, 36, 36);
    padding: 1rem;
    .title {
        
    }
    .description {
        font-weight: 300;
    }
    .confirm {
        width: 80px;
        border: solid 1px ;
        font-weight: 300;
        margin-right: 1rem;
    }
    .reject {
        width: 80px;
        border: solid 1px ;
        font-weight: 300;
    }

}

@media only screen and (max-width: 600px) {
    .dialog-warpper {
        width: 100%;
    }
}

.blackdrop {
    position: fixed;
    z-index: 999;
    display: block;
    width: 100vw;
    height: 100vh;
    background: rgba(31,32,41,.75);
}

</style>