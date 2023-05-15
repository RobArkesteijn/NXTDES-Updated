<template>
  <div class="w-full h-1/10 bg-custom-blue-500 flex items-center text-zinc-100 border-solid border-zinc-50 border-b-2">
    <span class="w-1/4 flex items-center justify-center">
      <i class="fa-solid fa-bars text-3xl cursor-pointer" @click="isOpenFunction"></i>
    </span>
    <span class="w-1/2 flex items-center justify-center">
      <h1 class=" text-4xl font-logo cursor-pointer"><router-link to="/home">NXTDES</router-link></h1>
    </span>
    <span class="w-1/4 flex flex-col items-center justify-center">
      <img v-if="profilePic" :src="profilePic" alt="Profile picture" @click="openUserMenu" class="rounded-full h-11 w-auto border-solid border-2 border-zinc-50 cursor-pointer">
      <i v-else class="fa-regular fa-circle-user text-3xl cursor-pointer" @click="openUserMenu"></i>
    </span>
  </div>
  <div :class="{'opacity-0 pointer-events-none': !userInfoOpen, 'opacity-100': userInfoOpen}" class="w-1/4 absolute top-[10vh)] right-0 bg-custom-blue-500 min-h-[2.5rem] z-[1] flex justify-center items-center border-solid border-zinc-50 border-x-2 border-b-2 rounded-b transition-all" v-if="auth.currentUser">
    <button class="text-zinc-50"><i class="fa-solid fa-right-from-bracket text-xl" @click="handleSignout"></i></button>
  </div>
  <div v-else :class="{'opacity-0': !userInfoOpen, 'opacity-100': userInfoOpen}" class="w-1/4 absolute top-[10vh] right-0 bg-custom-blue-500 min-h-[2.5rem] z-[1] flex justify-center items-center border-solid border-zinc-50 border-x-2 border-b-2 rounded-b transition-all">
    <button class="text-zinc-50"><i class="fa-solid fa-right-to-bracket text-xl" @click="redirectLogin"></i></button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'vue-router';

export default defineComponent({
	props: ['isOpenFunction'],
    data() {
      return {
        auth: getAuth(),
        userInfoOpen: false,
        router: useRouter(),
        profilePic: null as string | null,
    }
  },
  mounted() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.profilePic = user.photoURL;
      } else {
        this.profilePic = null;
      }
    });
  },
  methods: {
    handleSignout() {
      signOut(this.auth)
        .then(() => {
            this.router.push('/');
            console.log('Logged out succesfully');
        })
        .catch((error) => {
          console.log(error);
        })
    },
    openUserMenu() {
      this.userInfoOpen = !this.userInfoOpen;
    },
    redirectLogin() {
      this.router.push('/');
    },
  }
})
</script>

<style scoped>
    h1 {
        text-shadow: 2px 2px 0.2px #2B6F87;
    }
</style>