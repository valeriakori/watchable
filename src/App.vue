<template>
  <div id="app" @click="moviesAPI = null">
    <div class="navigation-bar aesthetic-bg-gradient">
      <h1 class="logo">Watchable</h1>
      <div class="input-wrapper">
        <input
          class="aesthetic-windows-xp-text-input"
          type="text"
          v-model="searchTerm"
        />
        <button @click="fetchMovies" class="aesthetic-arizona-blue-bg-color">
          Search
        </button>
        <div class="search-results">
          <ul class="aesthetic-windows-95-taskbar-start-menu is-active">
            <li
              class="aesthetic-windows-95-taskbar-start-menu-item"
              v-for="movie in moviesAPI"
              :key="movie.id"
            >
              <button>{{ movie.title }}</button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <ul v-for="movie in moviesDB" :key="movie.id">
      <li>{{ movie.title }}</li>
    </ul>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { db } from "@/firebase/firebase.js";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data() {
    return {
      searchTerm: "Titanic",
      moviesDB: {},
      moviesAPI: [],
    };
  },
  async mounted() {
    const movies = await db.collection("movies").get();

    console.log(
      movies.forEach((movie) => {
        console.log("movie: ", movie.data());
      })
    );

    const docs = movies.docs.map((doc) => doc.data());
    this.moviesDB = docs;
    console.log("this.moviesDB", this.moviesDB);
  },
  methods: {
    async fetchMovies() {
      await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.VUE_APP_API_KEY}&query=${this.searchTerm}`
      )
        .then((movies) => movies.json())
        .then((movies) => {
          this.moviesAPI = movies.results;
          console.log(movies);
        });
    },
  },
};
</script>

<style scoped src="@/styles/aesthetic.css" />
<style src="@/styles/base.css" />
