<template>
  <div class="aesthetic-windows-xp-modal edit-modal">
    <!-- Title Bar -->
    <div class="aesthetic-windows-xp-modal-title-bar">
      <div class="aesthetic-windows-xp-modal-title-bar-text">
        <h2>{{ selectedMovie.title }}</h2>
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
      <div class="aesthetic-windows-xp-container">
        <div class="movie-item">
          <img :src="selectedMovie.posterSrc" alt="" />
          <p class="description">{{ selectedMovie.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedMovie: Object,
  },
  mounted() {
    console.log("FROM MODAL", this.selectedMovie.title);
  },
};
</script>

<style lang="css" scoped>
.edit-modal {
  margin: 2rem 4rem;
  position: absolute;
  top: 0;
  left: 0;
}
</style>