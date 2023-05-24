<template>
  <form v-if="adminStore.page === 'Travel Info'" class="flex flex-col items-center font-text font-light">
		<h1 class="font-headers font-bold text-3xl pt-4">Add New Travel Info</h1>
		<span class="flex flex-col items-center py-2">
      <label for="subject">Subject</label>
			<input type="text" placeholder="Subject" id="subject" v-model="adminStore.subject" class="px-1">
    </span>
		<span class="flex flex-col items-center py-2">
      <label for="title">Title</label>
			<input type="text" placeholder="Title" id="title" v-model="adminStore.title" class="px-1">
    </span>
    <span class="flex flex-col items-center py-2">
      <label for="intro">Intro</label>
      <textarea placeholder="Intro" id="intro" v-model="adminStore.intro" rows="10" cols="35" class="px-1"></textarea>
    </span>
    <span class="flex flex-col items-center pt-2 pb-4">
      <button class="py-1 bg-custom-blue-500 px-16 text-zinc-50 rounded">Submit</button>
    </span>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAdminStore } from '@/store/adminStore'
import { ref as dataRef, set } from 'firebase/database';
import { db } from '@/main';
import { useNotification } from '@kyvg/vue3-notification';

export default defineComponent({
  setup () {
    const adminStore = useAdminStore();
    const { notify } = useNotification();

    function postCity(city: string, title: string, intro: string) {
      const cityInfoRef = dataRef(db, `cityinfo/${city.split(' ').join('_').toLowerCase()}`);
      const newData = {title: title, intro: intro};
      set(cityInfoRef, newData)
        .then(() => {
          notify({ type: 'success', text: `${city} has been added to the database`})
          adminStore.city = '';
          adminStore.title = '';
          adminStore.intro = '';
        })
        .catch((error) => {
          console.error(error);
          notify({ type: 'error', text: 'An error has occurred'})
        })
    }

    return {
			adminStore: adminStore,
      postCity: postCity
		}
  }
})
</script>

<style scoped>

</style>