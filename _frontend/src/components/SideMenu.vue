<template>
  <div class="container" v-if="items">
    <ul v-for="(value, key) in items" :key="key">
      <li>{{ key }}:</li>
      <ul>
        <li v-for="(item, index) in value" :key="index">{{ item }}</li>
      </ul>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps(['items']);
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
