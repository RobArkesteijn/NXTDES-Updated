<template>
  <div class="min-h-[50vh] w-full flex flex-col items-center">
    <h1 class="font-headers font-bold text-3xl my-2">Overview</h1>
    <ul class="bg-custom-blue-500 p-5 rounded border-[1.5px] border-zinc-950 border-solid">
      <li v-for="(item, index) in list" @click="scrollToElement(index)" class="text-white font-headers font-bold text-xl tracking-wide cursor-pointer my-1 p-px select-none">- {{ item[0] }}</li>
    </ul>
    <span v-for="(item, index) in list" class="w-[80vw] flex flex-col items-center text-center" :id="`item${index}`">
      <h1 class="font-headers font-bold text-3xl mt-4 mb-2">{{ item[0] }}</h1>
      <p class="text-left mt-2 mb-4 font-light font-text">{{ item[1].intro }}</p>
      <ul class="text-left">
        <li v-for="(value, key) in item[1].list" :key="key" class="mb-8">
          <h2 class="font-headers font-bold text-2xl my-2">- {{ key }}</h2>
          <p class="font-text font-light">{{ value }}</p>
        </li>
      </ul>
      <p class="font-text font-light text-left mb-4">{{ item[1].outro }}</p>
      <div v-if="index !== list.length - 1" class="w-full h-[1px] bg-zinc-200 my-4"></div>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watchEffect, ref } from 'vue';
import { useRoute } from 'vue-router';
import { get, ref as dataRef } from 'firebase/database';
import { db } from '@/main';

export default defineComponent({
  setup() {
    const list = ref<any[]>([]);
    const route = useRoute();

    const path = computed(() => route.path.slice(1));

    watchEffect(() => {
      fetchData();
    });

    function fetchData() {
      const infoRef = dataRef(db, `travelcontent/${path.value}`);
      get(infoRef)
        .then((snapshot) => {
          const data = snapshot.val();
          list.value = Object.entries(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function scrollToElement(id: number) {
      const elementId = `item${id}`;
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    return {
      list,
      scrollToElement,
    };
  },
  // data() {
  //   return {
  //     list: [] as any[],
  //   }
  // },
  // methods: {
  //   fetchData() {
  //     const path = this.$route.path.slice(1);
  //     const infoRef = dataRef(db, `travelcontent/${path}`);
  //     get(infoRef)
  //       .then((snapshot) => {
  //         const data = snapshot.val();
  //         this.list = [];
  //         this.list.push(...Object.entries(data));
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       })
  //   },
  //   scrollToElement(id: number) {
  //     const elementId = `item${id}`;
  //     const element = document.getElementById(elementId);
  //     if (element) {
  //       element.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }
  // },
  // mounted() {
  //   watchEffect(() => {
  //     const path = this.$route.path.slice(1);
  //     this.fetchData();
  //   })
  // },
})
</script>

<style scoped>

</style>