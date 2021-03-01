<template>
  <header>
    <nav class="top-nav">
      <router-link class="active home" to="/home">Home</router-link>
      <ul class="top-menu">
<!--          <img v-show="status !== 'User'" src="./assets/1827349.svg" style="margin-bottom: 19px" width="2%" @click="onRing">-->
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
          <router-link v-show="logged" to="/category">Blog</router-link>
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
<!--          <li style="color: white; margin-left: 134px; font-size: 16px;" v-show="logged">-->
<!--            Logged as {{ status }}-->
<!--          </li>-->
        </div>
      </ul>
      <button class="mobile-toggle-btn"><i class="fa fa-bars" @click="onShow" /></button>
    </nav>
    <div id="app">
      <router-view></router-view>
    </div>
    <div id="home">
      <br>
      <br>
    </div>
  </header>
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
      logged: '',
      category_id:'',
      subject_id:'',
    }
  },

  beforeMount() {
    this.id = sessionStorage.getItem('id')
    this.category_id = sessionStorage.getItem('category_id')
    fetch("http://localhost:8000/getId/" + this.id + '/' + this.category_id, {
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
            sessionStorage.setItem("subject_id", data.id[i].id)
          }
        })
  },

  methods: {
    Logout: function () {
      sessionStorage.clear();
      localStorage.clear()
      window.location.href = '/login'
    },

    onShow: function(){
      document.querySelector(".top-menu").classList.toggle('visible');
    },

    onRing: async function () {
      this.email = sessionStorage.getItem("email")
      this.subject_id = sessionStorage.getItem('subject_id');
      let response;
      try {
        response = await fetch(`http://localhost:8000/getPost/${this.email}/${this.subject_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        let data;
        if (response.status === 200) {
           data = await response.json();
        }
        if (data.status === "lack new posts") {
          this.$swal.fire("lack new posts");
        } else if (data.status === "new posts") {
          console.log('data: ', data);
          const notifications = data.posts.map(singlePost => {
            return `${singlePost.email} \n added new post \n Post: ${singlePost.post} \n subject: ${singlePost.subject}`
          }).join('\n\n');
          await this.$swal.fire(notifications);
          //   fetch("http://localhost:8000/acceptComment/" + list.id, {
          //     method: "PATCH",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //   })
          //       .then(response => {
          //         if (response.status === 200) {
          //           return response.json();
          //         }
          //       })
          //       .then(data => {
          //         console.log(data)
          //         if (data.status === "This comment is accepted") {
          //           window.location.href = '/showPost/' + list.post_id
          //           console.log("good")
          //         } else {
          //           console.log("bajlando")
          //         }
          //       })
          //
          // }
        }


      } catch(error) {
          console.error(error);
      }
    }
  },

  mounted() {
    this.logged = sessionStorage.getItem("loggedin")
    this.status = sessionStorage.getItem("type")
    console.log(this.status);

    document.querySelectorAll('.top-menu').addEventListener('click', function(e) {
      if(e.target.NODE_NAME === 'LI') {
        document.querySelector('.top-menu').style.display = 'none';
      }
    });
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: blue;
  background-color: #34C3F6;
  margin-top: 60px;
}

.home {
  font-size: 20px;
  margin-right: 10px;
  display: block;
  padding: 5px 10px;
  outline: none;
}

.fa{
  color: white;
  margin-left: 5px;
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

.top-nav {
  background-color: #333;
  position: relative;
  width: 100%;
  height: 38px;
  display: flex;
  align-items: center;
}

/* Hide the links inside the navigation menu (except for logo/home) */

.top-menu {
  list-style: none;
  margin: 0 0 0 auto;
  padding-left: 0;
  transform: translateY(-124px);
  transition: transform .4s ease-in-out;
  width: 220px;
  background-color: #333;
  min-height: 0;
}

.top-menu.visible {
  transform: translateY(134px);
  z-index: 1;
}

/* Style the hamburger menu */
.mobile-toggle-btn {
  padding: 2px 5px;
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  font-size: 12px;
  height: 100%;
  background-color: inherit;
  border: none;
  outline: none;
  z-index: 1;
}

.mobile-toggle-btn .fa {
  font-size: 24px;
}

@media (min-width: 768px) {
  .mobile-toggle-btn {
    display: none;
  }
  .top-menu {
    display: flex;
    align-items: center;
    transform: none;
    width: initial;
    z-index: auto;
    box-shadow: none;
  }
}

/* Style navigation menu links */
.top-menu a {
  color: white;
  padding: 5px 10px;
  text-decoration: none;
  font-size: 20px;
  display: block;
  box-shadow: 2px 1px 4px 5px transparent;
  box-sizing: border-box;
}

/* Add a grey background color on mouse-over */
.top-menu a:hover {
  background-color: #ddd;
  color: black;
  box-shadow: 2px 1px 4px 5px #e1e1e1;
}

/* Style the active link (or home/logo) */
.active {
  background-color: #4CAF50;
  color: white;
  margin-right: 16px;
  text-decoration: none;
  padding: 5px 10px;
}

.btn-group .button:hover {
  background-color: #46b646;
}


</style>
