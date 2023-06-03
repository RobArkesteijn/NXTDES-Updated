<template>
  <Foreground />
  <Navbar />
  <Sidemenu />
  <Banner />
  <CountriesFrontPage />
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '../Home/Navbar.vue';
import Sidemenu from '../Home/Sidemenu.vue';
import Foreground from '../Home/Foreground.vue';
import Banner from '../Home/Banner.vue';
import Footer from '../Home/Footer.vue';
import CountriesFrontPage from './CountriesFrontPage.vue';
import { useStore } from '@/store/store';

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
    const store = useStore;

    return {
      store: store,
    }
  }
})
</script>

<style scoped>

</style>