<template>
  <div id="app" @click="closeEverything">
    <div class="navigation-bar aesthetic-bg-gradient">
      <h1 class="logo">Watchable</h1>
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

    <MovieList
      v-for="list in categoriesDB"
      :key="list.name"
      :category="list.name"
      :movies="moviesDB"
      @clickMovie="selectMovie"
    />

    <MovieModal
      v-if="Object.keys(selectedMovie).length"
      :selectedMovie="selectedMovie"
      :categories="categoriesDB"
      :editMode="editMode"
    />
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
      searchTerm: "savages",
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
    async fetchMovies() {
      await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.VUE_APP_API_KEY}&query=${this.searchTerm}`
      )
        .then((movies) => movies.json())
        .then((movies) => {
          this.moviesAPI = movies.results;
          //console.log(movies);
        });
    },
    async getMoviesDB() {
      const docs = await db.collection("movies").get();

      // docs.forEach((movie) => {
      //   console.log("movie: ", movie.id);
      // });

      const movies = docs.docs.map((doc) => {
        return { ...doc.data(), documentId: doc.id };
      });

      this.moviesDB = movies;

      //console.log("this.moviesDB", this.moviesDB);
    },
    async getCategoriesDB() {
      const categories = await db.collection("lists").get();

      // categories.forEach((category) => {
      //   console.log("category: ", category.data());
      // });

      const docs = categories.docs.map((doc) => doc.data());
      this.categoriesDB = docs;
      // console.log("this.moviesDB", this.categoriesDB);
    },
    async addMovie(movie) {
      // inspect the movie to be added
      //console.log("adding movie ", movie);

      // check if movie is already present
      const movieInDB = this.moviePresent(movie.id);
      if (movieInDB) {
        // if it is open edit modal
        //console.log("Open modal");
        this.editMode = true;
        this.selectedMovie = movieInDB;
        this.moviesAPI = [];

        return;
      }
      console.log("Movie is not present. Proceed with adding movie");

      // create new movie object
      const newMovie = {
        id: movie.id,
        title: movie.original_title,
        description: movie.overview,
        posterSrc: `https://image.tmdb.org/t/p/w92/${movie.poster_path}`,
        categories: ["Ohne Kategorie"],
      };
      console.log("newMovie :", newMovie);
      // add movie to database
      //db.collection("movies").add(newMovie);
      this.editMode = false;
      this.selectedMovie = newMovie;
      this.moviesAPI = [];
      //refetch all movies from database
      //this.getMoviesDB();

      // open editing modal
      return;
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
      console.log("movie selected: ", this.selectedMovie);
    },
  },
};
</script>

<style src="@/styles/base.css" />
<style src="@/styles/aesthetic.css" />
