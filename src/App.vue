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
                <button @click.prevent="addMovie(movie)">
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
      const movies = await db.collection("movies").get();

      // movies.forEach((movie) => {
      //   console.log("movie: ", movie.data());
      // });

      const docs = movies.docs.map((doc) => doc.data());
      this.moviesDB = docs;
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
      if (this.moviePresent(movie.id)) {
        // if it is open edit modal
        //console.log("Open modal");

        return;
      }
      console.log("adding new movie");

      // create movie object
      const newMovie = {
        id: movie.id,
        title: movie.original_title,
        description: movie.overview,
        posterSrc: `https://image.tmdb.org/t/p/w92/${movie.poster_path}`,
        categories: ["Ohne Kategorie"],
      };

      // add movie to database
      db.collection("movies").add(newMovie);

      this.selectedMovie = newMovie;

      //refetch all movies from database
      this.getMoviesDB();

      // open editing modal
    },
    moviePresent(movieToAddId) {
      console.log("checking presence");

      for (let i = 0; i < this.moviesDB.length; i++) {
        if (this.moviesDB[i].id == movieToAddId) {
          console.log("IS present");
          return true;
        }
      }
      console.log("Movie is not present. Proceed with adding movie");

      return false;
    },
    closeEverything() {
      this.moviesAPI = [];
      this.selectedMovie = {};
    },
    selectMovie(movie) {
      this.selectedMovie = movie;
      console.log("this.selectedMovie: ", this.selectedMovie);
    },
  },
};
</script>

<style src="@/styles/base.css" />
<style src="@/styles/aesthetic.css" />
