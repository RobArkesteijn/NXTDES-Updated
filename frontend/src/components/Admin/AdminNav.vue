<template>
	<ul class="flex w-full justify-center text-zinc-50 pb-2">
		<li class="mr-2 cursor-pointer transition-all p-px" :class="{'border-b-[1px] border-solid border-zinc-50': adminStore.page === 'Country'}" @click="adminStore.changePage('Country')">Country</li>
		<li class="mx-2 cursor-pointer transition-all p-px" :class="{'border-b-[1px] border-solid border-zinc-50': adminStore.page === 'City'}" @click="adminStore.changePage('City')">City</li>
		<li class="mx-2 cursor-pointer transition-all p-px" :class="{'border-b-[1px] border-solid border-zinc-50': adminStore.page === 'Travel Info'}" @click="adminStore.changePage('Travel Info')">Travel Info</li>
		<li class="ml-2 cursor-pointer transition-all p-px" :class="{'border-b-[1px] border-solid border-zinc-50': adminStore.page === 'Image'}" @click="adminStore.changePage('Image')">Image</li>
	</ul>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAdminStore } from '@/store/adminStore';

export default defineComponent({
  setup () {
		const adminStore = useAdminStore();
    return {
			adminStore: adminStore,
		}
  }
})
</script>

<style scoped>

</style>