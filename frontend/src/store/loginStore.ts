import { defineStore } from "pinia";
import { ref } from "vue";


export const useLoginStore = defineStore('loginStore', () => {
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const errMsg = ref('');
  const signInType = ref('Login');
  const signInReferral = ref("Don't have an account?");
  const changeSignInType = ref('Sign Up');

  function changeTypeOfSignIn() {
    if (changeSignInType.value === 'Sign Up') {
        signInType.value = 'Sign Up';
        signInReferral.value = 'Already have an account?';
        changeSignInType.value = 'Login';
      } else {
        signInType.value = 'Login';
        signInReferral.value = "Don't have an account?";
        changeSignInType.value = 'Sign Up';
      }
  };

  function resetLoginState() {
    name.value = '';
    email.value = '';
    password.value = '';
    errMsg.value = '';
    signInType.value = 'Login';
    signInReferral.value = "Don't have an account?";
    changeSignInType.value = 'Sign Up';
  }

  return {
    name: name,
    email: email,
    password: password,
    errMsg: errMsg,
    signInType: signInType,
    signInReferral: signInReferral,
    changeSignInType: changeSignInType,
    changeTypeOfSignIn: changeTypeOfSignIn,
    resetLoginState: resetLoginState
  }
})