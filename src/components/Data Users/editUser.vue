<template>
  <div>
    <div id="app">
      <img alt="Vue logo" width="25%" src="../../assets/obrazek.png">
    </div>
    <div id="create">
      <h2 style="color: white">Edit user</h2>
      <br>
      <form @submit="updateData" method="post">
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
        <input type="button"  class="button"  v-on:click="onCheck" v-model="check"/>
        <br>
        <br>
        <label>Password</label>
        <input type="password" name="password" required min="8" value="password" v-model="password">
        <br>
        <br>
        <label> Validation</label>
        <input type="button" class="button" v-on:click="checkform" v-model="validation"/>
        <br>
        <br>
        <select v-model="type">
          <option>User</option>
          <option>Creator</option>
        </select>
        <br>
        <br>
        <br>
        <input type="submit" class="check" value="Update data" :disabled='validation === "off"'>
      </form>
    </div>
  </div>
</template>
<script>

export default {
  names: 'edit',
  components: {},
  updated() {

  },
  data() {
    return {
      name: "",
      type: '',
      surname: "",
      id: '',
      username: "",
      password: "",
      response: '',
      data: '',
      check: "busy",
      validation: "off",
    }
  },
  mounted() {
    console.log(this.$route.params.id)
    this.id = this.$route.params.id
    fetch('http://localhost:8000/changeData/'+this.id, {
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
          console.log(data)
          for(let i=0;i<data.user.length;i++) {
            console.log(data.user);
            this.name = data.user[0].name
            this.surname = data.user[0].surname
            this.username = data.user[0].email
            this.password = data.user[0].password
            this.type = data.user[0].typeUser

          }
        })
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
      if (this.username === "" || this.password === "" || this.name === "" || this.surname === "" || this.type === "") {
        alert("please to complete your form or check your email")
      } else {
        this.validation = "on"
      }
    },

    updateData: function (event) {
      this.data = fetch("http://localhost:8000/editUser", {
        method: "POST",
        body: JSON.stringify({
          "id": this.id,
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
            if (data.message === "update success") {
              this.$swal.fire("User updated")
              this.$router.push('/list')
              localStorage.clear()
            } else {
              console.error("failed")
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

input[type=text], select {
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

input[type=submit] {
  width: 100%;
  background-color: #467b48;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
label{
  color:white;
}

.button{
  background-color: #467b48; /* Green */
  border: none;
  color: white;
  margin-left: 9px;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
input[type=button]:hover {
  background-color: #45a049;
}

input[type=submit]:hover {
  background-color: #45a049;
}

div {
  border-radius: 5px;
  padding: 20px;
}


</style>
