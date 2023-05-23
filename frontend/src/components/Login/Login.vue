<template>
  <div class="h-full w-full flex flex-col justify-center items-center bg-custom-blue-500 text-zinc-50">
    <h1 class="font-logo text-4xl">NXTDES</h1>
    <h2 class="font-headers text-2xl mb-2">travelling, history, culture, city & nature</h2>
    <div class="w-4/5 min-h-[40vh] bg-zinc-100 mt-2 rounded text-zinc-950 flex flex-col justify-center items-center">
        <form class="flex flex-col items-center font-text font-light">
          <span v-if="buttonType === 'Sign Up'" class="flex flex-col items-center py-2">
            <label for="name">Name</label>
            <input type="text" placeholder="Name" id="name" v-model="name" class="px-1">
          </span>
          <span class="flex flex-col items-center py-2">
            <label for="email">Email</label>
            <input type="text" placeholder="Email" id="email" v-model="email" class="px-1">
          </span>
          <span class="flex flex-col items-center py-2">
            <label for="password">Password</label>
            <input type="password" placeholder="Password" id="password" v-model="password" class="px-1">
          </span>
          <p v-if="errMsg" class="text-red-600">{{ errMsg }}</p> 
          <span class="flex flex-col items-center pt-2 pb-4">
            <button type="submit" class="py-1 bg-custom-blue-500 px-16 text-zinc-50 rounded" @click="registerOrLogin">{{buttonType}}</button>
          </span>
        </form>
        <button class="bg-custom-blue-500 px-4 py-2 text-zinc-50 rounded mb-4" @click="signInWithGoogle"><i class="fa-brands fa-google mr-2"></i>Sign In With Google</button>
    </div>
    <span class="flex mt-2">
      <p class="mr-1">{{changeText}}</p>
      <p class="ml-1 underline" @click="changeButtonType">{{changeButton}}</p>
    </span>
    <button class="mt-4 bg-zinc-100 py-1 px-4 rounded text-zinc-950 text-2xl font-bold font-headers" @click="redirectForGuest">Enter as guest</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { useNotification } from '@kyvg/vue3-notification';


