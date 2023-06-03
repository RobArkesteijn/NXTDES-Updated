import { defineStore } from "pinia";
import { ref } from 'vue';

export const useHomeStore = defineStore('homeStore', () => {
  const image = ref('');
	const list = ref<string[]>([]);
	const indexList = ref<any[]>([]);

	return {
		image: image,
		list: list,
		indexList: indexList
	}
})