<template>
  <Foreground />
  <Navbar />
  <Sidemenu />
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
})
</script>

<style scoped>

</style>