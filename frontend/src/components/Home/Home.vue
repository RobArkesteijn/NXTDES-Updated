<template>
    <Foreground :is-open="isOpen" :is-open-function="openSidemenu" />
    <Navbar :is-open-function="openSidemenu"/>
    <Sidemenu :is-open="isOpen" :is-open-function="openSidemenu"/>
    <Banner />
    <FrontPage />
    <Footer />
  </template>
  
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import Navbar from './Navbar.vue';
  import Sidemenu from './Sidemenu.vue';
  import Foreground from './Foreground.vue';
  import Banner from './Banner.vue';
  import FrontPage from './FrontPage.vue';
  import Footer from './Footer.vue';
  
  export default defineComponent({
    components: { 
      Navbar,
      Sidemenu,
      Foreground,
      Banner,
      FrontPage,
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
    //       this.isOpen = !this.isOpen;
    //   }
    // },
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