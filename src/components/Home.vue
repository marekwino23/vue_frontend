<template>
  <div>
    <h1>My Website</h1>
    <h1>{{status}}</h1>
    <br>
    <br>
    <div>
      <Slider></Slider>
    </div>
    <div class="row">
      <div class="leftcolumn">
        <div class="card">
          <h2>TITLE HEADING</h2>
          <h5>Title description, Sep 2, 2017</h5>
          <div class="fakeimg" style="height:200px;"> <img src="../assets/photo-1607117982290-686bb46893df.jpeg"></div>
        </div>
      </div>
      <div class="rightcolumn">
        <div class="card">
          <h2>About Me</h2>
          <div class="fakeimg" style="height:100px;"> <img src="../assets/pexels-pixabay-220762.jpg" height="80px"> </div>
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
          <p>marekw1996@gmail.com</p>
        </div>
      </div>
    </div>

    <div class="footer">
      <h2>email: marekw1996@gmail.com</h2>
      <h2>phone number: 505530072</h2>
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
    }
  },

  mounted() {
   this.status = sessionStorage.getItem("type");
  },

  methods: {

  },
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

img{
  margin-left: 3px;
  margin-top: -8px;
  width: 100%;
  border:2px solid black;
}

/* Add a card effect for articles */
.card {
  padding: 20px;
  color:white;
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
