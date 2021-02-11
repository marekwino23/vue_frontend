<template>
  <div>
    <div>
      <div class="container">
        <form @submit="createMessage">
          <label for="fname">First Name</label>
          <input type="text" id="fname" name="firstname" v-model="firstName" placeholder="Your name..">

          <label for="lname">Last Name</label>
          <input type="text" id="lname" name="lastname" v-model="lastName" placeholder="Your last name..">
          <label for="subject">Subject</label>
          <textarea id="subject" name="subject" placeholder="Write something.." style="height:200px"></textarea>

          <input type="submit" value="Submit">
        </form>
      </div>
    </div>
  </div>
</template>


<script>


export default {
  name: 'contact',
  components: {},
  updated() {

  },
  data() {
    return {
      firstName: '',
      lastName: '',
      text: '',
    }
  },
  methods: {
    createMessage: function () {
      this.id = sessionStorage.getItem("id")
       fetch("http://localhost:8000/createMessage", {
        method: "POST",
        body: JSON.stringify({
          "firstName": this.firstName,
          "lastName": this.lastName,
          "text": this.text,

        }),
        headers: {
          "Content-Type": "application/json"
        },
      })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            if (data.status === "success") {
              alert("Message is created")
              console.log("done")
              this.$router.push('login')
            } else if (data.error === "Message is wrong") {
              this.$router.push('home')

            }
          });
    }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

body {
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>