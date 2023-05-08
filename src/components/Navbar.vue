<template>
    <div class="w-full h-1/10 bg-custom-blue-500 flex items-center text-zinc-100 border-solid border-zinc-50 border-b-2">
        <span class="w-1/4 flex items-center justify-center">
            <i class="fa-solid fa-bars text-3xl" @click="isOpenFunction"></i>
        </span>
        <span class="w-1/2 flex items-center justify-center">
            <h1 class=" text-4xl font-logo">NXTDES</h1>
        </span>
        <span class="w-1/4 flex items-center justify-center">
            <i class="fa-regular fa-circle-user text-3xl"></i>
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: ['isOpenFunction'],
})
</script>

<style scoped>
    h1 {
        text-shadow: 2px 2px 0.2px #2B6F87;
    }
</style>