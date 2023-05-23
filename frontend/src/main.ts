import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Home from './components/Home/Home.vue';
import Login from './components/Login/Login.vue';
import TravelInfo from './components/TravelInfo/TravelInfo.vue';
import Destinations from './components/Destinations/Destinations.vue';
import Countries from './components/Countries/Countries.vue';
import Cities from './components/Cities/Cities.vue';
import './assets/tailwind.css'
import { initializeApp } from "firebase/app";
import { getDatabase, get, ref as dataRef } from 'firebase/database';
import Notifications from '@kyvg/vue3-notification'

const app = createApp(App);
app.use(Notifications);

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
export { db, firebaseApp };

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
  },
  {
    path: '/cities',
    component: Cities
  }
];

const travelinfoRef = dataRef(db, 'travelinfo');
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

const countriesRef = dataRef(db, 'countries');
get(countriesRef)
  .then((snapshot) => {
    const data = snapshot.val();
    const countries: string[] = Object.values(data);
    countries.forEach((country) => {
      routes.push({
        path: `/${country.toLowerCase()}`,
        component: Countries
      })
    })
    return countries;
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
    return [];
  });

const destinationRef = dataRef(db, 'upcoming');
get(destinationRef)
  .then((snapshot) => {
    const data = snapshot.val();
    const destinations: string[] = Object.values(data);
    destinations.forEach((destination) => {
      routes.push({
        path: `/${destination.toLowerCase()}`,
        component: Destinations
      })
    })
    return destinations;
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
    return [];
  });

const infoRef = dataRef(db, 'info');
get(infoRef)
  .then((snapshot) => {
    const data = snapshot.val();
    const countries = Object.keys(data);
    const cities: any[] = [];
    countries.forEach((country: string) => {
      cities.push(...Object.values(data[country].list));
    });
    cities.forEach((city: string) => {
      routes.push({
        path: `/${city.split(' ').join('_').toLowerCase()}`,
        component: Cities
      })
    })
    const router = createRouter({
      history: createWebHistory(),
      routes,
    });
    app.use(router).mount('#app');
    return cities;
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
    return [];
  });

export function sortArrayAlphabetically(arr: string[]): string[] {
  return arr.slice().sort((a, b) => a.localeCompare(b));
}

export function capitalizeFirstLetters(str: string): string {
  const words = str.split(" ");
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedWords.join(" ");
}


