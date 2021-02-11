<template>
  <div>
    <div class="header">
      <h2>My Blog</h2>
    </div>
    <div class="row">
      <div class="leftcolumn">
        <div class="card">
          <h2> Title: <input type="text" v-model="title"> </h2>
          <h5> Title description:</h5>
          <h5> Who publicated: </h5>
          <div class="fakeimg" style="height:200px;"> <img id="output" width="200"> </div>
          <br>
          <textarea v-model="text"></textarea>
          <input type="button" value="addPost" @click="addPosts">
        </div>
        <div class="card">
          <h2>Title: {{post.postTitle}}</h2>
          <h5>Title description:{{post.postTitle}}</h5>
          <h5> Who publicated: </h5>
          <h5> Date: </h5>
          <div class="fakeimg" style="height:200px;"> </div>
          <p>{{post.postContent}}</p>
        </div>
      </div>
      <div class="rightcolumn">
        <div class="card">
          <h2>About Me</h2>
          <div class="fakeimg" style="height:100px;"> </div>
          <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
        </div>
        <div class="card">
          <h3>Popular Post</h3>
          <div class="fakeimg">Image</div><br>
          <div class="fakeimg">Image</div><br>
          <div class="fakeimg">Image</div>
        </div>
        <div class="card">
          <h3>Follow Me</h3>
          <p>Some text..</p>
        </div>
      </div>
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
          "title": this.title,
          "date": this.date,
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
body {
  font-family: Arial;
  padding: 20px;
  background: #f1f1f1;
}
img{
  width: 100px;
  height: 100px;
  float:left;
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