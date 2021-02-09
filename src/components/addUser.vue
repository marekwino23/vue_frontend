<template>
  <div>
    <div id="app">
      <img alt="Vue logo" src="../assets/logo.png">
    </div>
    <div id="create">
      <p>Add new user</p>
      <li>
        <router-link to="/list">Back</router-link>
      </li>
      <br>
      <form @submit="onsubmit" method="post">
        <div id="name">
          <label>Name</label>
          <input type="text" name="name" required value="name" v-model="name">
        </div>
        <br>
        <br>
        <label>Surname </label>
        <input type="text" name="surname" required value="surname" v-model="surname">
        <br>
        <br>
        <label>Email </label>
        <input type="email" name="email" id="email" required v-model="username">
        <br>
        <br>
        <label>Check email</label>
        <input type="button" v-on:click="onCheck" v-model="check"/>
        <br>
        <br>
        <label>Password</label>
        <input type="password" name="password" required min="8" value="password" v-model="password">
        <br>
        <br>
        <label> Validation</label>
        <input type="button" v-on:click="checkform" v-model="validation"/>
        <br>
        <br>
        <select v-model="type">
          <option>User</option>
          <option>Creator</option>
        </select>
        <br>
        <br>
        <br>
        <input type="submit" class="check" value="addUser" :disabled='validation === "off"'>
      </form>
    </div>
  </div>
</template>
<script>

export default {
  names: 'add',
  components: {},
  updated() {

  },
  data() {
    return {
      name: "",
      type: '',
      surname: "",
      username: "",
      password: "",
      response: '',
      data: '',
      check: "busy",
      validation: "off",
    }
  },
  methods: {
    onCheck: async (check) => {
      const email = document.getElementById("email").value
      console.log(email);
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email})
      };
      const response = await fetch('http://localhost:8000/checkemail', requestOptions)
      const data = await response.json()
      console.log(data.status)
      if (data.status === "success") {
        check = "free"
        alert("email is free")
        console.log(check)
      } else {
        alert("email is busy")
      }
    },

    checkform() {
      if (this.username === "" || this.password === "" || this.name === "" || this.surname === "" || this.type === "" ) {
        alert("please to complete your form or check your email")
      } else {
        this.validation = "on"
      }
    },

    onsubmit: function (event) {
      this.data = fetch("http://localhost:8000/register", {
        method: "POST",
        body: JSON.stringify({
          "name": this.name,
          "surname": this.surname,
          "username": this.username,
          "password": this.password,
          "type": this.type
        }),
        headers: {
          "Content-Type": "application/json"
        },
      })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            if(data.status === "success"){
              alert("User is created")
              console.log("done")
              this.$router.push('list')
            }
            else if(data.error === "Email is in database"){
              alert("Register failed: Email is in database")
              this.$router.push('home')

            }
          });


      event.preventDefault()
    }
  }
}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#name {
  margin-left: 29px;
}


</style>
