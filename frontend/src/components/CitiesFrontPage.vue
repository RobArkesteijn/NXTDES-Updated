<template>
  <div class="w-full min-h-[50vh] flex justify-center">
    <div class="flex flex-col w-[85vw] text-center py-4">
      <h1 class="font-headers font-bold text-3xl pb-4">{{ title }}</h1>
      <hr>
      <p class="py-4 font-text font-light text-left leading-7">{{ intro }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from 'vue';
import { get, ref as dataRef } from 'firebase/database';
import { db } from '@/main';

export default defineComponent({
  data() {
    return {
      title: '' as string,
      intro: '' as string,
    }
  },
  methods: {
    fetchData() {
      const path = this.$route.path.slice(1)
      const infoRef = dataRef(db, 'cityinfo');
      get(infoRef)
        .then((snapshot) => {
          const data = snapshot.val();
          this.title = data[path].title;
          this.intro = data[path].intro;
        })
        .catch((error) => {
          console.log(error);
        })
    }
  },
  mounted() {
    watchEffect(() => {
      const path = this.$route.path.slice(1);
      this.fetchData();
    })
  },
})
</script>

<style scoped>

</style>