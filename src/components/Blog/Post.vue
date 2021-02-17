<template>
  <div>
    <div class="header">
      <h2>My Blog</h2>
    </div>
    <div class="row">
      <div class="rightcolumn">
        <div class="card">
          <h2>List Post:</h2>
          <ul id="example-2">
            <li v-for="list of lists" :key="list.postContent">
              Title: <input type="text" v-model="title">  Date: <input type="text" v-model="list.date">   Content: <input type="text" v-model="list.postContent"> <br>  Who publicated: <input type="text" v-model="list.typeUser">
            <input type="button" value="delete" @click="deletePost(list,list.id)">
            </li>
          </ul>
          <br>
          <br>
          <br>
        </div>
        <div class="card">
          <h3>Popular Post</h3>
          <div class="fakeimg">Image</div><br>
          <div class="fakeimg">Image</div><br>
          <div class="fakeimg">Image</div>
        </div>
        <div class="card">
          <input type="button" value="back" @click="onBack">
          <br>
          <br>
          <router-link :v-show ='typeUser !== "User"' to="/addPost">Add Post</router-link>
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
      text: '',
      title:'',
      title2: '',
      status: '',
      typeUser: '',
      id: '',
      post_id:"",
      date:''
    }
  },

  methods:{
    onBack: function(){
      sessionStorage.removeItem("title")
    this.$router.push('blog')
    },

    deletePost: function (list) {
      console.log(list.id)
      this.id = list.id
      fetch("http://localhost:8000/deletePost", {
        method: "Patch",
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
    this.dateFormat = new Date();
    sessionStorage.setItem("title",this.$route.params.title )
    sessionStorage.setItem("post_id", this.$route.params.id)
    this.date = new Date(this.dateFormat)
    this.typeUser = sessionStorage.getItem("type")
    this.title = sessionStorage.getItem("title")
   fetch("http://localhost:8000/updateBlog/"+this.title,{
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
         for(let i = 0; i<data.post.length;i++) {
           this.lists.push(data.post[i])
         }
         this.lists.forEach(function(post){
           console.log(post.id)
           sessionStorage.setItem("post_id", post.id)

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
img{
  width: 100px;
  height: 100px;
  float:left;
}

.title{
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
input{
  text-align:center;
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