<template>
  <Foreground :is-open="isOpen" :is-open-function="openSidemenu"/>
  <Navbar :is-open-function="openSidemenu"/>
  <Sidemenu :is-open="isOpen" :is-open-function="openSidemenu"/>
  <Banner />
  <TravelInfoFrontPage />
  <Footer />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Navbar from '../Home/Navbar.vue';
import Sidemenu from '../Home/Sidemenu.vue';
import Foreground from '../Home/Foreground.vue';
import Banner from '../Home/Banner.vue';
import Footer from '../Home/Footer.vue';
import TravelInfoFrontPage from './TravelInfoFrontPage.vue';

export default defineComponent({
  components: {
    Navbar,
    Sidemenu,
    Foreground,
    Banner,
    TravelInfoFrontPage,
    Footer
  },
  setup() {
    const isOpen = ref(false);

    function openSidemenu() {
      isOpen.value = !isOpen.value;
    }

    function capitalizeWords(str: string) {
      return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      }

    return {
      isOpen: isOpen,
      openSidemenu: openSidemenu,
      capitalizeWords: capitalizeWords
    }
  },
  // data() {
  //   return {
  //     isOpen: false,
  //   }
  // },
  // computed: {
  //   path() {
  //     return useRoute().path.slice(1).split('_').join(' ');
  //   },
  // },
  // methods: {
  //   openSidemenu() {
  //     this.isOpen = !this.isOpen;
  //   },
  //   capitalizeWords(str: string) {
  //     return str
  //       .split(' ')
  //       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  //       .join(' ');
  //     }
  // }
})
</script>

<style scoped>

</style>