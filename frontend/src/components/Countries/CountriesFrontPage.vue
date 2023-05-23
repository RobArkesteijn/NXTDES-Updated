<template>
  <div class="w-full min-h-[50vh] flex justify-center">
    <div class="flex flex-col w-[85vw] text-center py-4">
      <h1 class="font-headers font-bold text-3xl pb-4">{{ title }}</h1>
      <hr>
      <p class="py-4 font-text font-light leading-7 text-left">{{ intro }}</p>
      <h2 class="font-headers font-bold text-2xl pb-2">List of sights: </h2>
      <ul v-if="list" class="grid justify-items-center" :class="{'grid-cols-1': list.length < 2, 'grid-cols-2': list.length > 1}">
        <li v-for="item in list" :key="item" class="bg-custom-blue-500 px-2 py-1 min-w-[40vw] my-2 font-headers font-bold text-xl text-zinc-50 border-zinc-950 border-[1px] border-solid rounded cursor-pointer"><router-link :to="item.split(' ').join('_').toLowerCase()">{{ item }}</router-link></li>
      </ul>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { get, ref as dataRef } from 'firebase/database';
import { db, sortArrayAlphabetically } from '@/main';

interface cityList {
  id: string,
  country: string
}

export default defineComponent({
  setup() {
    const title = ref('');
    const intro = ref('');
    const list = ref<string[] | null>(null);
    const route = useRoute();

    const path = computed(() => route.path.slice(1));

    watchEffect(() => {
      fetchData();
    })

    function fetchData() {
      const path = route.path.slice(1)
      const infoRef = dataRef(db, 'info');
      get(infoRef)
        .then((snapshot) => {
          const data = snapshot.val();
          title.value = data[path].title;
          intro.value = data[path].intro;
          list.value = sortArrayAlphabetically(Object.values(data[path].list));
        })
        .catch((error) => {
          console.log(error);
        })
    }

    return {
      title: title,
      intro: intro,
      list: list
    }
  },
})
</script>

<style scoped>

</style>