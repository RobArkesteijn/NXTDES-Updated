<template>
  <form v-if="adminStore.page === 'Country'" class="flex flex-col items-center font-text font-light">
		<h1 class="font-headers font-bold text-3xl pt-4">Add New Country</h1>
		<span class="flex flex-col items-center py-2">
      <label for="country">Country</label>
			<input type="text" placeholder="Country" id="country" v-model="adminStore.country" class="px-1">
    </span>
		<span class="flex flex-col items-center py-2">
      <label for="intro">List</label>
			<span class="flex">
				<input type="text" v-model="adminStore.countryListElement" placeholder="Sight" class="px-1" />
				<p class="ml-2 bg-custom-blue-500 px-1 text-zinc-50 rounded text-sm flex items-center" @click="adminStore.addToCountryList(adminStore.countryListElement)">Add</p>
			</span>
			<ul v-if="adminStore.countryList.length !== 0" class="grid gap-2 justify-items-center mt-4" :class="{'grid-cols-1': adminStore.countryList.length === 1, 'grid-cols-2': adminStore.countryList.length > 1}">
        <span v-for="(element, index) in adminStore.countryList" class="bg-custom-blue-500 rounded py-1 px-2 w-32 flex items-center justify-center">
    		  <li :key="index" class="text-zinc-50 basis-full">{{ element }}</li>
          <i class="fa-solid fa-xmark ml-2 text-sm text-red-400" @click="adminStore.deleteFromCountryList(element)"></i>
        </span>
  		</ul>
    </span>
		<span class="flex flex-col items-center py-2">
      <label for="title">Title</label>
			<input type="text" placeholder="Title" id="title" v-model="adminStore.title" class="px-1">
    </span>
    <span class="flex flex-col items-center py-2">
      <label for="intro">Intro</label>
      <textarea placeholder="Intro" id="intro" v-model="adminStore.intro" rows="10" cols="30" class="px-1"></textarea>
    </span>
    <span class="flex flex-col items-center pt-2 pb-4">
      <button @click="postCountry(adminStore.country, adminStore.countryList, adminStore.title, adminStore.intro)" class="py-1 bg-custom-blue-500 px-16 text-zinc-50 rounded">Submit</button>
    </span>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAdminStore } from '@/store/adminStore'
import { ref as dataRef, set, push } from 'firebase/database';
import { db } from '@/main';
import { useNotification } from '@kyvg/vue3-notification';

export default defineComponent({
  setup () {
    const adminStore = useAdminStore();
    const { notify } = useNotification();

    function postCountry(country: string, list: string[], title: string, intro: string) {
      const countryRef = dataRef(db, 'countries');
      push(countryRef, country);
      const infoRef = dataRef(db, `info/${country.toLowerCase()}`);
      const newData = {title: title, intro: intro, list: list};
      set(infoRef, newData)
        .then(() => {
          notify({ type: 'success', text: `${country} has been added to the database`});
          adminStore.country = '';
          adminStore.countryList = [];
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
      postCountry: postCountry
		}
  }
})
</script>

<style scoped>

</style>