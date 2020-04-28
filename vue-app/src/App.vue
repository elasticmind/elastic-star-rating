<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Greeting :id="'1234'"/>
    <p>
      This is my amazing Vue app. Not convinced? You have to rate it to see it!
    </p>
    <elastic-star-rating :max-rating="5" style="position: absolute; top: 0;"></elastic-star-rating>
  </div>
</template>

<script>
import Greeting from './components/Greeting.vue'

export default {
  name: 'App',
  components: {
    Greeting
  }
}
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
