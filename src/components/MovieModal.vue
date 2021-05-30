<template>
  <div class="aesthetic-windows-xp-modal edit-modal" @click.stop="">
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

    <div class="aesthetic-windows-xp-modal-content edit-modal-content">
      <div class="aesthetic-windows-xp-container">
        <div class="movie-item">
          <img :src="selectedMovie.posterSrc" alt="" />
          <p class="description">{{ selectedMovie.description }}</p>
          <h4>Filmkategorien</h4>
          <div class="categories-comtainer">
            <label
              v-for="category in categories"
              :key="category.name"
              class="aesthetic-windows-xp-checkbox"
              >{{ category.name }}
              <input type="checkbox" />
              <span class="aesthetic-windows-xp-checkmark"></span>
            </label>
          </div>
          <div class="actions-container">
            <button v-if="editMode">Save Changes</button>
            <button v-else>Save New Movie</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedMovie: Object,
    categories: Array,
    editMode: Boolean,
  },
  mounted() {
    console.log("props :", this.selectedMovie);
  },
};
</script>

<style lang="css" scoped>
.edit-modal {
  margin: 2rem 4rem;
  position: fixed;
  top: 0;
  left: 0;
}
.edit-modal-content {
  display: grid;
  grid-template-columns: auto 1fr;
}
label {
  display: block;
}
</style>