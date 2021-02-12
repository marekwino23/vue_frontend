<template>
  <div>
    <div>
      <div class="container">
        <form action="http://localhost:8000/createMessage" @submit="createMessage()">
          <label>Your Email </label>
          <input type="email" class="email" name="email" required id="email">
          <br>
          <br>
          <label>Message </label>
          <input type="text" class="text" name="text" required min="8" id="text">
          <br>
          <br>
          <div class="btn-submit">
            <input type="submit" class="button" value="submit">
          </div>
          <br>
          <br>
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

    }
  },
  methods: {
    createMessage: function () {
      // const date = new Date();
      // const id = sessionStorage.getItem("id")
      const email = document.getElementById("email").value
      const message = document.getElementById("text").value
      fetch('http://localhost:8000/createMessage',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email, message
        }),
      })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            if (data.message === "success") {
              alert("Create message successful")
              console.log("done")
              this.$router.push('home')
            } else if (data.error === "error") {
              alert("failed")

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