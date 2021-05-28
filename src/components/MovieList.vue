<template>
  <div class="aesthetic-windows-xp-modal list-container">
    <!-- Title Bar -->
    <div class="aesthetic-windows-xp-modal-title-bar">
      <div class="aesthetic-windows-xp-modal-title-bar-text">
        <h2>{{ category }}</h2>
      </div>

      <div class="aesthetic-windows-xp-modal-title-bar-controls">
        <div class="aesthetic-windows-xp-button-title-bar">
          <button>_</button>
        </div>
        <div class="aesthetic-windows-xp-button-title-bar-close">
          <button>X</button>
        </div>
      </div>
    </div>

    <!-- Content -->

    <div class="aesthetic-windows-xp-modal-content">
      <ul class="movie-container">
        <li
          v-for="movie in filteredMovies"
          :key="movie.title"
          v-on:click.stop="$emit('clickMovie', movie)"
        >
          <div class="aesthetic-windows-xp-container">
            <div class="movie-item">
              <h3>{{ movie.title }}</h3>
              <img :src="movie.posterSrc" alt="" />
              <p class="description">{{ movie.description }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    movies: Array,
    category: String,
  },
  computed: {
    filteredMovies() {
      return this.movies.filter((movie) =>
        movie.categories.includes(this.category)
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
