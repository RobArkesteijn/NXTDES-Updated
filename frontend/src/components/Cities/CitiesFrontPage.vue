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
import { defineComponent, watchEffect, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { get, ref as dataRef } from 'firebase/database';
import { db } from '@/main';

export default defineComponent({
  setup() {
    const title = ref('');
    const intro = ref('');
    const route = useRoute();

    const path = computed(() => route.path.slice(1));

    watchEffect(() => {
      fetchData();
    })

    function fetchData() {
      const path = route.path.slice(1)
      const infoRef = dataRef(db, 'cityinfo');
      get(infoRef)
        .then((snapshot) => {
          const data = snapshot.val();
          title.value = data[path].title;
          intro.value = data[path].intro;
        })
        .catch((error) => {
          console.log(error);
        })
    }

    return {
      title: title,
      intro: intro
    }
  },
})
</script>

<style scoped>

</style>