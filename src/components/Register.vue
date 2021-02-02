<template>
  <div>
    <div id="app">
      <img alt="Vue logo" src="../assets/logo.png">
    </div>
    <div id="create">
      <p>Register</p>
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
        <input type="button" v-on:click="oncheck" v-model="check"/>
        <br>
        <br>
        <label>Password</label>
        <input type="password" name="password" required min="8" value="password" v-model="password">
        <br>
        <br>
        <label> Type users </label>
        <select name="type" id="type" v-model="type">
          <option value="Administrator">Administrator</option>
          <option value="User">Users</option>
        </select>
        <br>
        <br>
        <label> Validation</label>
        <input type="button" v-on:click="checkform" v-model="validation"/>
        <br>
        <br>
        <input type="submit" class="check" value="submit" :disabled='validation === "off"'>
      </form>
    </div>
  </div>
</template>
<script>

export default {
  names: 'Register',
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
      check: "check",
      validation: "off"
    }
  },
  methods: {
    oncheck: async () => {
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
        alert("email is free")
      } else {
        alert("email is busy")
      }
    },

    checkform() {
      if (this.username === "" || this.password === "" || this.name === "" || this.surname === "" || this.type === "") {
        alert("please to complete your form")
      } else {
        this.validation = "on"
      }
    },

    onsubmit: function (event) {
      this.res = fetch("http://localhost:8000/register", {
        method: "POST",
        body: JSON.stringify({
          "name": this.name,
          "type": this.type,
          "surname": this.surname,
          "username": this.username,
          "password": this.password
        }),
        headers: {
          "Content-Type": "application/json"
        },
      })
          .then(res => {
            this.data = res.json
            return res;
          })
          .then(res => {
            console.log(res.status);
            if(res.status === 200){
              alert("User is created")
              console.log("done")
              this.$router.push('login')
            }
            else{
              console.log("failed")
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
