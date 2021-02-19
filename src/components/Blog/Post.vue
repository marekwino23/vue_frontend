<template>
  <div>
    <div class="header">
      <h2>My Blog</h2>
    </div>
    <h2 style="color:white;text-align: center">List Posts:</h2>
    <div class="row">
      <div class="rightcolumn">
        <div class="card">
          <div class="row">
            <div v-for="list of lists" :key="list.postContent" class="column" style="background-color:white;">
              <h2>typeUser:</h2>
              <p>{{list.typeUser}}</p>
              <h2>Who publicated:</h2>
              <p>{{list.email}}</p>
            </div>
          </div>
        </div>
          <div style="background-color:white" v-for="list of lists" :key="list.postContent" class="post">
            <div>
              <p> Date: {{list.date}}</p>
            </div>
            <h2>Content:</h2>
            <p>{{list.postContent}}</p>
            <h2>Edit post:</h2>
                          <input type="button" style="background-color:green; color:white;" value="Edit" @click="EditPost(list,list.id)">
                          <h2>Delete post:</h2>
                          <input type="button" style="background-color:green; color:white;" value="delete" @click="deletePost(list,list.id)">
          </div>

              <h3>List comments</h3>
          <div class="card">
            <div v-for="comment in comments" :key="comment.id" class="column" style="background-color:white;">
              <h2>Date</h2>
              <p>{{comment.date}}</p>
              <h2>Who comment</h2>
              <p>{{comment.email}}</p>
              <br>
              <h2>Content</h2>
              <p>{{comment.comment}}</p>
            </div>
            </div>
          <br>
          <br>
          <br>
        <div class="card">
          <h3>Popular Post</h3>
          <div class="fakeimg">Image</div>
          <br>
          <div class="fakeimg">Image</div>
          <br>
          <div class="fakeimg">Image</div>
        </div>
        <div class="card">
          <input type="button" value="back" @click="onBack">
          <br>
          <br>
          <router-link :v-show='typeUser !== "User"' :to="{name:'addPost', params:{id:this.title_id }}">Add Post
          </router-link>
          <h3>Follow Me</h3>
          <p>Some text..</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>


export default {
  name: 'post',
  components: {},
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
    onBack: function () {
      sessionStorage.removeItem("subject_id")
      this.$router.push('blog')
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
            if (data.message === "delete success") {
              this.$router.push('blog')
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
              this.$router.push('blog')
            } else {
              alert("failed")
            }
          })
    },
  },

  mounted() {
    this.dateFormat = new Date();
    sessionStorage.setItem("subject_id", this.$route.params.id)
    this.title_id = sessionStorage.getItem("subject_id")
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
            console.log(list.postContent)
            sessionStorage.setItem("post_id", list.id)
            sessionStorage.setItem("text", list.postContent)
            sessionStorage.setItem("status", list.typeUser)
          })
        })
    this.post_id = sessionStorage.getItem("post_id")
    fetch("http://localhost:8000/updateComment/" + this.post_id, {
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

img {
  width: 100px;
  height: 100px;
  float: left;
}

.post {
  margin-left:345px;
  margin-right: 6px;
  margin-top: -269px;
  width: 100%;
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