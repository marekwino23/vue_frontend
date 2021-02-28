<template>
  <div>
    <div class="header">
      <h2>My Blog</h2>
    </div>
    <br>
    <article>
      <section class="hero">
        <div class="text_post">
          <h1 style="font-weight: bold">Welcome in my Blog</h1>
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
              <p style="color: white">{{list.post}}</p>
              <div v-if="typeUser !== 'User'">
                <router-link style="color:white" :v-show='typeUser !== "User"' :to="{name:'editPost', params:{id:list.id }}">Edit Post
                </router-link>
              </div>
              <br>
              <br>
            </div>
          </div>
          <div class="card-details">
          </div>
        </div>
        <br>
      </section>
      <input type="button" value="Back" @click="onBack">
      <div class="card">
        <router-link style="color:black" :to="{name:'addPost', params:{id:subject_id, subject:this.subject}}">Add Post
        </router-link>
      </div>
      <aside />
    </article>
    <footer class="footer">
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
      name: 'showPost',
      updated() {

      },
      data() {
        return {
          lists: [],
          text: '',
          email: '',
          status: '',
          subject:'',
          subject_id:'',
          category:'',
          category_id:'',
          typeUser: '',
          id: '',
          date: ''
        }
      },

      methods: {
        onBack: function (){
          sessionStorage.removeItem("subject_id")
          sessionStorage.removeItem("subject")
          window.location.href="/subject/" + this.category_id + '/' + this.category
        },

        deletePost: function (list) {
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
                  window.location.href = '/showPost/'+ this.post_id
                } else {
                  alert("failed")
                }
              })
        },
      },
      mounted() {
        this.date = new Date();
        this.category = sessionStorage.getItem("category")
        this.category_id = sessionStorage.getItem("category_id")
        sessionStorage.setItem('subject', this.$route.params.subject)
        this.subject = sessionStorage.getItem('subject')
        this.id = sessionStorage.getItem('id')
        console.log(this.$route.params.id)
        sessionStorage.setItem("subject_id", this.$route.params.id)
        this.subject_id = sessionStorage.getItem("subject_id")
        this.typeUser = sessionStorage.getItem("type")
        fetch("http://localhost:8000/showPost/" + this.subject_id + '/' + this.id, {
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
                console.log(list.subject_id)
                sessionStorage.setItem("subject_id", list.subject_id)
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
  margin-left: 0px;
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
  color:black;
  text-align: center;
  margin-left: 22px;
}

button{
  background-color: white;
  border: none;
  color: black;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

.text_post{
  position: absolute;
  margin-left: 456px;
  margin-top:314px;
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
  height: 4%;
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