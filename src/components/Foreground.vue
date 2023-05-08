<template>
    <div class="fixed h-full w-full bg-zinc-950/50 duration-200 ease-linear z-[1]" :class="{ 'opacity-100': isOpen, 'opacity-0 pointer-events-none': !isOpen }" @click="isOpenFunction">
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: ['isOpen', 'isOpenFunction'],
})
</script>

<style scoped>

</style>