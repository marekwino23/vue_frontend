<template>
  <div>
    <div class="header">
      <h2>Add Post</h2>
    </div>
    <div class="row">
      <div class="leftcolumn">
          <div class="fakeimg" style="height:200px;"> <img id="output" width="200"> </div>
          <br>
          <textarea id="text"></textarea>
        <br>
        <input type="button" value="addPost" @click="addPost">
        <br>
        <br>
        <router-link to="/category">Back</router-link>
        </div>
        </div>

    </div>
</template>


<script>


export default {
  name: 'addPost',
  components: {},
  updated() {

  },
  data() {
    return {
      lists: [],
      text: '',
      subject: '',
      subject_id: '',
      status: '',
      type: '',
      category_id:'',
      id: '',
      email: '',
      date: '',
      dateFormat: ''
    }
  },


  methods: {
    addPost: function () {
      console.log(this.$route.params.id)
      this.text = document.getElementById('text').innerHTML
      console.log(this.text)
      this.id = sessionStorage.getItem("id")
      this.subject_id = this.$route.params.id
      this.subject = this.$route.params.subject
      this.category_id = sessionStorage.getItem('category_id')
      this.date = new Date()
      // const url = `https://www.google.pl/`
      // const item = this.text.link(url)
      this.dateFormat = this.date.toJSON().slice(0,10).replace(/-/g,'-')
      this.email = sessionStorage.getItem("email")
      fetch("http://localhost:8000/addPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "id": this.id,
          "text": this.text,
          "date": this.dateFormat,
          "email": this.email,
          "subject_id": this.subject_id,
          "category_id": this.category_id,

        })
      })
          .then(response => {
            if (response.status === 200) {
              return response.json();
            }
          })
          .then(data => {
            console.log(data.message)
            console.log(data.post)
            sessionStorage.setItem("link", data.post)
            if (data.status === "success") {
              window.location.href = '/showPost/' + this.subject_id + '/' + this.subject
            } else {
              alert("failed")
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