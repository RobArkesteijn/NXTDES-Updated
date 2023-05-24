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
      <h2 v-if="!image" class="text-zinc-950 font-headers text-4xl font-bold">Loading...</h2>
      <h1 v-if="image" class="text-zinc-50 font-headers font-bold text-4xl">{{ path }}</h1>
    </span>
    <span class="h-[7.5vh]"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getStorage, getDownloadURL, ref as storageRef } from 'firebase/storage';
import { firebaseApp, capitalizeFirstLetters, db } from '@/main';
import { get, ref as dataRef, set, remove } from 'firebase/database';
import { getAuth, User, onAuthStateChanged } from 'firebase/auth';
import { useNotification } from '@kyvg/vue3-notification';

export default defineComponent({
  setup() {
    const image = ref('');
    const list = ref<string[]>([]);
    const indexList = ref<any[]>([]);
    const route = useRoute();
    const { notify } = useNotification();

    const path = computed(() => capitalizeFirstLetters(route.path.slice(1).split('_').join(' ')));

    onMounted(() => {
      watchEffect(() => {
        const path = route.path.slice(1);
        fetchImage(path);
        onAuthStateChanged(getAuth(), (user) => {
			    if (user) {
			    	isFavoriteCheck(path, user)
			    } else {
			    	console.log('User is not logged in')
			    }
		    });
      })
    })

    function fetchImage(path: string) {
      const banner = document.getElementById('banner') as HTMLDivElement;
      const storage = getStorage(firebaseApp);
      const storageRefVariable = storageRef(storage, `${path}.webp`);
      getDownloadURL(storageRefVariable)
        .then((url) => {
          image.value = url;
          banner.style.backgroundImage = `url(${url})`;
        })
        .catch((error) => {
          image.value = '';
          console.log(error);
        });
    }

    function fetchUserListAndToggleFavorite() {
      const heart = document.getElementById('heart') as HTMLElement;
      const path = route.path.slice(1);
      const user = getAuth().currentUser?.email?.replace(/[.#$\[\]]/g, "_");
      if (user) {
        const userRef = dataRef(db, `users/${user}/sights`);
        get(userRef)
          .then((snapshot) => {
            const data = snapshot.val();
            list.value = Object.values(data);
            indexList.value = Object.keys(data);
            const indexOfElement = list.value.indexOf(path);
            const indexNumber = indexList.value[indexOfElement];
            const newIdNumber = Number(indexList.value.at(-1)) + 1;
            if (!list.value.includes(path)) {
              heart.classList.add('active');
              addToList(newIdNumber);
              notify({ type: 'success', text: 'Added to list'});
            } else {
              heart.classList.remove('active');
              deleteFromList(indexNumber);
              notify({ type: 'warn', text: 'Removed from list'});
            }
          })
          .catch((error) => {
            console.log(error);
          })
      } else {
        notify({ type: 'info', text: 'Please log in to add this Destination to your list'});
      }
    }

    function addToList(index: number) {
        const user = getAuth().currentUser?.email?.replace(/[.#$\[\]]/g, "_");
        const userRef = dataRef(db, `users/${user}/sights/${index}`);
        set(userRef, `${route.path.slice(1)}`)
          .then(() => {
            console.log('Data successfully added');
          })
          .catch((error) => {
            console.error('Error adding data:', error)
          })
    }

    function deleteFromList(index: number) {
      const user = getAuth().currentUser?.email?.replace(/[.#$\[\]]/g, "_");
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
          } else {
            // console.log('countries', 'No data available');
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }

    return {
      fetchUserListAndToggleFavorite: fetchUserListAndToggleFavorite,
      image: image,
      path: path
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