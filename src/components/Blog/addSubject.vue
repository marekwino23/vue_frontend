<template>
  <div>
    <div class="header">
      <h2>Add Subject</h2>
    </div>
    <div class="row">
      <div class="leftcolumn">
        <h2> Title: <input type="text" v-model="title"></h2>
        <br>
        <input type="button" value="addSubject" @click="addSubject">
        <br>
        <br>
        <router-link to="/blog">Back</router-link>
      </div>
    </div>

  </div>
</template>


<script>


export default {
  name: 'subject',
  components: {},
  updated() {

  },
  data() {
    return {
      lists: [],
      title: '',
      title2: '',
      type: '',
      id: '',
      date: ''
    }
  },

  mounted() {
    this.date = new Date();
    this.typeUser = sessionStorage.getItem("type")
    console.log(this.$route.params.title)
    this.title2 = this.$route.params.title
    console.log(this.typeUser)
    fetch("http://localhost:8000/updateSubject/" + this.id, {
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
            console.log(list.postTitle)
            sessionStorage.setItem("title", list.postTitle)
          })
        })
  },

  methods: {
    addSubject: function () {
      if (this.title2 === this.title) {
        alert("This subject is used")
      } else {
        console.log(this.title)
        this.date = new Date()
        this.title2 = sessionStorage.getItem("title")
        this.id = sessionStorage.getItem("id")
        this.type = sessionStorage.getItem("type")
        fetch('http://localhost:8000/addSubject', {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "id": this.id,
            "title": this.title,
            "date": this.date,
            "type": this.type,
          })
        })

            .then(response => response.json())
            .then(data => {
              console.log('Success:', data)
              if (data.status === "success") {
                alert("Title created successful")
              } else if (data.status === "error") {
                this.$swal.fire("this subject is used")
              } else {
                console.error("failed")
              }

            })
      }
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