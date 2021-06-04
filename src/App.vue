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
      @saveChanges="saveChanges"
      @saveNewMovie="saveNewMovie"
      @cancel="cancel"
      @deleteMovie="deleteMovie"
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
    async getCategoriesDB() {
      const docReferences = await db.collection("lists").get();

      // docReferences.forEach((category) => {
      //   console.log("category: ", category.data());
      // });

      const categories = docReferences.docs.map((doc) => doc.data());
      this.categoriesDB = categories;
      // console.log("this.moviesDB", this.categoriesDB);
    },
    // 3. READ movies from database
    async getMoviesDB() {
      const docReferences = await db.collection("movies").get();

      // docReferences.forEach((movie) => {
      //   console.log("movie: ", movie.id);
      // });

      const movies = docReferences.docs.map((doc) => {
        return { ...doc.data(), documentId: doc.id };
      });

      this.moviesDB = movies;
      //console.log("this.moviesDB", this.moviesDB);
    },
    // 4. READ movies from TMDB
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
    // 5. CREATE new movie
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
        categories: [],
      };

      //console.log("newMovie :", newMovie);

      // open editing modal
      this.editMode = false;
      this.selectedMovie = newMovie;
      this.moviesAPI = [];

      return;
    },
    async saveNewMovie() {
      await db.collection("movies").add(this.selectedMovie);
      this.selectedMovie = {};
      this.getMoviesDB();
    },
    //6. UPDATE existing movie

    async saveChanges() {
      await db
        .collection("movies")
        .doc(this.selectedMovie.documentId)
        .update(this.selectedMovie);
      this.getMoviesDB();

      this.selectedMovie = {};
    },
    // 7. DELETE movie
    async deleteMovie() {
      await db.collection("movies").doc(this.selectedMovie.documentId).delete();
      this.selectedMovie = {};
      this.getMoviesDB();
    },

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
