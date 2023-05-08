<template>
  <div class="fixed top-0 h-full w-2/3 bg-custom-blue-500 text-zinc-100 font-headers overflow-y-scroll transition-all z-[2]" :class="{'left-0': isOpen, 'left-[-67%]': !isOpen}">
		<header class="flex justify-center items-center h-1/10">
			<h1 class="text-4xl font-bold">Welcome User</h1>
		</header>
		<main class="flex flex-col items-center pb-4">
			<span class="w-11/12 flex flex-col items-center border-solid border-zinc-100 border-b-1 py-4">
				<span class="flex flex-row items-center justify-between w-full">
					<span class="flex flex-row items-center">
						<i class="fa-solid fa-circle-info text-xl mr-2"></i>
						<h3 class="text-2xl">Travel Info</h3>
					</span>
					<span class="w-1/2 flex flex-row justify-end">
						<i class="fa-solid fa-chevron-down transition-all" :class="{'rotate-180': openTravelInfo, 'rotate-0': !openTravelInfo}" @click="openOptions('travelInfo')"></i>
					</span>
				</span>
				<ul class="w-full pt-2 pl-4 transition-all" :class="{'h-32 opacity-100': openTravelInfo, 'h-0 z-0 opacity-0': !openTravelInfo}">
					<span class="flex items-center pb-1 pt-3">
						<i class="fa-solid fa-minus mr-2 text-xs"></i>
						<li class="text-xl">Travel Mistakes</li>
					</span>
					<span class="flex items-center py-1">
						<i class="fa-solid fa-minus mr-2 text-sm"></i>
						<li class="text-xl">Budget Travel</li>
					</span>
					<span class="flex items-center py-1">
						<i class="fa-solid fa-minus mr-2 text-sm"></i>
						<li class="text-xl">Solo Travel</li>
					</span>
				</ul>
			</span>

			<span class="w-11/12 flex flex-col items-center border-solid border-zinc-100 border-b-1 py-4 bg-custom-blue-500" :class="{'z-[1]': openTravelInfo, 'z-0': !openTravelInfo}">
				<span class="flex flex-row items-center justify-between w-full">
					<span class="flex flex-row items-center">
						<i class="fa-solid fa-earth-americas text-xl mr-2"></i>
						<h3 class="text-2xl">Countries</h3>
					</span>
					<span class="">
						<i class="fa-solid fa-chevron-down transition-all" :class="{'rotate-180': openCountries, 'rotate-0': !openCountries}" @click="openOptions('countries')"></i>
					</span>
				</span>
				<ul class="w-full pt-2 pl-4 transition-all" :class="{'h-104 opacity-100': openCountries, 'h-0 z-0 opacity-0': !openCountries}">
					<span class="flex items-center pb-1 pt-3">
						<i class="fa-solid fa-minus mr-2 text-xs"></i>
						<li class="text-xl">France</li>
					</span>
					<span class="flex items-center py-1">
						<i class="fa-solid fa-minus mr-2 text-sm"></i>
						<li class="text-xl">Indonesia</li>
					</span>
					<span class="flex items-center py-1">
						<i class="fa-solid fa-minus mr-2 text-sm"></i>
						<li class="text-xl">Ireland</li>
					</span>
					<span class="flex items-center py-1">
						<i class="fa-solid fa-minus mr-2 text-sm"></i>
						<li class="text-xl">Luxembourg</li>
					</span>
					<span class="flex items-center py-1">
						<i class="fa-solid fa-minus mr-2 text-sm"></i>
						<li class="text-xl">Malaysia</li>
					</span>
					<span class="flex items-center py-1">
						<i class="fa-solid fa-minus mr-2 text-sm"></i>
						<li class="text-xl">Malta</li>
					</span>
					<span class="flex items-center py-1">
						<i class="fa-solid fa-minus mr-2 text-sm"></i>
						<li class="text-xl">Portugal</li>
					</span>
					<span class="flex items-center py-1">
						<i class="fa-solid fa-minus mr-2 text-sm"></i>
						<li class="text-xl">Singapore</li>
					</span>
					<span class="flex items-center py-1">
						<i class="fa-solid fa-minus mr-2 text-sm"></i>
						<li class="text-xl">Spain</li>
					</span>
					<span class="flex items-center py-1">
						<i class="fa-solid fa-minus mr-2 text-sm"></i>
						<li class="text-xl">Sweden</li>
					</span>
					<span class="flex items-center py-1">
						<i class="fa-solid fa-minus mr-2 text-sm"></i>
						<li class="text-xl">Thailand</li>
					</span>
				</ul>
			</span>

			<span class="w-11/12 flex flex-col items-center border-solid border-zinc-100 border-b-1 py-4 bg-custom-blue-500" :class="{'z-[1]': openCountries, 'z-0': !openCountries}">
				<span class="flex flex-row items-center justify-between w-full">
					<span class="flex flex-row items-center">
						<i class="fa-solid fa-plane-departure text-xl mr-2"></i>
						<h3 class="text-2xl">Upc. Destinations</h3>
					</span>
					<span class="">
						<i class="fa-solid fa-chevron-down transition-all" :class="{'rotate-180': openDestinations, 'rotate-0': !openDestinations}" @click="openOptions('destinations')"></i>
					</span>
				</span>
				<ul class="w-full pt-2 pl-4 transition-all" :class="{'h-68 opacity-100': openDestinations, 'h-0 z-0 opacity-0': !openDestinations}">
					<span class="flex items-center pb-1 pt-3">
						<i class="fa-solid fa-minus mr-2 text-xs"></i>
						<li class="text-xl">Crete</li>
					</span>
					<span class="flex items-center py-1">
						<i class="fa-solid fa-minus mr-2 text-sm"></i>
						<li class="text-xl">Kitzbühel</li>
					</span>
					<span class="flex items-center py-1">
						<i class="fa-solid fa-minus mr-2 text-sm"></i>
						<li class="text-xl">Klagenfurt</li>
					</span>
					<span class="flex items-center py-1">
						<i class="fa-solid fa-minus mr-2 text-xs"></i>
						<li class="text-xl">Liechtenstein</li>
					</span>
					<span class="flex items-center py-1">
						<i class="fa-solid fa-minus mr-2 text-sm"></i>
						<li class="text-xl">Strasbourg</li>
					</span>
					<span class="flex items-center py-1">
						<i class="fa-solid fa-minus mr-2 text-sm"></i>
						<li class="text-xl">Vienna</li>
					</span>
					<span class="flex items-center py-1">
						<i class="fa-solid fa-minus mr-2 text-sm"></i>
						<li class="text-xl">Zürich</li>
					</span>
				</ul>
			</span>
			</main>
		<footer class="fixed bottom-0 z-10 w-2/3 h-1/10 flex justify-center items-center border-solid border-t-2 border-zinc-100 bg-custom-blue-500">
			<h1 class="font-logo text-2xl">NXTDES</h1>
		</footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	props: ['isOpen'],
	data() {
		return {
			openTravelInfo: false,
			openCountries: false,
			openDestinations: false
		}
	},
	methods: {
		openOptions(option: string) {
			if (option === 'travelInfo') {
				this.openTravelInfo = !this.openTravelInfo;
			}
			if (option === 'countries') {
				this.openCountries = !this.openCountries;
			}
			if (option === 'destinations') {
				this.openDestinations = !this.openDestinations;
			}
		}
	}
})
</script>

<style scoped>

</style>