<template>
  <div>
    <div>
      <ul class="topnav">
        <li>
          <router-link to="/home">Home</router-link>
        </li>
          <li>
            <router-link v-show="logged" to="/contact">Contact</router-link>
          </li>
          <li>
            <router-link v-show="logged" to="/sended">MessageSended</router-link>
          </li>
          <li>
            <router-link v-show="logged" to="/received">MessageReceived</router-link>
          </li>
          <li>
            <router-link v-show="logged" to="/info">User information</router-link>
          </li>
          <li>
            <router-link v-show="logged" to="/blog">Blog</router-link>
          </li>
          <li v-show='status === "Admin"'>
            <router-link to="/list">User list</router-link>
          </li>
          <li v-show='logged === null'>
            <router-link to="/register">Register</router-link>
          </li>
          <li v-show="!logged">
            <router-link to="/login">Login</router-link>
          </li>
        <div class="btn-group">
        <input type="button" class="button" v-show="logged" @click="Logout" value="Wyloguj">
          <li style="color: white; margin-left: 134px; font-size: 16px;" v-show="logged">
            Logged as {{status}}
          </li>
        </div>
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
      window.location.href = '/login'
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
  background-color: #456939;;
  margin-top: 60px;
}
.menu{
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: green;
}


.btn-group .button {
  border: none;
  color: white;
  padding: 13px 20px;
  margin-top: -19px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  float: left;
}

.topnav {
  overflow: hidden;
  background-color: #333;
  height: 47px;
}

/* Style the topnav links */
.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}


/* Change color on hover */
.topnav a:hover {
  background-color: #ddd;
  color: white;
}

.btn-group .button:hover {
  background-color: #46b646;
}

/* Responsive layout - when the screen is less than 400px wide, make the navigation links stack on top of each other instead of next to each other */
@media screen and (max-width: 400px) {
  .topnav a {
    float: none;
    width: 100%;
  }
}


</style>
