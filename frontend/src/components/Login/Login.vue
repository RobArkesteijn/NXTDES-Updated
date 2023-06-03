<template>
  <div class="h-full w-full flex flex-col justify-center items-center bg-custom-blue-500 text-zinc-50">
    <h1 class="font-logo text-4xl">NXTDES</h1>
    <h2 class="font-headers text-2xl mb-2">travelling, history, culture, city & nature</h2>
    <div class="w-4/5 min-h-[40vh] bg-zinc-100 mt-2 rounded text-zinc-950 flex flex-col justify-center items-center">
        <form class="flex flex-col items-center font-text font-light">
          <span v-if="loginStore.signInType === 'Sign Up'" class="flex flex-col items-center py-2">
            <label for="name">Name</label>
            <input type="text" placeholder="Name" id="name" v-model="loginStore.name" class="px-1">
          </span>
          <span class="flex flex-col items-center py-2">
            <label for="email">Email</label>
            <input type="text" placeholder="Email" id="email" v-model="loginStore.email" class="px-1">
          </span>
          <span class="flex flex-col items-center py-2">
            <label for="password">Password</label>
            <input type="password" placeholder="Password" id="password" v-model="loginStore.password" class="px-1">
          </span>
          <p v-if="loginStore.errMsg" class="text-red-600">{{ loginStore.errMsg }}</p> 
          <span class="flex flex-col items-center pt-2 pb-4">
            <button type="submit" class="py-1 bg-custom-blue-500 px-16 text-zinc-50 rounded" @click="registerOrLogin">{{loginStore.signInType}}</button>
          </span>
        </form>
        <button class="bg-custom-blue-500 px-4 py-2 text-zinc-50 rounded mb-4" @click="signInWithGoogle"><i class="fa-brands fa-google mr-2"></i>Sign In With Google</button>
    </div>
    <span class="flex mt-2">
      <p class="mr-1">{{loginStore.signInReferral}}</p>
      <p class="ml-1 underline" @click="loginStore.changeTypeOfSignIn">{{loginStore.changeSignInType}}</p>
    </span>
    <button class="mt-4 bg-zinc-100 py-1 px-4 rounded text-zinc-950 text-2xl font-bold font-headers" @click="redirectForGuest">Enter as guest</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { useLoginStore } from '@/store/loginStore';
import { useStore } from '@/store/store';


export default defineComponent({
  setup() {
    const router = useRouter();
    const loginStore = useLoginStore();
    const store = useStore();

    const isLoggedIn = computed(() => store.user !== null);

    watch(isLoggedIn, () => {
      if (isLoggedIn.value) {
        router.push('/home');
      }
      console.log(isLoggedIn.value);
    })

    function register(event: MouseEvent) {
      event.preventDefault();
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, loginStore.email, loginStore.password)
          .then((userCredential) => {
            const user = userCredential.user;
            return updateProfile(user, { displayName: loginStore.name })
          })
          .then((data) => {
            console.log('Succesfully registered');
            router.push('/home');
            loginStore.resetLoginState();
            store.notify({ type: 'success', text: 'Registered Successfully'});
          })
          .catch((error) => {
            console.log(error);
            switch (error.code) {
              case "auth/invalid-email":
                loginStore.errMsg = "Invalid email";
                break;
              case "auth/user-not-found":
                loginStore.errMsg = "No account with that email was found";
                break;
              case "auth/wrong-password":
                loginStore.errMsg = "Incorrect password";
                break; 
              case "auth/user-disabled":
                loginStore.errMsg = "Email or password was incorrect";
                break;
              case "auth/email-already-in-use":
                loginStore.errMsg = "This email already has an account"
                break;
              case "auth/weak-password":
                loginStore.errMsg = "Password should be at least six characters"
                break;
            }
        });
      };

    function login(event: MouseEvent) {
      event.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, loginStore.email, loginStore.password)
          .then((data) => {
            console.log('Succesfully logged in');
            router.push('/home');
            loginStore.resetLoginState();
            store.notify({ type: 'success', text: 'Logged In Successfully'});
          })
          .catch((error) => {
            console.log(error);
            switch (error.code) {
              case "auth/invalid-email":
                loginStore.errMsg = "Invalid email";
                break;
              case "auth/user-not-found":
                loginStore.errMsg = "No account with that email was found";
                break;
              case "auth/wrong-password":
                loginStore.errMsg = "Incorrect password";
                break; 
              case "auth/user-disabled":
                loginStore.errMsg = "Email or password was incorrect";
                break;   
            }
          });
    };

    function registerOrLogin(event: MouseEvent) {
      if (loginStore.signInType === 'Login') {
        login(event);
      } else {
        register(event);
      }
    };

    function signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          console.log(result.user);
          router.push('/home');
          loginStore.resetLoginState();
          store.notify({ type: 'success', text: 'Logged In Successfully'});
        })
        .catch((error) => {
          console.log(error);
        })
    };

    function redirectForGuest() {
      router.push('/home');
      loginStore.resetLoginState();
    }

    return {
      loginStore: loginStore,
      registerOrLogin: registerOrLogin,
      signInWithGoogle: signInWithGoogle,
      redirectForGuest: redirectForGuest
    }
  },
})
</script>

<style scoped>

</style>