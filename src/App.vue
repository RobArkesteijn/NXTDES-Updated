<template>
  <Foreground :is-open="isOpen" :is-open-function="openSidemenu" />
  <Navbar :is-open-function="openSidemenu"/>
  <Sidemenu :is-open="isOpen"/>
  <Banner />
  <FrontPage />
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from './components/Navbar.vue';
import Sidemenu from './components/Sidemenu.vue';
import Foreground from './components/Foreground.vue';
import Banner from './components/Banner.vue';
import FrontPage from './components/FrontPage.vue';
import Footer from './components/Footer.vue';

export default defineComponent({
  components: { 
    Navbar,
    Sidemenu,
    Foreground,
    Banner,
    FrontPage,
    Footer
  },
  data() {
	  return {
		  isOpen: false,
	  }
	},
  methods: {
		openSidemenu() {
			this.isOpen = !this.isOpen;
		}
	}
});
</script>

<style>
  *{
    box-sizing: content-box;
    padding: 0;
    margin: 0;
  }

  #app {
    height: 100vh;
    width: 100vw;
  }
</style>
