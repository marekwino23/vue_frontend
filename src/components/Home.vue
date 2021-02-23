<template>
  <div>
    <h1>My Website</h1>
    <br>
    <br>
    <div>
      <Slider></Slider>
    </div>
    <div class="row">
      <div class="leftcolumn">
        <div class="card">
          <div class="fakeimg" style="height:200px;"><img src="../assets/photo-1607117982290-686bb46893df.jpeg"></div>
          <br>
          <div class="fakeimg" style="height:200px;"><img src="../assets/photo-1558004294-897f1d522c97.jpeg"></div>
          <br>
          <div class="fakeimg" style="height:200px;"><img src="../assets/photo-1568805711746-65416e6d180b.jpeg"></div>
          <br>
        </div>
      </div>
      <div class="rightcolumn">
        <div class="card">
          <h2>About Me</h2>
          <div class="fakeimg" style="height:100px;"><img src="../assets/pexels-pixabay-220762.jpg" height="80px"></div>
          <p>Zwykły praktykant</p>
        </div>
        <div class="card">
          <h3>Popular Post</h3>
          <div class="fakeimg"><img src="../assets/photo-1558004294-897f1d522c97.jpeg" height="80px"></div>
          <div class="fakeimg"><img src="../assets/photo-1568805711746-65416e6d180b.jpeg" height="80px"></div>
          <div class="fakeimg"><img src="../assets/photo-1598625456132-bb6cb433e42e.jpeg" height="80px"></div>
        </div>
        <div class="card">
          <h3>Follow Me</h3>
          <p style="text-align: center">email: marekw1996@gmail.com</p>
          <p style="text-align: center">number: 505530072</p>
          <br>
          <img style='width:100px' src="../assets/logo5.png">
          <img style='width:100px' src="../assets/logo2.png">
        </div>
      </div>
    </div>

    <div class="footer">
    </div>
  </div>
</template>


<script>


import Slider from "@/components/Slider";

export default {
  name: 'home',
  components: {Slider},
  updated() {

  },
  data() {
    return {
      status: '',
      email: '',
      messages: '',
    }
  },

  mounted() {
    this.status = sessionStorage.getItem("type");
    this.email = sessionStorage.getItem("email")
    fetch("http://localhost:8000/getMessage/" + this.email, {
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
          if (data.status === "new messages") {
            this.$swal.fire({
              title: 'You have new messages!!!',
              showCancelButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                this.$router.push('received')
              } else if (result.isDenied) {
                console.log("later")
              }
            })

          } else if (data.status === "lack messages") {
            console.log("hello")
          }
        })
    this.email = sessionStorage.getItem("email")
    fetch("http://localhost:8000/getComment/" + this.email, {
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
          if (data.status === "new comments") {
            this.$swal.fire(data.comments[0].email +  "added new comment to your post")
          .then((result) => {
      if (result.isConfirmed) {
        this.$router.push('post')
      } else if (result.isDenied) {
        console.log("later")
      }
    })


          }

  else if (data.status === "lack messages") {
            console.log("hello")
          }
        })
  },

  methods: {},
}


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

* {
  box-sizing: border-box;
}

body {
  font-family: Arial;
  padding: 10px;
  background: #f1f1f1;
}

/* Header/Blog Title */
.header {
  padding: 30px;
  text-align: center;
  background: white;
}

h1 {
  font-size: 50px;
  color: white;
}

/* Style the top navigation bar */
.topnav {
  overflow: hidden;
  background-color: #333;
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
  color: black;
}

/* Create two unequal columns that floats next to each other */
/* Left column */
.leftcolumn {
  float: left;
  width: 75%;
}

/* Right column */
.rightcolumn {
  float: left;
  width: 25%;
  padding-left: 20px;
}

/* Fake image */
.fakeimg {
  width: 100%;
  padding: 20px;
}

img {
  margin-left: 3px;
  margin-top: -8px;
  width: 100%;
  border: 2px solid black;
}

/* Add a card effect for articles */
.card {
  padding: 20px;
  color: white;
  margin-top: 20px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Footer */
.footer {
  padding: 20px;
  text-align: center;
  color: white;
  margin-top: 20px;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 800px) {
  .leftcolumn, .rightcolumn {
    width: 100%;
    padding: 0;
  }
}

/* Responsive layout - when the screen is less than 400px wide, make the navigation links stack on top of each other instead of next to each other */
@media screen and (max-width: 400px) {
  .topnav a {
    float: none;
    width: 100%;
  }
}


</style>
