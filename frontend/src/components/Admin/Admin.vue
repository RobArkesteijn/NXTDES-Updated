<template>
	<div class="w-full h-full bg-custom-blue-500 flex flex-col items-center justify-center">
		<h1 class="font-logo text-zinc-50 text-4xl mb-2 cursor-pointer"><router-link to="/home">NXTDES</router-link></h1>
		<AdminNav />
		<div class="w-4/5 min-h-[40vh] bg-zinc-100 mt-2 rounded text-zinc-950 flex flex-col justify-center items-center">
			<AdminCountryForm />
			<AdminCityForm />
			<AdminTravelInfoFormVue />
			<AdminImageForm />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AdminNav from './AdminNav.vue';
import AdminCountryForm from './AdminCountryForm.vue';
import AdminCityForm from './AdminCityForm.vue';
import AdminTravelInfoFormVue from './AdminTravelInfoForm.vue';
import AdminImageForm from './AdminImageForm.vue';
export default defineComponent({
  components: {
		AdminNav,
		AdminCountryForm,
		AdminCityForm,
		AdminTravelInfoFormVue,
		AdminImageForm
	}
})
</script>

<style scoped>

</style>