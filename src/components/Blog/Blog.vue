<template>
  <div>
    <div class="header">
      <h2>My Blog</h2>
    </div>
    <div class="row">
      <div class="rightcolumn">
        <addSubject></addSubject>
        <div class="card">
          <h2 style="color:white">List Subject:</h2>
          <ul v-for="list in lists" :key="list.id">
            <router-link :to="{name:'post', params:{id:list.id, title:list.subject }}">{{ list.subject }}<input type="button" value="delete" @click="deleteSubject(list,list.id)">
            </router-link>
          </ul>
          <br>
          <br>
          <br>
          <br>
        </div>
        <div class="card">
          <h3 style="color:white">Popular Post</h3>
          <div class="fakeimg">Image</div>
          <br>
          <div class="fakeimg">Image</div>
          <br>
          <div class="fakeimg">Image</div>
        </div>
        <div class="card">
          <h3 style="color:white">Follow Me</h3>
          <p>Some text..</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import addSubject from "@/components/Blog/addSubject";

export default {
  name: 'blog',
  components: {addSubject},
  updated() {

  },
  data() {
    return {
      lists: [],
      text: '',
      title: '',
      title2: '',
      typeUser: '',
      id: '',
      date: ''
    }
  },

  methods: {
    deleteSubject: function (list) {
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
              this.$router.push('home')
            } else {
              alert("failed")
            }
          })
    },
  },

  mounted() {
    this.date = new Date();
    this.typeUser = sessionStorage.getItem("type")
    this.title2 = sessionStorage.getItem("newtitle")
    console.log(this.typeUser)
    fetch("http://localhost:8000/updateSubject", {
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
          for (let i = 0; i < data.post.length; i++) {
            this.lists.push(data.post[i])

          }
          this.lists.forEach(function (list) {
            console.log(list.subject)
            // sessionStorage.setItem("title", list.postTitle)
            // sessionStorage.setItem("title_id", list.id)
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

img {
  width: 100px;
  height: 100px;
  float: left;
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