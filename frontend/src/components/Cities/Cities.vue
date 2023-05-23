<template>
  <Foreground :is-open="isOpen" :is-open-function="openSidemenu" />
  <Navbar :is-open-function="openSidemenu" />
  <Sidemenu :is-open="isOpen" :is-open-function="openSidemenu" />
  <Banner />
  <CitiesFrontPage />
  <Footer />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Foreground from '../Home/Foreground.vue';
import Navbar from '../Home/Navbar.vue';
import Sidemenu from '../Home/Sidemenu.vue';
import Banner from '../Home/Banner.vue';
import CitiesFrontPage from './CitiesFrontPage.vue';
import Footer from '../Home/Footer.vue';

export default defineComponent({
  components: {
    Foreground,
    Navbar,
    Sidemenu,
    Banner,
    CitiesFrontPage,
    Footer
  },
  setup() {
    const isOpen = ref(false);
    function openSidemenu() {
      isOpen.value = !isOpen.value;
    }
    return {
      isOpen: isOpen,
      openSidemenu: openSidemenu
    }
  },
  // data() {
  //   return {
  //     isOpen: false,
  //   }
  // },
  // methods: {
  //   openSidemenu() {
  //     this.isOpen = !this.isOpen;
  //   }
  // }
})
</script>

<style scoped>

</style>