<template>
  <div class="navbar fixed w-full h-1/10 bg-custom-blue-500 flex items-center text-zinc-100 border-solid border-zinc-50 border-b-2 transition-all">
    <span class="w-1/4 flex items-center justify-center">
      <i class="fa-solid fa-bars text-3xl cursor-pointer" @click="store.openSidemenu"></i>
    </span>
    <span class="w-1/2 flex items-center justify-center">
      <h1 class=" text-4xl font-logo cursor-pointer"><router-link to="/home">NXTDES</router-link></h1>
    </span>
    <span class="w-1/4 flex flex-col items-center justify-center">
      <img v-if="profilePic" :src="profilePic" alt="Profile picture" @click="openUserMenu" class="rounded-full h-11 w-auto border-solid border-2 border-zinc-50 cursor-pointer">
      <i v-else class="fa-regular fa-circle-user text-3xl cursor-pointer" @click="openUserMenu"></i>
    </span>
  </div>
  <div :class="{'opacity-0 pointer-events-none': !userInfoOpen, 'opacity-100': userInfoOpen}" class="w-1/4 fixed top-[10vh] right-0 bg-custom-blue-500 min-h-[2.5rem] z-[1] flex justify-center items-center border-solid border-zinc-50 border-x-2 border-b-2 rounded-b transition-all" v-if="auth.currentUser">
    <button class="text-zinc-50"><i class="fa-solid fa-right-from-bracket text-xl" @click="handleSignout"></i></button>
  </div>
  <div v-else :class="{'opacity-0 pointer-events-none': !userInfoOpen, 'opacity-100': userInfoOpen}" class="w-1/4 fixed top-[10vh] right-0 bg-custom-blue-500 min-h-[2.5rem] z-[1] flex justify-center items-center border-solid border-zinc-50 border-x-2 border-b-2 rounded-b transition-all">
    <button class="text-zinc-50"><i class="fa-solid fa-right-to-bracket text-xl" @click="redirectLogin"></i></button>
  </div>
  <div class="h-[10vh]"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { useStore } from '@/store/store';

export default defineComponent({
  setup() {
    const auth = getAuth();
    const router = useRouter();
    const userInfoOpen = ref(false);
    const profilePic = ref<string | null>(null);
    const lastScrollPosition = ref(0);
    const store = useStore();

    onBeforeMount(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          profilePic.value = user.photoURL;
        } else {
          profilePic.value = null;
        }
      });
      window.addEventListener('scroll', handleScroll);
    })

    function handleSignout() {
      signOut(auth)
        .then(() => {
            router.push('/');
            store.resetStore();
            store.notify({ type: 'warn', text: 'Logged Out'})
        })
        .catch((error) => {
          console.log(error);
        })
    }

    function openUserMenu() {
      userInfoOpen.value = !userInfoOpen.value
    }

    function redirectLogin() {
      router.push('/');
    }

    function handleScroll() {
      const navbar = document.querySelector('.navbar') as HTMLDivElement;
      const navbarHeight = navbar.offsetHeight;
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollPosition > lastScrollPosition.value && scrollPosition > navbarHeight) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }

      if(userInfoOpen.value) {
        userInfoOpen.value = false;
      }

      lastScrollPosition.value = scrollPosition;
    }

    return {
      auth: auth,
      profilePic: profilePic,
      userInfoOpen: userInfoOpen,
      openUserMenu: openUserMenu,
      handleSignout: handleSignout,
      redirectLogin: redirectLogin,
      store: store
    }

  },
})
</script>

<style scoped>
    h1 {
        text-shadow: 2px 2px 0.2px #2B6F87;
    }
</style>