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
              :class="{ 'is-active': moviesAPI.length > 0 }"
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
    />

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
      searchTerm: "savages",
      moviesDB: [],
      categoriesDB: [],
      moviesAPI: [
        {
          adult: false,
          backdrop_path: "/s5M7HDcn9QHo9B7EzXXdOIa2oAK.jpg",
          genre_ids: [80, 18, 53],
          id: 82525,
          original_language: "en",
          original_title: "Savages",
          overview:
            "Pot growers Ben and Chon face off against the Mexican drug cartel who kidnapped their shared girlfriend.",
          popularity: 9.782,
          poster_path: "/5hVMR5dG2f2EgLETewzwXcRbKpD.jpg",
          release_date: "2012-07-06",
          title: "Savages",
          video: false,
          vote_average: 6.4,
          vote_count: 1692,
        },
        {
          adult: false,
          backdrop_path: "/c0UfOVrWCkh0ItVmDwXyIthoXDl.jpg",
          genre_ids: [18],
          id: 8272,
          original_language: "en",
          original_title: "The Savages",
          overview:
            "A sister and brother face the realities of familial responsibility as they begin to care for their ailing father.",
          popularity: 8.693,
          poster_path: "/nY54gSmTOmSXlQpWDB7DWp4u8a7.jpg",
          release_date: "2007-01-19",
          title: "The Savages",
          video: false,
          vote_average: 6.9,
          vote_count: 249,
        },
        {
          adult: false,
          backdrop_path: null,
          genre_ids: [10751],
          id: 379731,
          original_language: "en",
          original_title: "Little Savages",
          overview:
            "Visiting the charming lake town of Culver, a boy genius and his sister race against bullies to find a treasure hidden by an eccentric philanthropist.",
          popularity: 3.471,
          poster_path: "/i5lezFRw98uv5xSriZD4S00WkAI.jpg",
          release_date: "2016-02-02",
          title: "Little Savages",
          video: false,
          vote_average: 5.6,
          vote_count: 16,
        },
        {
          adult: false,
          backdrop_path: null,
          genre_ids: [53, 27],
          id: 217665,
          original_language: "en",
          original_title: "Savages Crossing",
          overview:
            "When a sudden flood traps a group of strangers in an outback roadhouse it becomes clear that the threat from within the group is far greater than from raging torrent outside.",
          popularity: 2.962,
          poster_path: "/iSMZ4ccraaGwQ2cjUJymGI3zwAV.jpg",
          release_date: "2011-05-11",
          title: "Savages Crossing",
          video: false,
          vote_average: 3.2,
          vote_count: 9,
        },
        {
          adult: false,
          backdrop_path: "/bm1KQsK3Ofu9ibTP87g4EaKj8zq.jpg",
          genre_ids: [28, 80, 18, 53],
          id: 86616,
          original_language: "en",
          original_title: "The Young Savages",
          overview:
            "A district attorney investigates the racially charged case of three teenagers accused of the murder of a blind Puerto Rican boy.",
          popularity: 3.631,
          poster_path: "/wwuzTM314iVSqodZxBtYHvUFeBM.jpg",
          release_date: "1961-05-24",
          title: "The Young Savages",
          video: false,
          vote_average: 6.5,
          vote_count: 21,
        },
        {
          adult: false,
          backdrop_path: "/kOV2y0v7LINRnI6GapsO2n2Hedl.jpg",
          genre_ids: [18, 28],
          id: 69151,
          original_language: "en",
          original_title: "The Cycle Savages",
          overview:
            "The leader of a biker gang takes exception to an artist sketching them, so he makes plans to crush the artist's hands.",
          popularity: 2.096,
          poster_path: "/i4ObAJszCgOtVFxvqBc6zNTpFfn.jpg",
          release_date: "1969-08-22",
          title: "The Cycle Savages",
          video: false,
          vote_average: 5.3,
          vote_count: 8,
        },
      ],
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
    },
  },
};
</script>

<style src="@/styles/base.css" />
<style src="@/styles/aesthetic.css" />
