<template>
  <div class="w-full min-h-[50vh] flex justify-center">
    <div class="flex flex-col w-[85vw] text-center py-4">
      <h1 class="font-headers font-bold text-3xl">{{ title }}</h1>
      <p class="py-4">{{ intro }}</p>
      <h2 class="font-headers font-bold text-2xl">List of sights: </h2>
      <ul class="flex flex-col items-center">
        <li v-for="item in list" :key="item" class="bg-custom-blue-500 px-2 py-1 min-w-[30vw] my-2 text-zinc-50 border-zinc-950 border-[1px] border-solid rounded cursor-pointer"><router-link :to="item.split(' ').join('_').toLowerCase()">{{ item }}</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from 'vue';
import { get, ref as dataRef } from 'firebase/database';
import { db, sortArrayAlphabetically } from '@/main';

interface cityList {
  id: string,
  country: string
}

export default defineComponent({
  data() {
    return {
      title: '' as string,
      intro: '' as string,
      list: null as string[] | null,
    }
  },
  methods: {
    fetchData() {
      const path = this.$route.path.slice(1)
      const infoRef = dataRef(db, 'info');
      get(infoRef)
        .then((snapshot) => {
          const data = snapshot.val();
          this.title = data[path].title;
          this.intro = data[path].intro;
          this.list = sortArrayAlphabetically(Object.values(data[path].list));
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