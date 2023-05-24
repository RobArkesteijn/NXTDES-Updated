<template>
  <form v-if="adminStore.page === 'Image'" class="flex flex-col items-center font-text font-light">
		<h1 class="font-headers font-bold text-3xl pb-2">Add New Image</h1>
    <span class="flex flex-col items-center pb-4">
      <label for="file-name">File Name</label>
			<input type="text" placeholder="File Name" id="file-name" v-model="adminStore.fileName" class="px-1">
    </span>
		<span class="flex flex-col items-center pb-4">
      <label for="image" class="border-1 border-solid border-zinc-950 inline-block px-[6px] py-3 cursor-pointer w-11/12 rounded bg-custom-blue-400">
			  <input type="file" placeholder="Subject" accept="image/webp" id="subject" ref="fileInput" class="w-full">
      </label>
    </span>
    <span class="flex flex-col items-center pb-4">
      <button class="py-1 bg-custom-blue-500 px-16 text-zinc-50 rounded" @click="uploadImage">Upload</button>
    </span>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useAdminStore } from '@/store/adminStore'
import { ref as storageRef, getStorage, uploadBytes} from 'firebase/storage';
import { firebaseApp } from '@/main';
import { useNotification } from '@kyvg/vue3-notification';

export default defineComponent({
  setup () {
    const adminStore = useAdminStore();
    const { notify } = useNotification();
    const fileInput = ref<any>(null);
    const storage = getStorage(firebaseApp);

    function uploadImage(event: MouseEvent) {
      event.preventDefault();

      const file = fileInput.value.files[0];

      if (file) {
        const storageReference = storageRef(storage, adminStore.fileName || file.name);
        uploadBytes(storageReference, file)
          .then((snapshot) => {
            notify({ type: 'success', text: 'Image uploaded successfully'});
          })
          .catch((error) => {
            console.log(error);
            notify({ type: 'error', text: 'An error has occurred'});
          })
      }
    }

    return {
			adminStore: adminStore,
      fileInput: fileInput,
      uploadImage: uploadImage
		}
  }
})
</script>

<style scoped>
  input#file-upload-button {
    background-color: purple;
  }
</style>