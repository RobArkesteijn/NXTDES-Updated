<template>
  <Foreground />
  <Navbar />
  <Sidemenu />
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
  }
})
</script>

<style scoped>

</style>