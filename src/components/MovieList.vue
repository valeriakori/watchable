<template>
  <div class="aesthetic-windows-xp-modal list-container">
    <!-- Title Bar -->
    <div class="aesthetic-windows-xp-modal-title-bar">
      <div class="aesthetic-windows-xp-modal-title-bar-text">
        <h2>Filmkategorie</h2>
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
      <ul class="movie-container"></ul>
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
  computed: {},
};
</script>
