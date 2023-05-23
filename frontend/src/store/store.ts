import { defineStore } from "pinia";

export const useStore = defineStore('store', {
  state: () => ({
    isOpen: false,
  }),
  getters: {
    
  },
  actions: {
    openSidemenu() {
      this.isOpen = !this.isOpen;
    }
  }
})