<template>
  <div>
    <div id="app">
      <img alt="Register" width = 20% src="../../assets/obrazek.png">
    </div>
    <div id="create">
      <p style="color:white; font-weight: bold">Register</p>
      <br>
      <form @submit="onsubmit" method="post">
        <div id="name">
          <label class="place">Name</label>
          <input type="text" class="field" name="name" required value="name" v-model="name">
        </div>
        <br>
        <br>
        <label class="place">Surname </label>
        <input type="text" name="surname" class="field" required value="surname" v-model="surname">
        <br>
        <br>
        <label class="place">Email </label>
        <input type="email" name="email" id="email" class="field" required v-model="username">
        <br>
        <br>
        <label class="place">Check email</label>
        <br>
        <input type="button" class="button" v-on:click="onCheck" v-model="check"/>
        <br>
        <br>
        <label class="place">Password</label>
        <input type="password" name="password" class="field" required min="8" value="password" v-model="password">
        <br>
        <br>
        <label class="place">TypeUser</label>
        <br>
        <select v-model="type">
          <option>User</option>
          <option>Creator</option>
        </select>
        <br>
        <label class="place"> Validation</label>
        <br>
        <input type="button" class="button" v-on:click="checkform" v-model="validation"/>
        <br>
        <br>
        <br>
        <input type="submit" class="sub" value="submit" :disabled='validation === "off"'>
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
        this.$swal.fire("email is free")
        console.log(check)
      } else {
        this.$swal.fire("email is busy")
      }
    },

    checkform() {
      if (this.username === "" || this.password === "" || this.name === "" || this.surname === "" || this.type === "" ) {
        this.$swal.fire("please to complete your form or check your email")
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
          "type": this.type,
        }),
        headers: {
          "Content-Type": "application/json"
        },
      })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            if(data.status === "success"){
              this.$swal.fire("User is created")
              console.log("done")
              this.$router.push('login')
            }
            else if(data.error === "Email is in database"){
              this.$swal.fire("Register failed: Email is in database")
              this.$router.push('register')

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

.field[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  box-sizing: border-box;
}

input[type=email], [type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  box-sizing: border-box;
}

.sub[type=submit] {
  width: 100%;
  background-color: #62e7ee;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button{
  background-color: #62e7ee; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
input[type=button]:hover {
  background-color: #EBE3B0;
}

input[type=submit]:hover {
  background-color: #45a049;
}

div {
  border-radius: 5px;
  padding: 20px;
}
.place{
  color:white;
  font-weight: bold;
  text-align: center;
}




</style>
