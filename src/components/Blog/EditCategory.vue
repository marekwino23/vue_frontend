<template>
  <div>
    <div class="header">
      <h2>Edit Category</h2>
    </div>
    <div class="row">
      <div class="leftcolumn">
          <div class="fakeimg" style="height:200px;"> <img id="output" width="200"> </div>
          <br>
          <textarea id="text" v-model="category"> </textarea>
        <br>
        <input type="button" value="edit" @click="editCategory">
        <br>
        <br>
        <router-link to="/blog">Back</router-link>
        </div>
        </div>

    </div>
</template>


<script>


export default {
  name: 'editCategory',
  components: {},
  updated() {

  },
  data() {
    return {
      text: '',
      type: '',
      category:'',
      id: '',
      category_id:'',
      email:'',
      date:''
    }
  },

  mounted() {
    this.category = this.$route.params.category
  },

  methods: {
    editCategory: function () {
      this.text = document.getElementById('text').value
      this.category_id = this.$route.params.id
        this.date = new Date()
        this.email = sessionStorage.getItem("email")
        this.id = sessionStorage.getItem("id")
        this.type = sessionStorage.getItem("type")
        fetch('http://localhost:8000/editCategory', {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "text": this.text,
            "id": this.id,
            "date": this.date,
            "type": this.type,
            "category_id": this.category_id,
            "email": this.email,
          })
        })

            .then(response => response.json())
            .then(data => {
              console.log('Success:', data)
              if (data.status === "Update success") {
                alert("Update successful")
                window.location.href = '/category'
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