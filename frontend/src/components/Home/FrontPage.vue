<template>
  <div class="flex justify-center min-h-[50vh]">
    <div class="w-4/5 text-center">
      <h1 class="font-logo text-4xl py-5">Next Destination</h1>
      <p class="font-headers text-2xl font-bold">travelling, history, culture, city & nature</p>
      <div class="w-full h-px bg-zinc-300 my-6"></div>
      <!-- <h1 class="font-headers font-bold text-3xl pb-5">What shall the next destination be?</h1> -->
      <p class="font-text text-left leading-7 font-light">Welcome to NXTDES (Next Destination), your ultimate travel companion for wanderlust souls! Embark on an extraordinary journey through the pages of this website, where travel tales come alive, and unforgettable experiences await. Delve into the treasure trove of captivating destinations as we share the stories, secrets, and must-see sights of the places we have personally explored. Whether you're seeking inspiration for your next adventure or simply want to relish in the beauty of distant lands from the comfort of your screen, NXTDES is here to transport you to new horizons. So fasten your seatbelts and get ready to discover the world, one click at a time. Your next destination starts here!</p>
      <div class="w-full h-px bg-zinc-300 my-8"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { get, ref as dataRef, set } from 'firebase/database';
import { db } from '@/main';

export default defineComponent({
  setup() {
    const userList = ref<string[]>([]);

    onMounted(() => {
      fetchAndPostUser();
    })

    function fetchAndPostUser() {
      const userRef = dataRef(db, 'users');
      get(userRef)
        .then((snapshot) => {
          const data = snapshot.val();
          userList.value.push(...Object.keys(data))
          onAuthStateChanged(getAuth(), (user) => {
            if (user && !userList.value.includes(user.email!.replace(/[.#$\[\]]/g, "_"))) {
              postUser(user);
            }
          });
        })
        .catch((error) => {
          console.log(error);
        })
    }

    function postUser(user: User) {
      const userRef = dataRef(db, `users/${user.email?.replace(/[.#$\[\]]/g, "_")}`);
      set(userRef, {sights: {1: 'home'}});
    }
  },
  // data() {
  //   return {
  //     userList: [] as string[]
  //   }
  // },
  // methods: {
  //   fetchAndPostUser() {
  //     const userRef = dataRef(db, 'users');
  //     get(userRef)
  //       .then((snapshot) => {
  //         const data = snapshot.val();
  //         this.userList.push(...Object.keys(data))
  //         onAuthStateChanged(getAuth(), (user) => {
  //           if (user && !this.userList.includes(user.email!.replace(/[.#$\[\]]/g, "_"))) {
  //             this.postUser(user);
  //           }
  //         });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       })
  //  },
  //  postUser(user: User) {
  //   const userRef = dataRef(db, `users/${user.email?.replace(/[.#$\[\]]/g, "_")}`);
  //   set(userRef, {sights: {1: 'home'}});
  // }
  // },
  // mounted() {
  //   this.fetchAndPostUser();
  // },
})
</script>

<style scoped>

</style>