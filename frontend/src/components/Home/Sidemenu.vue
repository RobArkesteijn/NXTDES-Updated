<template>
  <div id="sidemenu" class="fixed top-0 h-full w-2/3 bg-custom-blue-500 text-zinc-100 font-headers overflow-y-scroll transition-all z-[2]" :class="{'left-0': isOpen, 'left-[-67%]': !isOpen}">
		<header class="flex justify-center items-center h-1/10">
			<h1 v-if="userName" class="text-4xl font-bold">{{ `Welcome ${userName}` }}</h1>
			<h1 v-else class="text-4xl font-bold">Welcome Guest</h1>
		</header>
		<main class="flex flex-col items-center">
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
				<ul id="travelinfoList" class="w-full pt-2 pl-4 transition-all h-0" :class="{'opacity-100 visible': openTravelInfo, 'z-0 opacity-0 invisible': !openTravelInfo}">
					<span class="flex items-center pb-1 pt-3" v-for="info in travelinfo" :key="info">
						<i class="fa-solid fa-minus mr-2 text-xs"></i>
						<li class="text-xl travelinfo-item"><router-link :to="`/${info.split(' ').join('_').toLowerCase()}`" @click="isOpenFunction">{{ info }}</router-link></li>
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
				<ul id="countriesList" class="w-full pt-2 pl-4 transition-all h-0" :class="{'opacity-100 visible': openCountries, 'z-0 opacity-0 invisible': !openCountries}">
					<span class="flex items-center pb-1 pt-3" v-for="country in countries" :key="country">
						<i class="fa-solid fa-minus mr-2 text-xs"></i>
						<li class="text-xl countries-item"><router-link :to="country.toLowerCase()" @click="isOpenFunction">{{ country }}</router-link></li>
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
				<ul id="upcomingList" class="w-full pt-2 pl-4 transition-all h-0" :class="{'opacity-100 visible': openDestinations, 'z-0 opacity-0 invisible': !openDestinations}">
					<span class="flex items-center pb-1 pt-3" v-for="destination in upcoming" :key="destination">
						<i class="fa-solid fa-minus mr-2 text-xs"></i>
						<li class="text-xl upcoming-item"><router-link :to="destination.toLowerCase()" @click="isOpenFunction">{{ destination }}</router-link></li>
					</span>
				</ul>
			</span>
      <!-- Favorites -->
      <span class="w-11/12 flex flex-col items-center border-solid border-zinc-100 border-b-1 py-4 bg-custom-blue-500" :class="{'z-[1]': openDestinations, 'z-0': !openDestinations}">
				<span class="flex flex-row items-center justify-between w-full">
					<span class="flex flex-row items-center">
						<i class="fa-solid fa-heart text-xl mr-2"></i>
						<h3 class="text-2xl">Favorites</h3>
					</span>
					<span class="">
						<i class="fa-solid fa-chevron-down transition-all" :class="{'rotate-180': openFavorites, 'rotate-0': !openFavorites}" @click="openOptions('favorites')"></i>
					</span>
				</span>
				<ul id="favoritesList" class="w-full pt-2 pl-4 transition-all h-0" :class="{'opacity-100 visible': openFavorites, 'z-0 opacity-0 invisible': !openFavorites}">
					<span v-if="favorites.length > 0" class="flex items-center pb-1 pt-3" v-for="favorite in favorites" :key="favorite">
						<i class="fa-solid fa-minus mr-2 text-xs"></i>
						<li class="favorite-item text-xl"><router-link :to="favorite.split(' ').join('_').toLowerCase()" @click="isOpenFunction">{{ favorite.split('_').join(' ') }}</router-link></li>
					</span>
          <span v-else class="flex items-center pb-1 pt-3">
						<i class="fa-solid fa-minus mr-2 text-xs"></i>
            <li class="text-xl favorite-item">Log in to add favorites to this list</li>
          </span>
				</ul>
			</span>

		</main>
		<!-- <footer class="fixed bottom-0 z-10 w-2/3 h-1/10 flex justify-center items-center border-solid border-t-2 border-zinc-100 bg-custom-blue-500">
			<h1 class="font-logo text-2xl">NXTDES</h1>
		</footer> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount, watch, onBeforeUpdate, onMounted } from 'vue';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { db, sortArrayAlphabetically } from '../../main';
import { get, ref as dataRef } from 'firebase/database';

interface Data{
  id: number;
  country: string;
}

