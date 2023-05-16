<template>
  <Foreground :is-open="isOpen" :is-open-function="openSidemenu"/>
  <Navbar :is-open-function="openSidemenu"/>
  <Sidemenu :is-open="isOpen" :is-open-function="openSidemenu"/>
  <Banner />
  <TravelInfoFrontPage />
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './Home/Navbar.vue';
import Sidemenu from './Home/Sidemenu.vue';
import Foreground from './Home/Foreground.vue';
import Banner from './Home/Banner.vue';
import TravelInfoFrontPage from './TravelInfoFrontPage.vue';
import Footer from './Home/Footer.vue';

export default defineComponent({
  components: {
    Navbar,
    Sidemenu,
    Foreground,
    Banner,
    TravelInfoFrontPage,
    Footer
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    path() {
      return useRoute().path.slice(1).split('_').join(' ');
    },
  },
  methods: {
    openSidemenu() {
      this.isOpen = !this.isOpen;
    },
    capitalizeWords(str: string) {
      return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      }
  }
})
</script>

<style scoped>

</style>