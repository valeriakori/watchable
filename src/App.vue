<template>
  <div id="app" @click="closeEverything">
    <div class="navigation-bar aesthetic-bg-gradient">
      <h1 class="logo">Watchable</h1>
      <font-awesome-icon icon="fa-solid fa-baby-carriage" />
      <i class="fa-solid fa-baby"></i>
      <div class="input-wrapper">
        <div class="search-wrapper">
          <input
            class="aesthetic-windows-xp-text-input"
            type="text"
            v-model="searchTerm"
          />
          <div class="search-results aesthetic-windows-xp-dropdown">
            <ul
              class="aesthetic-windows-xp-dropdown-menu"
              :class="{ 'is-active': moviesAPI.length }"
            >
              <li
                class="aesthetic-windows-xp-dropdown-menu-item"
                v-for="movie in moviesAPI"
                :key="movie.id"
              >
                <button @click.stop="addMovie(movie)">
                  {{ movie.title }}
                </button>
              </li>
            </ul>
          </div>
        </div>
        <button @click="fetchMovies" class="aesthetic-arizona-blue-bg-color">
          Search
        </button>
      </div>
    </div>

    <MovieList />

    <MovieModal />
  </div>
</template>

<script>
import MovieList from "./components/MovieList.vue";
import MovieModal from "./components/MovieModal.vue";
import { db } from "@/firebase/firebase.js";

export default {
  name: "App",
  components: {
    MovieList,
    MovieModal,
  },
  data() {
    return {
      searchTerm: "",
      moviesDB: [],
      categoriesDB: [],
      moviesAPI: [],
      selectedMovie: {},
      editMode: false,
    };
  },
  async mounted() {
    this.getCategoriesDB();
    this.getMoviesDB();
  },
  methods: {
    // 2. READ categories from firestore
    async getCategoriesDB() {},
    // 3. READ movies from database
    async getMoviesDB() {},
    // 4. READ movies from TMDB
    async fetchMovies() {},
    // 5. CREATE new movie
    async addMovie(movie) {},
    async saveNewMovie() {},
    //6. UPDATE existing movie

    async saveChanges() {},
    // 7. DELETE movie
    async deleteMovie() {},

    //utility functions
    cancel() {
      this.selectedMovie = {};
      this.getMoviesDB();
    },
    moviePresent(movieToAddId) {
      console.log("checking presence");

      for (let i = 0; i < this.moviesDB.length; i++) {
        if (this.moviesDB[i].id == movieToAddId) {
          console.log("IS present");
          return this.moviesDB[i];
        }
      }
      return false;
    },
    closeEverything() {
      this.moviesAPI = [];
      this.selectedMovie = {};
    },
    selectMovie(movie) {
      this.selectedMovie = movie;
      this.moviesAPI = [];
      this.editMode = true;
      //console.log("movie selected: ", this.selectedMovie);
    },
  },
};
</script>

<style src="@/styles/base.css" />
<style src="@/styles/aesthetic.css" />
