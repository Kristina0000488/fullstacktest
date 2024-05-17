<template>
  <SearchBar @title-changed="handleTitleSearchChange" />
  <SideMenu :items="menuItems" />
  <div v-if="foundBooks">
    <div v-for="(value, index) in prepareFoundBooks(foundBooks)" :key="index">
      <template v-for="(item, key, index) in value" :key="index">
        <div v-if="key !== 'id'">{{ key }}: {{ item }}</div>
      </template>
      <button @click="removeBook(value.id)">Delete</button>
    </div>
  </div>
</template>

<script setup>
import SearchBar from './components/SearchBar.vue';
import SideMenu from './components/SideMenu.vue';
import { ref, onMounted } from 'vue';

const books = ref(null);
const foundBooks = ref(null);
const menuItems = ref({});

const baseURL = 'http://127.0.0.1:4000/api/books';

onMounted(() => {
  getBooks();
});

const getBooks = () => {
  fetch(`${baseURL}`)
    .then((response) => response.json())
    .then((data) => {
      books.value = data;
      computeProperties();
    });
};

const computeProperties = () => {
  const uniqueAuthors = new Set();
  const uniqueGenres = new Set();
  const uniqueYears = new Set();

  if (books.value) {
    books.value.forEach((book) => {
      uniqueAuthors.add(book.author);
      uniqueGenres.add(book.genre);
      uniqueYears.add(book.year);
    });

    menuItems.value = {
      authors: Array.from(uniqueAuthors),
      genres: Array.from(uniqueGenres),
      years: Array.from(uniqueYears),
    };
  }
};

const handleTitleSearchChange = (title) => {
  fetch(`${baseURL}/title/${title}`)
    .then((response) => response.json())
    .then((data) => (foundBooks.value = data))
    .then(() => console.log(foundBooks.value));
};

const prepareFoundBooks = (data) => {
  return data.map((value) => ({
    title: value.title,
    genre: value.genre,
    author: value.author,
    year: value.year,
    id: value._id,
  }));
};

const removeBook = (id) => {
  fetch(`${baseURL}/${id}`, { method: 'DELETE' })
    .then(() => (foundBooks.value = null))
    .then(() => getBooks());
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