export default defineComponent({
  setup() {
    const router = useRouter();
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const errMsg = ref('');
    const buttonType = ref('Login');
    const changeText = ref("Don't have an account?")
    const changeButton = ref('Sign up');
    const { notify } = useNotification();

    onBeforeMount(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          router.push('/home');
        }
      });
    });

    function changeButtonType() {
      if (changeButton.value === 'Sign Up') {
          buttonType.value = 'Sign Up';
          changeText.value = 'Already have an account?';
          changeButton.value = 'Login';
        } else {
          buttonType.value = 'Login';
          changeText.value = "Don't have an account?";
          changeButton.value = 'Sign Up';
        }
    };

    function register(event: MouseEvent) {
      event.preventDefault();
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email.value, password.value)
          .then((userCredential) => {
            const user = userCredential.user;
            return updateProfile(user, { displayName: name.value })
          })
          .then((data) => {
            console.log('Succesfully registered');
            console.log(auth.currentUser);
            router.push('/home');
            notify({ type: 'success', text: 'Registered Successfully'});
          })
          .catch((error) => {
            console.log(error);
            switch (error.code) {
              case "auth/invalid-email":
                errMsg.value = "Invalid email";
                break;
              case "auth/user-not-found":
                errMsg.value = "No account with that email was found";
                break;
              case "auth/wrong-password":
                errMsg.value = "Incorrect password";
                break; 
              case "auth/user-disabled":
                errMsg.value = "Email or password was incorrect";
                break;
              case "auth/email-already-in-use":
                errMsg.value = "This email already has an account"
                break;
              case "auth/weak-password":
                errMsg.value = "Password should be at least six characters"
                break;
            }
        });
      };

    function login(event: MouseEvent) {
      event.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email.value, password.value)
          .then((data) => {
            console.log('Succesfully logged in');
            console.log(auth.currentUser);
            router.push('/home');
            notify({ type: 'success', text: 'Logged In Successfully'});
          })
          .catch((error) => {
            console.log(error);
            switch (error.code) {
              case "auth/invalid-email":
                errMsg.value = "Invalid email";
                break;
              case "auth/user-not-found":
                errMsg.value = "No account with that email was found";
                break;
              case "auth/wrong-password":
                errMsg.value = "Incorrect password";
                break; 
              case "auth/user-disabled":
                errMsg.value = "Email or password was incorrect";
                break;   
            }
          });
    };

    function registerOrLogin(event: MouseEvent) {
      if (buttonType.value === 'Login') {
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
          notify({ type: 'success', text: 'Logged In Successfully'});
        })
        .catch((error) => {
          console.log(error);
        })
    };

    function redirectForGuest() {
      router.push('/home');
    }

    return {
      name: name,
      email: email,
      password: password,
      errMsg: errMsg,
      buttonType: buttonType,
      changeText: changeText,
      changeButton: changeButton,
      registerOrLogin: registerOrLogin,
      changeButtonType: changeButtonType,
      signInWithGoogle: signInWithGoogle,
      redirectForGuest: redirectForGuest
    }
  },
    // data() {
    //   return {
    //     router: useRouter(),
    //     name: ref(''),
    //     email: ref(''),
    //     password: ref(''),
    //     errMsg: ref(),
    //     buttonType: 'Login',
    //     changeText: "Don't have an account?",
    //     changeButton: 'Sign Up'
    //   }
    // },
    // methods: {
    //   changeButtonType() {
    //     if (this.changeButton === 'Sign Up') {
    //       this.buttonType = 'Sign Up';
    //       this.changeText = 'Already have an account?';
    //       this.changeButton = 'Login';
    //     } else {
    //       this.buttonType = 'Login';
    //       this.changeText = "Don't have an account?";
    //       this.changeButton = 'Sign Up';
    //     }
    //   },
    //   register(event: MouseEvent) {
    //     event.preventDefault();
    //     const auth = getAuth()
    //     createUserWithEmailAndPassword(auth, this.email, this.password)
    //       .then((userCredential) => {
    //         const user = userCredential.user;
    //         return updateProfile(user, { displayName: this.name })
    //       })
    //       .then((data) => {
    //         console.log('Succesfully registered');
    //         console.log(auth.currentUser);
    //         this.router.push('/home');
    //         this.$notify({ type: 'success', text: 'Registered Successfully'});
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         switch (error.code) {
    //           case "auth/invalid-email":
    //             this.errMsg = "Invalid email";
    //             break;
    //           case "auth/user-not-found":
    //             this.errMsg = "No account with that email was found";
    //             break;
    //           case "auth/wrong-password":
    //             this.errMsg = "Incorrect password";
    //             break; 
    //           case "auth/user-disabled":
    //             this.errMsg = "Email or password was incorrect";
    //             break;
    //           case "auth/email-already-in-use":
    //             this.errMsg = "This email already has an account"
    //             break;
    //           case "auth/weak-password":
    //             this.errMsg = "Password should be at least six characters"
    //             break;
    //         }
    //       })
    //   },
    //   login(event: MouseEvent) {
    //     event.preventDefault();
    //     const auth = getAuth();
    //     signInWithEmailAndPassword(auth, this.email, this.password)
    //       .then((data) => {
    //         console.log('Succesfully logged in');
    //         console.log(auth.currentUser);
    //         this.router.push('/home');
    //         this.$notify({ type: 'success', text: 'Logged In Successfully'});
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         switch (error.code) {
    //           case "auth/invalid-email":
    //             this.errMsg = "Invalid email";
    //             break;
    //           case "auth/user-not-found":
    //             this.errMsg = "No account with that email was found";
    //             break;
    //           case "auth/wrong-password":
    //             this.errMsg = "Incorrect password";
    //             break; 
    //           case "auth/user-disabled":
    //             this.errMsg = "Email or password was incorrect";
    //             break;   
    //         }
    //       })
    //   },
    //   registerOrLogin(event: MouseEvent) {
    //     if (this.buttonType === 'Login') {
    //       this.login(event);
    //     } else {
    //       this.register(event);
    //     }
    //   },
    //   signInWithGoogle() {
    //     const provider = new GoogleAuthProvider();
    //     signInWithPopup(getAuth(), provider)
    //       .then((result) => {
    //         console.log(result.user);
    //         this.router.push('/home');
    //         this.$notify({ type: 'success', text: 'Logged In Successfully'});
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       })
    //   },
    //   redirectForGuest() {
    //     this.router.push('/home');
    //   }
    // },
    // mounted() {
    //   onAuthStateChanged(getAuth(), (user) => {
    //   if (user) {
    //     this.router.push('/home');
    //   }
    // });
    // }
})
</script>

<style scoped>

</style>