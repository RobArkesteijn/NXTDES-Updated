import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAdminStore = defineStore('adminStore', {
  state: () => ({
    page: 'Country',
    country: ref(''),
    city: ref(''),
    subject: ref(''),
    fileName: ref(''),
    title: ref(''),
    intro: ref(''),
    countryList: ref<string[]>([]),
    countryListElement: ref(''),
  }),
  getters: {
    
  },
  actions: {
    changePage(str: string) {
      this.page = str;
    },
    addToCountryList(str: string) {
      this.countryList.push(str);
      this.countryListElement = '';
    },
    deleteFromCountryList(str: string) {
      const index = this.countryList.indexOf(str);
      this.countryList.splice(index, 1);
    }
  }
})