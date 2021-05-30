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

    <div class="aesthetic-windows-xp-modal-content">
      <div class="aesthetic-windows-xp-container">
        <div class="movie-item-modal">
          <div class="movie-details">
            <img :src="selectedMovie.posterSrc" alt="" />
            <p class="description">{{ selectedMovie.description }}</p>
          </div>
          <h4>Filmkategorien</h4>
          <div class="categories-container">
            <!-- <label v-for="category in categories" :key="category.name" class=""
              >{{ category.name }}
              <input type="checkbox" v-model="selectedMovie.categories" />
              <span class="aesthetic-windows-xp-checkmark"></span>
            </label> -->
            <div
              v-for="category in categories"
              :key="category.name"
              class="category-checkbox-container"
            >
              <input
                type="checkbox"
                :id="category.name"
                :value="category.name"
                v-model="selectedMovie.categories"
              />
              <label :for="category.name">{{ category.name }}</label>
            </div>
          </div>
          <div class="actions-container">
            <button @click.stop="saveChanges" v-if="editMode">
              Save Changes
            </button>
            <button @click.stop="saveNewMovie" v-else>Save New Movie</button>
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
  methods: {
    saveChanges() {
      console.log("save new movie");
      console.log("categories: ", this.selectedMovie.categories);
    },
    saveNewMovie() {},
  },
};
</script>

<style lang="css" scoped>
.edit-modal {
  margin: 0 auto;
  position: fixed;
  top: 50px;
  left: 50px;
  max-width: 600px;
}

.movie-item-modal {
  /* display: grid; */
  /* grid-template-columns: 150px 1fr; */
  padding: 1rem;
}
.movie-details {
  display: flex;
}
img {
  margin-right: 5px;
}
h4 {
  margin-top: 15px;
}
.categories-container {
  grid-column: 1/2;
}
.categories-container .category-checkbox-container {
  display: flex;
}

.category-checkbox-container input {
  margin-right: 5px;
}

.actions-container {
  margin-top: 5px;
}
</style>