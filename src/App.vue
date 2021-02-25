<template>
  <div>
    <div>
      <ul class="topnav">
        <img src="./assets/1827349.svg" style="margin-bottom: 19px" width="2%" @click="onRing">
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
            Logged as {{ status }}
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
      field: '',
      logged: ''
    }
  },

  beforeMount() {
    this.id = sessionStorage.getItem('id')
    fetch("http://localhost:8000/getId/" + this.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
        .then(response => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then(data => {
          console.log(data)
          for (let i = 0; i < data.id.length; i++) {
            console.log(data.id[i].id)
            sessionStorage.setItem('post_id', data.id[i].id)
          }
        })
  },

  methods: {
    Logout: function () {
      sessionStorage.clear();
      localStorage.clear()
      window.location.href = '/login'
    },
    onRing: function () {
      this.email = sessionStorage.getItem("email")
      this.post_id = sessionStorage.getItem('post_id')
      fetch("http://localhost:8000/getComment/" + this.email + "/" + this.post_id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
          .then(response => {
            if (response.status === 200) {
              return response.json();
            }
          })
          .then(data => {
            console.log(data)
            if (data.status === "lack comments") {
              alert("lack new comments")
            } else if (data.status === "new comments") {
                data.comments.map(function (list,item)  {
                      console.log(item)
                      this.field = confirm(list.email + "\n" + "added new comment to" + "\n" + "Post:" + list.postContent + "\n" + "comment:" + list.comment)
                      if (this.field === true) {
                        fetch("http://localhost:8000/acceptComment/" + list.id, {
                          method: "PATCH",
                          headers: {
                            "Content-Type": "application/json",
                          },
                        })
                            .then(response => {
                              if (response.status === 200) {
                                return response.json();
                              }
                            })
                            .then(data => {
                              console.log(data)
                              if (data.status === "This comment is accepted") {
                                window.location.href = '/showPost/' + list.post_id
                                console.log("good")
                              } else {
                                console.log("bajlando")
                              }
                            })

                      }
                    }
                )
            }
          })
    }
  },
// } else {
//   fetch("http://localhost:8000/deleteComment", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       "id": list.id,
//     })
//   })
//       .then(response => {
//         if (response.status === 200) {
//           return response.json();
//         }
//       })
//       .then(data => {
//         console.log(data)
//         if (data.status === "This comment is deleted") {
//           alert("delete comment sucsess")
//         } else {
//           console.log("error")
//         }
//       })

  mounted() {
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

.menu {
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
