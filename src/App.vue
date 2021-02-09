<template>
  <div>
    <div>
      <ul>
        <li>
          <router-link to="/home">Home</router-link>
        </li>
        <li>
          <router-link to="/contact">Contact</router-link>
        </li>
        <li>
          <router-link to="/info">User information</router-link>
        </li>
        <li>
          <router-link to="/blog">Blog</router-link>
        </li>
        <li v-show='status === "Administrator"'>
          <router-link to="/list">User list</router-link>
        </li>
        <li v-show='logged === null'>
          <router-link to="/register">Register</router-link>
        </li>
        <li>
          <router-link to="/login">Login</router-link>
        </li>
        <input v-show="logged" type="button" @click="Logout" value="Wyloguj">
      </ul>
    </div>
    <div id="app">
      <router-view></router-view>
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
      {},
  updated() {

  },
  data() {
    return {
      status: "",
      logged:''
    }
  },

  methods: {
    Logout: function(){
      sessionStorage.clear();
      localStorage.clear()
        this.$router.push('/login')
    }
  },
  mounted(){
    this.logged = sessionStorage.getItem("loggedin")
    this.status = sessionStorage.getItem("type")
    console.log(this.status)
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
