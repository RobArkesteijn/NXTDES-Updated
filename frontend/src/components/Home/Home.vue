<template>
    <Foreground />
    <Navbar />
    <Sidemenu />
    <Banner />
    <FrontPage />
    <Footer />
  </template>
  
<script lang="ts">
  import { defineComponent } from 'vue';
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