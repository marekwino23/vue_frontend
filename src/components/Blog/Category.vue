<template>
  <div>
    <div class="header">
      <h2 style="color:white;">My Blog</h2>
    </div>
    <br>
    <article>
      <section class="hero">
        <div id="myCarousel" class="carousel slide" data-ride="carousel">
          <!-- Indicators -->
          <ol class="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
          </ol>

          <!-- Wrapper for slides -->
          <div class="carousel-inner">
            <div class="item active">
              <img src="../../assets/photo-1568805711746-65416e6d180b.jpeg" alt="Chicago">
            </div>

            <div class="item">
              <img src="../../assets/photo-1558004294-897f1d522c97.jpeg" alt="Chicago">
            </div>

            <div class="item">
              <img src="../../assets/photo-1598625456132-bb6cb433e42e.jpeg" alt="Chicago">
            </div>
          </div>

          <!-- Left and right controls -->
          <a class="left carousel-control" href="#myCarousel" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="right carousel-control" href="#myCarousel" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
<!--        <img class="hero_img" src="../../assets/photo-1558004294-897f1d522c97.jpeg">-->
<!--        <div class="text">-->
<!--          <h1 style="font-weight: bold">Welcome in my Blog</h1>-->
<!--          <button>Read more</button>-->
<!--        </div>-->
      </section>
    </article>
    <div v-if="typeUser !== 'User'">
      <add-category :v-show ="typeUser !== 'User'"></add-category>
    </div>
    <h1 style="text-align: center">List of Category</h1>
    <article v-for="list in lists" :key="list.category"  class="main-content">
      <section>
        <div class="row">
          <div class="column" style="background-color:white;">
            <router-link :to="{name:'subject', params:{id:list.id, category:list.category}}">   <h2>{{list.category}}</h2> </router-link>
            <p>Read more</p>
          </div>
        </div>
        <input :v-show ='typeUser !== "User"' class="button" type="button" value="Delete Category" @click="deleteCategory(list,list.id)">
        <router-link style="color:white" :v-show='typeUser !== "User"' :to="{name:'editCategory', params:{id:list.id, category: list.category }}">Edit Category
        </router-link>
      </section>
      <section class="card-list">
        <div class="row">
          <div class="rightcolumn">
            <p></p>
            <p></p>
          </div>
        </div>
        <div>
          <div>
            <p style="color: white"></p>
          </div>
          <div class="card-details">
          </div>
        </div>
      </section>
      <aside />
    </article>
    <footer class="footer">
      <p class="email">Email: marekw1996@gmail.com<p/>
      <p class="number">Phone number: 505530072<p/>
<!--      <img width="25%" style="margin-left: 551px" src="../../assets/example.jpg">-->
      <nav>
        <ul class="nav">
        </ul>
      </nav>
      <ul class="social">
      </ul>
    </footer>
  </div>
</template>

<script>

import addCategory from "@/components/Blog/addCategory";

export default {
  name: 'blog',
  components: {addCategory},
  data() {
    return {
      lists: [],
      text: '',
      title: '',
      title2: '',
      typeUser: '',
      id: '',
      subject:'',
    }
  },

  methods: {
    deleteCategory: function (list) {
      console.log(list.id)
      this.id = list.id
      fetch("http://localhost:8000/deleteCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"id": this.id})
      })
          .then(response => {
            if (response.status === 200) {
              return response.json();
            }
          })
          .then(data => {
            console.log(data.message)
            if (data.message === "delete success") {
              window.location.href = '/category'
            } else {
              alert("failed")
            }
          })
    },
  },

  mounted() {
    this.date = new Date();
    this.typeUser = sessionStorage.getItem("type")
    console.log(this.typeUser)
    fetch("http://localhost:8000/updateCategory", {
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
          for (let i = 0; i < data.category.length; i++) {
            this.lists.push(data.category[i])

          }
          this.lists.forEach(function (list) {
            console.log(list.id)
          })
        })
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  font-family: Arial;
  padding: 20px;
}

.hero {
  min-height: 50vh;
  display:grid;
  justify-items: center;
  align-content: center;
  justify-content: center;
}

.rightcolumn{
  color: white;
}

main-content section {
  min-width: 70%;
  width: calc((48em - 100%) * 1000);
  max-width: 100%;
}


.main-content aside {
  min-width: 25%;
  width: calc((48em - 100%) * 1000);
  max-width: 100%;
}
p.number{
  margin-left: 37px;
  font-weight: bold;
}
p.email{
  margin-left: 8px;
  font-weight: bold;
}

main-content {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content:space-between;
  padding: 0 5vw 0 5vw;}

/* Header/Blog Title */
.header {
  padding: 30px;
  font-size: 40px;
  text-align: center;
  background: #8fad7a;
}
.carousel-inner{
  background-color: white;
}
.card-list {
  display:grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit,
  minmax(300px , 1fr));
}

a{
  text-decoration: none;
}

button{
  background-color: white; /* Green */
  border: none;
  color: black;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

.text{
  position: absolute;
  margin-left: 450px;
  margin-top:591px;
  width: 25%;
  background-color: black;
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  opacity: 0.8;
}

.card-details {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.card-details a {
  align-self: flex-start;
}

.footer {
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: column;
  align-items: center;
  background-color:#407940;
  border:2px solid white;
  color:white;
}

.social {
  justify-self: end;
}
h1{
  color:white;
}

@media screen and (max-width: 600px) {
  div.text {
    font-size: 20px;
    width: 25%;
  }
}

input {
  text-align: center;
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

</style>