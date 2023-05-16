<template>
  <div id="banner" class="h-[30vh] overflow-hidden border-solid border-b-2 border-zinc-950 flex flex-col bg-center bg-cover bg-no-repeat">
    <span class="h-[7.5vh] w-full flex items-center justify-end">
      <img src="../../dutch.png" alt="Dutch Language" class="h-[35px] w-auto rounded-full duration-[50ms] transition-[border] active:border-zinc-50 active:border-[2px] active:border-solid">
      <img src="../../british.png" alt="English Language" class="h-[35px] w-auto mx-1 rounded-full duration-[50ms] transition-[border] active:border-zinc-50 active:border-[2px] active:border-solid">
    </span>
    <span class="h-[15vh] w-full flex items-center justify-center">
      <h2 v-if="!image" class="text-zinc-950 font-headers text-4xl font-bold">Loading...</h2>
      <h1 v-if="image" class="text-zinc-50 font-headers font-bold text-4xl">{{ path }}</h1>
    </span>
    <span class="h-[7.5vh]"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from 'vue';
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import { firebaseApp, capitalizeFirstLetters } from '@/main';

export default defineComponent({
  data() {
    return {
      image: '' as string,
    }
  },
  computed: {
    path(){
      return capitalizeFirstLetters(this.$route.path.slice(1).split('_').join(' '));
    }
  },
  methods: {
    fetchImage(path: string) {
      const banner = document.getElementById('banner') as HTMLDivElement;
      const storage = getStorage(firebaseApp);
      const storageRef = ref(storage, `${path}.webp`);
      getDownloadURL(storageRef)
        .then((url) => {
          this.image = url;
          banner.style.backgroundImage = `url(${url})`;
        })
        .catch((error) => {
          this.image = '';
          console.log(error);
        });
    }
  },
  mounted() {
    watchEffect(() => {
      const path = this.$route.path.slice(1);
      this.fetchImage(path);
    })
  }
})
</script>

<style scoped>
 h1 {
  text-shadow: 1.5px 1.5px 1px #2B6F87;
 }
</style>