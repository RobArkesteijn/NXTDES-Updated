<template>
  <div class="fixed h-full w-full bg-zinc-950/50 duration-200 ease-linear z-[2]" :class="{ 'opacity-100': store.isOpen, 'opacity-0 pointer-events-none': !store.isOpen }" @click="store.openSidemenu">
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store/store';
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const store = useStore();
    return {
      store: store
    }
  }
})
</script>

<style scoped>

</style>