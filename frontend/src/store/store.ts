import { defineStore } from "pinia";
import { useNotification } from '@kyvg/vue3-notification';
import { useRoute } from "vue-router";
import { getAuth, User, onAuthStateChanged } from 'firebase/auth';
import { ref, computed, onBeforeMount } from 'vue';

export const useStore = defineStore('store', () => {
  const isOpen = ref(false);
  const user = ref<User | null>(null);
  const route = useRoute();
  const { notify } = useNotification();

  const path = computed(() => route.path.slice(1));

  onBeforeMount(() => {
    onAuthStateChanged(getAuth(), (currentUser) => {
      if (currentUser) {
        user.value = currentUser;
      }
    })    
  })

  function openSidemenu() {
    isOpen.value = !isOpen.value
  }

  function resetStore() {
    isOpen.value = false;
    user.value = null;
  }

  return {
    isOpen: isOpen,
    user: user,
    path: path,
    notify: notify,
    openSidemenu: openSidemenu,
    resetStore: resetStore
  }
})