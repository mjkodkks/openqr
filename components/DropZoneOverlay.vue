<script setup lang="ts">

</script>

<template>
  <div class="fixed inset-0 bg-[rgba(152,152,152,.5)] text-white z-[6000] grid place-content-center text-[2.25rem]" style="--border-size: 50px;">
    <div class="fixed top-[var(--border-size)] left-[var(--border-size)] border-t border-t-8 border-l border-l-8 w-[var(--border-size)] h-[var(--border-size)] rounded-md" />
    <div class="fixed top-[var(--border-size)] right-[var(--border-size)] border-t border-t-8 border-r border-r-8 w-[var(--border-size)] h-[var(--border-size)] rounded-md" />
    <div class="fixed bottom-[var(--border-size)] right-[var(--border-size)] border-b border-b-8 border-r border-r-8 w-[var(--border-size)] h-[var(--border-size)] rounded-md" />
    <div class="fixed bottom-[var(--border-size)] left-[var(--border-size)] border-b border-b-8 border-l border-l-8 w-[var(--border-size)] h-[var(--border-size)] rounded-md" />
    <span class="fw100 animate-bounce-alt animate-count-infinite animate-duration-1s">Drop image anywhere :D</span>
  </div>
</template>
