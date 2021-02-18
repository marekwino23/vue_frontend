<template>
  <div>
    <div class="header">
      <h2>Add Subject</h2>
    </div>
    <div class="row">
      <div class="leftcolumn">
        <form @submit="addSubject">
          <h2> Title: <input type="text" v-model="title"></h2>
          <input type="button" value="addSubject" @click="addSubject">
        </form>
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
      type: '',
      id: '',
      date: '',
      email:'',
    }
  },

  methods: {
    addSubject: function () {
        this.date = new Date()
        this.id = sessionStorage.getItem("id")
        this.type = sessionStorage.getItem("type")
        this.email = sessionStorage.getItem("email")
        fetch('http://localhost:8000/addSubject', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "id": this.id,
            "title": this.title,
            "date": this.date,
            "type": this.type,
            "email": this.email,
          })
        })

            .then(response => response.json())
            .then(data => {
              console.log('Success:', data)
              if (data.status === "success") {
                alert("Title created successful")
                sessionStorage.setItem("newtitle", data.title)
              } else if (data.status === "error") {
                this.$swal.fire("this subject is used")
              } else {
                console.error("failed")
              }

            })
      }
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