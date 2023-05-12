import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Home from './components/Home/Home.vue';
import Login from './components/Login/Login.vue';
import TravelInfo from './components/TravelInfo.vue';
import Destinations from './components/Destinations.vue';
import Countries from './components/Countries.vue';
import './assets/tailwind.css'
import { initializeApp } from "firebase/app";
import { getDatabase, get, ref } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCCZJkv-2SlOrpefwE42iVsnWu2XZeYW5Q",
  authDomain: "nxtdes-a13c5.firebaseapp.com",
  databaseURL: 'https://nxtdes-a13c5-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: "nxtdes-a13c5",
  storageBucket: "nxtdes-a13c5.appspot.com",
  messagingSenderId: "1096872603179",
  appId: "1:1096872603179:web:b36d01a8131a8f2728c46e",
  measurementId: "G-K70F3YMNRE"
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
export { db };

const routes = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/info',
    component: TravelInfo
  },
  {
    path: '/countries',
    component: Countries
  },
  {
    path: '/destinations',
    component: Destinations
  }
];

const travelinfoRef = ref(db, 'travelinfo');
get(travelinfoRef)
  .then((snapshot) => {
    const data = snapshot.val();
    const travelinfo: string[] = Object.values(data);
    travelinfo.forEach((info) => {
      routes.push({
        path: `/${info.split(' ').join('_').toLowerCase()}`,
        component: TravelInfo
      })
    })
    return travelinfo;
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
    return [];
  });

const countriesRef = ref(db, 'countries');
get(countriesRef)
  .then((snapshot) => {
    const data = snapshot.val();
    const countries: string[] = Object.values(data);
    countries.forEach((country) => {
      routes.push({
        path: `/${country}`,
        component: Countries
      })
    })
    return countries;
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
    return [];
  });

const destinationRef = ref(db, 'upcoming');
get(destinationRef)
  .then((snapshot) => {
    const data = snapshot.val();
    const destinations: string[] = Object.values(data);
    destinations.forEach((destination) => {
      routes.push({
        path: `/${destination}`,
        component: Destinations
      })
    })
    const router = createRouter({
      history: createWebHistory(),
      routes,
    });
    createApp(App).use(router).mount('#app');
    return destinations;
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
    return [];
  });


