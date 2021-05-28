<template>
  <div class="aesthetic-windows-xp-modal list-container">
    <!-- Title Bar -->
    <div class="aesthetic-windows-xp-modal-title-bar">
      <div class="aesthetic-windows-xp-modal-title-bar-text">
        {{ category }}
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
      <div>I am the modal content</div>
      <ul>
        <li v-for="movie in movies" :key="movie.title">{{ movie.title }}</li>
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