export default defineComponent({
	props: ['isOpen', 'isOpenFunction'],
  setup(props) {
    const auth = getAuth();
    const openTravelInfo = ref(false);
    const openCountries = ref(false);
    const openDestinations = ref(false);
    const openFavorites = ref(false);
    const userName = ref<string | undefined>(undefined);
    const countries = ref<string[]>([]);
    const travelinfo = ref<string[]>([]);
    const upcoming = ref<string[]>([]);
    const favorites = ref<string[]>([]);

    onBeforeMount(() => {
      onAuthStateChanged(auth, (user) => {
			  if (user) {
			    userName.value = user.displayName?.split(' ')[0];
			  } else {
			  	userName.value = undefined;
			  }
		  });
      fetchTravelinfo();
      fetchCountries();
      fetchUpcoming();
    })

    watch(openTravelInfo, () => {
      calculateTravelInfoListHeight();
    })

    // onBeforeUpdate(() => {
    //   fetchFavorites(auth.currentUser!);
    // })

    watch(openFavorites, async () => {
      if (auth.currentUser) {
        await fetchFavorites(auth.currentUser);
      }
      calculateFavoriteListHeight();
    })

    watch(openCountries, () => {
      calculateCountriesListHeight();
    })

    watch(openDestinations, () => {
      calculateUpcomingListHeight();
    })

    function calculateTravelInfoListHeight() {
      const list = document.getElementById('travelinfoList') as HTMLUListElement;
      const listItems = document.querySelectorAll('.travelinfo-item');
      const listLength = listItems.length;
      const listHeight = Number((listLength * 2.778).toFixed(2));
      if(openTravelInfo.value) {
        list.style.height = `${listHeight}rem`;
      } else {
        list.style.height = '0rem';
      }
    }

    function calculateCountriesListHeight() {
      const list = document.getElementById('countriesList') as HTMLUListElement;
      const listItems = document.querySelectorAll('.countries-item');
      const listLength = listItems.length;
      const listHeight = Number((listLength * 2.778).toFixed(2));
      if(openCountries.value) {
        list.style.height = `${listHeight}rem`;
      } else {
        list.style.height = '0rem';
      }
    }

    function calculateUpcomingListHeight() {
      const list = document.getElementById('upcomingList') as HTMLUListElement;
      const listItems = document.querySelectorAll('.upcoming-item');
      const listLength = listItems.length;
      const listHeight = Number((listLength * 2.778).toFixed(2));
      if(openDestinations.value) {
        list.style.height = `${listHeight}rem`;
      } else {
        list.style.height = '0rem';
      }
    }

    function calculateFavoriteListHeight() {
      const list = document.getElementById('favoritesList') as HTMLUListElement;
      const listItems = document.querySelectorAll('.favorite-item');
      const listLength = listItems.length;
      const listHeight = Number((listLength * 2.778).toFixed(2));
      if(openFavorites.value) {
        list.style.height = `${listHeight}rem`;
      } else {
        list.style.height = '0rem';
      }
    }

    function openOptions(option: string) {
      if (option === 'travelInfo') {
				openTravelInfo.value = !openTravelInfo.value;
			}
			if (option === 'countries') {
				openCountries.value = !openCountries.value;
			}
			if (option === 'destinations') {
				openDestinations.value = !openDestinations.value;
			}
      if (option === 'favorites') {
				openFavorites.value = !openFavorites.value;
			}
    }

    function fetchCountries() {
      const countriesRef = dataRef(db, 'countries');
      return get(countriesRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data: Data = snapshot.val();
            const dataCountries: string[] = sortArrayAlphabetically(Object.values(data));
            countries.value = dataCountries;
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
    }

    function fetchTravelinfo() {
      const infoRef = dataRef(db, 'travelinfo');
      return get(infoRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data: Data = snapshot.val();
            const dataTravelinfo: string[] = sortArrayAlphabetically(Object.values(data));
            travelinfo.value = dataTravelinfo;
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
    }

    function fetchUpcoming() {
      const upcomingRef = dataRef(db, 'upcoming');
      return get(upcomingRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data: Data = snapshot.val();
            const dataUpcoming: string[] = sortArrayAlphabetically(Object.values(data));
            upcoming.value = dataUpcoming;
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

    function fetchFavorites(user: User) {
      const favoriteRef = dataRef(db, `users/${user.email?.replace(/[.#$\[\]]/g, "_")}/sights`);
      return get(favoriteRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data: Data = snapshot.val();
            const dataFavorites: string[] = sortArrayAlphabetically(Object.values(data));
            favorites.value = dataFavorites.filter((sight) => sight !== 'home');
            return favorites;
          } else {
            console.log('favorites', 'No data available');
            return [];
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          return [];
        })
    }

    return {
      userName: userName,
      travelinfo: travelinfo,
      openTravelInfo: openTravelInfo,
      openCountries: openCountries,
      openDestinations: openDestinations,
      countries: countries,
      upcoming: upcoming,
      favorites: favorites,
      openFavorites: openFavorites,
      openOptions: openOptions,
    }
  },

	// data() {
	// 	return {
	// 		auth: getAuth(),
	// 		openTravelInfo: false,
	// 		openCountries: false,
	// 		openDestinations: false,
  //     openFavorites: false,
	// 		userName: undefined as string | undefined,
  //     countries: [] as string[],
  //     travelinfo: [] as string[],
  //     upcoming: [] as string[],
  //     favorites: [] as string[]
	// 	}
	// },
	// mounted() {
	// 	onAuthStateChanged(this.auth, (user) => {
	// 		if (user) {
	// 			this.userName = user.displayName?.split(' ')[0];
  //       this.fetchFavorites(user);
	// 		} else {
	// 			this.userName = undefined;
	// 		}
	// 	});
  //   this.fetchTravelinfo();
  //   this.fetchCountries();
  //   this.fetchUpcoming();
	// },
	// methods: {
	// 	openOptions(option: string) {
	// 		if (option === 'travelInfo') {
	// 			this.openTravelInfo = !this.openTravelInfo;
	// 		}
	// 		if (option === 'countries') {
	// 			this.openCountries = !this.openCountries;
	// 		}
	// 		if (option === 'destinations') {
	// 			this.openDestinations = !this.openDestinations;
	// 		}
  //     if (option === 'favorites') {
	// 			this.openFavorites = !this.openFavorites;
	// 		}
	// 	},
  //   fetchCountries() {
  //     const countriesRef = dataRef(db, 'countries');
  //     return get(countriesRef)
  //       .then((snapshot) => {
  //         if (snapshot.exists()) {
  //           const data: Data = snapshot.val();
  //           const countries: string[] = sortArrayAlphabetically(Object.values(data));
  //           this.countries = countries;
  //           return countries;
  //         } else {
  //           console.log('countries', 'No data available');
  //           return [];
  //         }
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching data:', error);
  //         return [];
  //       });
  //   },
  //   fetchTravelinfo() {
  //     const infoRef = dataRef(db, 'travelinfo');
  //     return get(infoRef)
  //       .then((snapshot) => {
  //         if (snapshot.exists()) {
  //           const data: Data = snapshot.val();
  //           const travelinfo: string[] = sortArrayAlphabetically(Object.values(data));
  //           this.travelinfo = travelinfo;
  //           return travelinfo;
  //         } else {
  //           console.log('travelinfo', 'No data available');
  //           return [];
  //         }
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching data:', error);
  //         return [];
  //       });
  //   },
  //   fetchUpcoming() {
  //     const upcomingRef = dataRef(db, 'upcoming');
  //     return get(upcomingRef)
  //       .then((snapshot) => {
  //         if (snapshot.exists()) {
  //           const data: Data = snapshot.val();
  //           const upcoming: string[] = sortArrayAlphabetically(Object.values(data));
  //           this.upcoming = upcoming;
  //           return upcoming;
  //         } else {
  //           console.log('upcoming', 'No data available');
  //           return [];
  //         }
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching data:', error);
  //         return [];
  //       });
  //   },
  //   fetchFavorites(user: User) {
  //     const favoriteRef = dataRef(db, `users/${user.email?.replace(/[.#$\[\]]/g, "_")}/sights`);
  //     return get(favoriteRef)
  //       .then((snapshot) => {
  //         if (snapshot.exists()) {
  //           const data: Data = snapshot.val();
  //           const favorites: string[] = sortArrayAlphabetically(Object.values(data));
  //           this.favorites = favorites.filter((sight) => sight !== 'home');
  //           console.log(this.favorites);
  //           return favorites;
  //         } else {
  //           console.log('favorites', 'No data available');
  //           return [];
  //         }
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching data:', error);
  //         return [];
  //       })
  //   }
	// },
})
</script>

<style scoped>

</style>