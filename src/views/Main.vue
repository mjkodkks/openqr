<template>
  <div class="home">
    <ReadQR />
  </div>
</template>

<script>
// @ is an alias to /src
import ReadQR from '@/components/ReadQR.vue'

export default {
  name: 'Main',
  components: {
    ReadQR
  }
}
</script>
