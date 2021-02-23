<template>
  <div>
    <div class="header">
      <h2>My Blog</h2>
    </div>
    <br>
    <article>
      <section class="hero">
        <div class="text">
          <h1 style="font-weight: bold">Welcome in my Blog</h1>
          <p> Subject:  </p>
          <button>Read more</button>
        </div>
        <img class="hero_img" src="../../assets/photo-1568805711746-65416e6d180b.jpeg">
      </section>
    </article>
    <article class="main-content">
      <section>
      </section>
      <section class="card-list">
        <div class="row">
          <div v-for="list in lists" :key="list.postContent" class="rightcolumn">
            <p>{{list.email}}</p>
            <p>{{list.typeUser}}</p>
            <img alt="User" width = 50% src="../../assets/obrazek.png">
            <div class="field">
              <p>{{list.date}}</p>
              <img class="card_img" src="../../assets/photo-1598625456132-bb6cb433e42e.jpeg"/>
              <p style="color: white">{{list.postContent}}</p>
              <input type="button" style="width:50%; height: 50%" value="delete post" @click="deletePost(list,list.id)">
              <router-link :v-show='typeUser !== "User"' :to="{name:'editPost', params:{id:list.id }}">Edit Post
              </router-link>
              <br>
              <input type="button" style="width:50%; height: 50%" value="add comment" @click="addComment(list,list.id)">
              <input type="text" style="width:50%; height: 50%" v-model="text">
            </div>
          </div>
        <div v-for="list in lists" :key="list.id" class="card">
          <div class="card-details">
          </div>
        </div>
        </div>
        <div class="row">
          <h2 style="color:white">List comments</h2>
          <div v-for="comment in comments" :key="comment.comment" class="column" style="background-color:#aaa;">
            <p>{{comment.email}} - {{comment.comment}}</p> <input type="button" style="width:50%; height: 50%" value="delete comment" @click="deleteComment(comment,comment.id)">
          </div>
        </div>
        <br>
        <input type="button" @click="onBack" value="back">
      </section>
      <router-link :v-show='typeUser !== "User"' :to="{name:'addPost', params:{id:title_id }}">Add Post
      </router-link>
      <aside />
    </article>
    <footer class="footer">
      <p/>
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

    export default {
      name: 'post',
      updated() {

      },
      data() {
        return {
          lists: [],
          comments: [],
          text: '',
          title: '',
          title2: '',
          email: '',
          status: '',
          typeUser: '',
          id: '',
          post_id: '',
          title_id: "",
          date: ''
        }
      },

      methods: {

        onBack: function (){
          this.$router.push('/blog')
          localStorage.clear()
        },

        EditPost: function (list) {
          console.log(list.id)
          this.$router.push({name: 'editPost', params: {id: list.id}})
        },


        addComment: function () {
          this.id = sessionStorage.getItem("id")
          this.post_id = sessionStorage.getItem("post_id")
          this.date = new Date()
          this.email = sessionStorage.getItem("email")
          fetch("http://localhost:8000/addComment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "id": this.id,
              "text": this.text,
              "date": this.date,
              "email": this.email,
              "post_id": this.post_id
            })
          })
              .then(response => {
                if (response.status === 200) {
                  return response.json();
                }
              })
              .then(data => {
                console.log(data.message)
                if (data.status === "success") {
                  window.location.href = '/post/'+ this.post_id
                } else {
                  alert("failed")
                }
              })
        },

        deleteComment: function (list) {
          console.log(list.id)
          this.id = list.id
          fetch("http://localhost:8000/deleteComment", {
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
                  sessionStorage.removeItem("post_id")
                  window.location.href = '/blog'
                } else {
                  alert("failed")
                }
              })
        },

        deletePost: function (list) {
          console.log(list.id)
          this.id = list.id
          fetch("http://localhost:8000/deletePost", {
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
                  this.$router.push('/blog')
                } else {
                  alert("failed")
                }
              })
        },
      },

      mounted() {
        this.dateFormat = new Date();
        console.log(this.$route.params.id)
        localStorage.setItem("subject_id", this.$route.params.id)
        this.title_id = localStorage.getItem("subject_id")
        this.date = new Date(this.dateFormat)
        this.typeUser = sessionStorage.getItem("type")
        fetch("http://localhost:8000/updateBlog/" + this.title_id, {
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
              for (let i = 0; i < data.post.length; i++) {
                this.lists.push(data.post[i])
              }
              this.lists.forEach(function (list) {
                console.log(list.id)
                sessionStorage.setItem("post_id", list.id)
              })
            })
        this.title_id = sessionStorage.getItem("subject_id")
          fetch("http://localhost:8000/updateComment", {
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
                for (let i = 0; i < data.comment.length; i++) {
                  this.comments.push(data.comment[i])
                }

              })
        },
    }

    </script>

    <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  font-family: Arial;
  padding: 20px;
  background: #f1f1f1;
}

.hero_img {
  width: 1000px;
  height: 500px;
  /*opacity:0.6;*/
}


.card_img {
  width: 79%;
  height: 68%;
  margin-left: 38px;
  /*opacity:0.6;*/
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
  background: white;
}

.card-list {
  display:grid;
  grid-gap: 14px;
  grid-template-columns: repeat(auto-fit,
  minmax(300px , 1fr));
}

.card {
  display: grid;
  grid-template-columns:	1fr;
}

a{
  text-decoration: none;
  color:white;
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

.content{
  background-color: rgb(14 14 14);
  width: 80%;
  margin-left: 38px;
}
.text{
  position: absolute;
  margin-left: 338px;
  margin-top:290px;
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
}

.social {
  justify-self: end;
}

input {
  text-align: center;
  width: 50%;
  height: 20%;
  color:black;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

/*!* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other *!*/
/*@media screen and (max-width: 800px) {*/
/*  .leftcolumn, .rightcolumn {*/
/*    width: 100%;*/
/*    padding: 0;*/
/*  }*/
</style>