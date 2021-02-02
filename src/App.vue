
<template>
  <div>
    <div>
      <ul>
     <li><router-link to="/home">Home</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
      <li><router-link to="/info">Information</router-link></li>
      <li><router-link to="/register">Register</router-link></li>
     <li><router-link to="/login">Login</router-link></li>
      </ul>
    </div>
    <div id="app">
      <router-view></router-view>
      <img alt="Vue logo" src="./assets/logo.png">
    </div>
    <div id="home">
      <br>
      <br>
    </div>
  </div>
</template>

<script>


export default {
  names: 'App',
  components:
      {
      },
  updated() {

  },
  data() {
    return {}
  },

  methods: {

    },
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
