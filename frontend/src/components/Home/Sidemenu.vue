<template>
  <div class="fixed top-0 h-full w-2/3 bg-custom-blue-500 text-zinc-100 font-headers overflow-y-scroll transition-all z-[2]" :class="{'left-0': isOpen, 'left-[-67%]': !isOpen}">
		<header class="flex justify-center items-center h-1/10">
			<h1 v-if="user" class="text-4xl font-bold">{{ `Welcome ${user}` }}</h1>
			<h1 v-else class="text-4xl font-bold">Welcome Guest</h1>
		</header>
		<main class="flex flex-col items-center pb-4">
      <!-- Travel Info -->
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
				<ul class="w-full pt-2 pl-4 transition-all" :class="{'h-[8.33rem] opacity-100 visible': openTravelInfo, 'h-0 z-0 opacity-0 invisible': !openTravelInfo}">
					<span class="flex items-center pb-1 pt-3" v-for="info in travelinfo" :key="info">
						<i class="fa-solid fa-minus mr-2 text-xs"></i>
						<li class="text-xl"><router-link :to="`/${info.split(' ').join('_').toLowerCase()}`" @click="isOpenFunction">{{ info }}</router-link></li>
					</span>
				</ul>
			</span>
      <!-- Countries -->
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
				<ul class="w-full pt-2 pl-4 transition-all" :class="{'h-[50rem] opacity-100 visible': openCountries, 'h-0 z-0 opacity-0 invisible': !openCountries}">
					<span class="flex items-center pb-1 pt-3" v-for="country in countries" :key="country">
						<i class="fa-solid fa-minus mr-2 text-xs"></i>
						<li class="text-xl"><router-link :to="country" @click="isOpenFunction">{{ country }}</router-link></li>
					</span>
				</ul>
			</span>
      <!-- Upc. Destinations -->
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
				<ul class="w-full pt-2 pl-4 transition-all" :class="{'h-[2.78rem] opacity-100 visible': openDestinations, 'h-0 z-0 opacity-0 invisible': !openDestinations}">
					<span class="flex items-center pb-1 pt-3" v-for="destination in upcoming" :key="destination">
						<i class="fa-solid fa-minus mr-2 text-xs"></i>
						<li class="text-xl"><router-link :to="destination" @click="isOpenFunction">{{ destination }}</router-link></li>
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
import { defineComponent } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../main';
import { get, ref } from 'firebase/database';

interface Data{
  id: number;
  country: string;
}

export default defineComponent({
	props: ['isOpen', 'isOpenFunction'],
	data() {
		return {
			auth: getAuth(),
			openTravelInfo: false,
			openCountries: false,
			openDestinations: false,
			user: undefined as string | undefined,
      countries: [] as string[],
      travelinfo: [] as string[],
      upcoming: [] as string[],
		}
	},
	mounted() {
		onAuthStateChanged(this.auth, (user) => {
			if (user) {
				this.user = user.displayName?.split(' ')[0];
			} else {
				this.user = undefined;
			}
		});
    this.fetchTravelinfo();
    this.fetchCountries();
    this.fetchUpcoming();
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
		},
    fetchCountries() {
      const countriesRef = ref(db, 'countries');
      return get(countriesRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data: Data = snapshot.val();
            const countries: string[] = Object.values(data);
            this.countries = countries;
            return countries;
          } else {
            console.log('countries', 'No data available');
            return [];
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          return [];
        });
    },
    fetchTravelinfo() {
      const infoRef = ref(db, 'travelinfo');
      return get(infoRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data: Data = snapshot.val();
            const travelinfo: string[] = Object.values(data);
            this.travelinfo = travelinfo;
            return travelinfo;
          } else {
            console.log('travelinfo', 'No data available');
            return [];
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          return [];
        });
    },
    fetchUpcoming() {
      const upcomingRef = ref(db, 'upcoming');
      return get(upcomingRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data: Data = snapshot.val();
            const upcoming: string[] = Object.values(data);
            this.upcoming = upcoming;
            return upcoming;
          } else {
            console.log('upcoming', 'No data available');
            return [];
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          return [];
        });
    }
	}
})
</script>

<style scoped>

</style>