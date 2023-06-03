<template>
  <div id="banner" class="h-[30vh] overflow-hidden border-solid border-b-2 border-zinc-950 flex flex-col bg-center bg-cover bg-no-repeat">
    <span class="h-[7.5vh] w-full flex items-center justify-begin" :class="{'justify-end': $route.path.slice(1) === 'home'}">
      <i v-if="$route.path.slice(1) !== 'home'" id="heart" class="fa-solid fa-heart text-4xl text-zinc-50 ml-1 transition-all" @click="fetchUserListAndToggleFavorite"></i>
      <span class="flex basis-full justify-end">
        <img src="../../dutch.png" alt="Dutch Language" class="h-[35px] w-auto rounded-full duration-[50ms] transition-[border] active:border-zinc-50 active:border-[2px] active:border-solid">
        <img src="../../british.png" alt="English Language" class="h-[35px] w-auto mx-1 rounded-full duration-[50ms] transition-[border] active:border-zinc-50 active:border-[2px] active:border-solid">
      </span>
    </span>
    <span class="h-[15vh] w-full flex items-center justify-center">
      <h2 v-if="!homeStore.image" class="text-zinc-950 font-headers text-4xl font-bold">Loading...</h2>
      <h1 v-if="homeStore.image" class="text-zinc-50 font-headers font-bold text-4xl">{{ capitalizeFirstLetters(store.path.split('_').join(' ')) }}</h1>
    </span>
    <span class="h-[7.5vh]"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect, onMounted, computed } from 'vue';
import { getStorage, getDownloadURL, ref as storageRef } from 'firebase/storage';
import { firebaseApp, capitalizeFirstLetters, db } from '@/main';
import { get, ref as dataRef, set, remove } from 'firebase/database';
import { User } from 'firebase/auth';
import { useStore } from '@/store/store';
import { useHomeStore } from '@/store/homeStore';

export default defineComponent({
  setup() {
    const store = useStore();
    const homeStore = useHomeStore();

    const isLoggedIn = computed(() => store.user !== null);

    onMounted(() => {
      watchEffect(() => {
        fetchImage(store.path);
        if (isLoggedIn.value) {
          isFavoriteCheck(store.path, store.user!);
        }
      })
    })

    function fetchImage(path: string) {
      const banner = document.getElementById('banner') as HTMLDivElement;
      const storage = getStorage(firebaseApp);
      const storageRefVariable = storageRef(storage, `${path}.webp`);
      getDownloadURL(storageRefVariable)
        .then((url) => {
          homeStore.image = url;
          banner.style.backgroundImage = `url(${url})`;
        })
        .catch((error) => {
          homeStore.image = '';
          console.log(error);
        });
    }

    function fetchUserListAndToggleFavorite() {
      const heart = document.getElementById('heart') as HTMLElement;
      const user = store.user!.email?.replace(/[.#$\[\]]/g, "_");
      if (user) {
        const userRef = dataRef(db, `users/${user}/sights`);
        get(userRef)
          .then((snapshot) => {
            const data = snapshot.val();
            homeStore.list = Object.values(data);
            homeStore.indexList = Object.keys(data);
            const indexOfElement = homeStore.list.indexOf(store.path);
            const indexNumber = homeStore.indexList[indexOfElement];
            const newIdNumber = Number(homeStore.indexList.at(-1)) + 1;
            if (!homeStore.list.includes(store.path)) {
              heart.classList.add('active');
              addToList(newIdNumber);
              store.notify({ type: 'success', text: 'Added to list'});
            } else {
              heart.classList.remove('active');
              deleteFromList(indexNumber);
              store.notify({ type: 'warn', text: 'Removed from list'});
            }
          })
          .catch((error) => {
            console.log(error);
          })
      } else {
        store.notify({ type: 'info', text: 'Please log in to add this Destination to your list'});
      }
    }

    function addToList(index: number) {
        const user = store.user!.email?.replace(/[.#$\[\]]/g, "_");
        const userRef = dataRef(db, `users/${user}/sights/${index}`);
        set(userRef, `${store.path}`)
          .then(() => {
            console.log('Data successfully added');
          })
          .catch((error) => {
            console.error('Error adding data:', error)
          })
    }

    function deleteFromList(index: number) {
      const user = store.user!.email?.replace(/[.#$\[\]]/g, "_");
      const userRef = dataRef(db, `users/${user}/sights/${index}`);
      remove(userRef)
        .then(() => {
          console.log('Data deleted successfully.');
        })
        .catch((error) => {
          console.error('Error deleting data:', error);
        });
    }

    function isFavoriteCheck(path: string, currentUser: User) {
      const heart = document.getElementById('heart') as HTMLElement;
      const user = currentUser.email?.replace(/[.#$\[\]]/g, "_");
      const userRef = dataRef(db, `users/${user}/sights`);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists() && heart) {
            const data = snapshot.val();
            if (Object.values(data).includes(path)) {
              heart.classList.add('active');
            } else {
              heart.classList.remove('active');
            }
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }

    return {
      fetchUserListAndToggleFavorite: fetchUserListAndToggleFavorite,
      capitalizeFirstLetters: capitalizeFirstLetters,
      homeStore: homeStore,
      store: store
    }
  },
})
</script>

<style scoped>
 h1 {
  text-shadow: 1.5px 1.5px 1px #2B6F87;
 }

 #heart {
  -webkit-text-stroke: 3px #dd4949;
 }
 #heart.active {
  color: #dd4949;
  -webkit-text-stroke: 3px black;
 }
</style>