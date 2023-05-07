<template>
  <Navbar />
  <Sidemenu />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from './components/Navbar.vue';
import Sidemenu from './components/Sidemenu.vue';

export default defineComponent({
    components: { 
      Navbar,
      Sidemenu
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
    background-color: #f4f4f5;
  }
</style>
