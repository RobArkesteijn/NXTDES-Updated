<template>
  <Foreground :is-open="isOpen" :is-open-function="openSidemenu"/>
  <Navbar :is-open-function="openSidemenu"/>
  <Sidemenu :is-open="isOpen" :is-open-function="openSidemenu"/>
  <Banner />
  <div class="flex w-full justify-center py-4 text-xl font-text min-h-[50vh]" v-if="path !== 'destinations'">
    <h1>{{ firstLetterCapital(path) }}</h1>
  </div>
  <div class="flex w-full justify-center py-4 text-xl font-text min-h-[80vh]" v-else>
    <h1>This Page does not exist</h1>
  </div>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './Home/Navbar.vue';
import Sidemenu from './Home/Sidemenu.vue';
import Foreground from './Home/Foreground.vue';
import Banner from './Home/Banner.vue';
import Footer from './Home/Footer.vue';

export default defineComponent({
  components: {
    Navbar,
    Sidemenu,
    Foreground,
    Banner,
    Footer
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    path() {
      return useRoute().path.slice(1);
    }
  },
  methods: {
    openSidemenu() {
      this.isOpen = !this.isOpen;
    },
    firstLetterCapital(str: string) {
      const firstLetter = str[0].toUpperCase();
      const restOfWord = str.slice(1);
      return `${firstLetter}${restOfWord}`;
    }
  }
})
</script>

<style scoped>

</style>