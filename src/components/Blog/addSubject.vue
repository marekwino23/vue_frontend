<template>
  <div>
    <div class="row">
      <div class="leftcolumn">
        <form @submit="addSubject">
          <h2> Title: <input type="text" v-model="title"></h2>
          <input style="color:black" type="button" value="addSubject" @click="addSubject">
        </form>
        <br>
        <br>
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
                window.location.href = '/blog'
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



/* Create two unequal columns that floats next to each other */
/* Left column */
.leftcolumn {
  float: left;
  width: 75%;
  margin-left: 84px;
  background-color: #407940;
  border: 1px solid white;
  color:white;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}


input {
  text-align: center;
  width: 100%;
  color:black;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 800px) {
  .leftcolumn{
    width: 100%;
    padding: 0;
  }
}
</style>