<template>
  <Foreground :is-open="isOpen" :is-open-function="openSidemenu"/>
  <Navbar :is-open-function="openSidemenu"/>
  <Sidemenu :is-open="isOpen" :is-open-function="openSidemenu"/>
  <Banner />
  <CountriesFrontPage />
  <Footer />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Navbar from '../Home/Navbar.vue';
import Sidemenu from '../Home/Sidemenu.vue';
import Foreground from '../Home/Foreground.vue';
import Banner from '../Home/Banner.vue';
import Footer from '../Home/Footer.vue';
import CountriesFrontPage from './CountriesFrontPage.vue';

export default defineComponent({
  components: {
    Navbar,
    Sidemenu,
    Foreground,
    Banner,
    CountriesFrontPage,
    Footer,
  },
  setup() {
    const isOpen = ref(false);

    function openSidemenu() {
      isOpen.value = !isOpen.value
    }

    return {
      isOpen: isOpen,
      openSidemenu: openSidemenu
    }
  }
})
</script>

<style scoped>

</style>