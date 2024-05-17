<template>
  <div class="container">
    <form @submit.prevent="onSubmit">
      <input
        type="text"
        value="titleBook"
        v-model="titleBook"
        placeholder="Type a book title" />
      <button type="submit">Search</button>
    </form>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['titleChanged']);

const titleBook = ref('');

const onSubmit = () => {
  if (titleBook.value) {
    emit('titleChanged', titleBook.value);
    titleBook.value = '';
  }
};
</script>

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
