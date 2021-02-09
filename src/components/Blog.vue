<template>
  <div>
    <div class="header">
      <h2>My Blog</h2>
    </div>
    <div class="row">
      <div class="leftcolumn">
        <div class="card">
          <ul v-for="list in lists" :key="list.type"> </ul>
            <h2>Title: <input type="text" v-model="title"></h2>
            <h3>Date publicated: {{date}}</h3>
            <h3>Who:</h3>
            <div class="fakeimg" style="height:200px;"> <img alt="obrazek" src="../assets/example.jpg"> <textarea v-model="text" rows="10" cols="40"> </textarea>  <input type="button" value="addPost" @click="addPosts"> </div>
          </div>
        </div>
    </div>
    <h1>Posts</h1>
    <div class="card">
      <ul v-for="list in lists" :key="list.type"> </ul>
      <h2>Title:{{title2}}</h2>
      <h3>Date publicated: {{date}}</h3>
      <h3>Who publicated: {{post.typeUser}}</h3>
      <div class="fakeimg" style="height:200px;"> <img alt="obrazek" src="../assets/example.jpg"> <textarea disabled  v-model="post.post" rows="10" cols="40"> </textarea> </div>
  </div>
    <div class="card">
      <ul v-for="list in lists" :key="list.type"> </ul>
      <h2>Title: <input type="text" v-model="title"></h2>
      <h3>Date publicated:</h3>
      <h3>Who:</h3>
      <div class="fakeimg" style="height:200px;"> <img alt="obrazek" src="../assets/example.jpg"> <textarea v-model="text" rows="10" cols="40"> </textarea> </div>
    </div>
    <div class="card">
      <ul v-for="list in lists" :key="list.type"> </ul>
      <h2>Title: {{title}}</h2>
      <h3>Date publicated:</h3>
      <h3>Who:</h3>
      <div class="fakeimg" style="height:200px;"> <img alt="obrazek" src="../assets/example.jpg"> <textarea v-model="text" rows="10" cols="40"> </textarea> </div>
    </div>
    <div class="card">
      <ul v-for="list in lists" :key="list.type"> </ul>
      <h2>Title: <input type="text" v-model="title"></h2>
      <h3>Date publicated:</h3>
      <h3>Who:</h3>
      <div class="fakeimg" style="height:200px;"> <img alt="obrazek" src="../assets/example.jpg"> <textarea v-model="text" rows="10" cols="40"> </textarea> </div>
    </div>
    <div class="footer">
      <h2>Footer</h2>
    </div>
    <div>
      <br>
      <br>
      <img alt="obrazek" src="../assets/example.jpg">
    </div>
  </div>
</template>


<script>


export default {
  name: 'blog',
  components: {},
  updated() {

  },
  data() {
    return {
      lists: [{}],
      text: '',
      post:'',
      title:'',
      title2: '',
      status: '',
      typeUser: '',
      id: '',
      date:''
    }
  },
  mounted() {
    this.status = sessionStorage.getItem("type")
    this.title2 = sessionStorage.getItem("title")
    this.date = new Date();
   fetch("http://localhost:8000/updateBlog",{
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
         for(let i=0;i<data.post.length;i++) {
         this.post = data.post[i]
           console.log(this.post)
         }
       })
  },
  methods: {
    addPosts: function () {
      console.log(this.title)
      sessionStorage.setItem("title", this.title)
      this.id = sessionStorage.getItem("id")
      console.log(this.title2)
      fetch('http://localhost:8000/addPost', {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "text": this.text,
          "id": this.id,
        })
      })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data)
            if(data.status === "success"){
              this.$router.push('home')
              this.post = data.post
            }
            else{
              console.error("failed")
            }

          })
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#layout{
  float:left;
  background-color:blue;
}
img{
  float: left;
  width:300px;
}

body {
  font-family: Arial;
  padding: 20px;
  background: #f1f1f1;
}
h2{
  margin-left: 211px
}

/* Header/Blog Title */
.header {
  padding: 30px;
  font-size: 40px;
  text-align: center;
  background: white;
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
  background-color: white;
  width: 100%;
  padding: 20px;
}

/* Add a card effect for articles */
.card {
  background-color: white;
  padding: 20px;
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
  background: #ddd;
  margin-top: 20px;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 800px) {
  .leftcolumn, .rightcolumn {
    width: 100%;
    padding: 0;
  }
}
</style>