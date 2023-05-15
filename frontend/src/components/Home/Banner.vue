<template>
  <div class="h-[30vh] overflow-hidden border-solid border-b-2 border-zinc-950 flex justify-center items-center">
    <img v-if="imagePath" :src="imagePath" alt="Banner for this website" class="min-w-[auto] h-full object-contain">
    <h2 v-if="!imagePath" class="text-red-600">No image found</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import { firebaseApp } from '@/main';

export default defineComponent({
  data() {
    return {
      image: '' as string,
    }
  },
  computed: {
    path() {
      return useRoute().path.slice(1);
    },
    imagePath(): any {
      const storage = getStorage(firebaseApp);
      const storageRef = ref(storage, `${this.path}.webp`);
      getDownloadURL(storageRef)
        .then((url) => {
          this.image = url;
        })
        .catch((error) => {
          this.image = '';
          console.log(error);
        });
      return this.image;
    },
  }
})
</script>

<style scoped>

</style>