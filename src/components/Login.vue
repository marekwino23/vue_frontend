<template>
  <div class="login">
    <p>Logowanie</p>
    <br>
    <form action="http://localhost:8000/login" @submit="onAuth()">
      <label>Username </label>
      <input type="text" name="username" required id="username" v-model="username">
      <br>
      <br>
      <label>Password </label>
      <input type="password" name="password" required min="8" id="password" v-model="password">
      <br>
      <br>
      <br>
      <select name="type" id="type" v-model="type">
        <option value="Administrator">Administrator</option>
        <option value="User">Users</option>
      </select>
      <br>
      <br>
      <input type="button" value="Forgotten password" v-on:click="Forgot" >
      <br>
      <br>
      <input type="submit" value="submit">
    </form>
  </div>
</template>
<script>




export default {
  name: 'Login',
  components: {},
  updated() {

  },
  data() {
    return {
      res: "",
      username:'',
      password:'',
      status:'',
      element:'',
      type: '',
      info:'',
    }
  },

  methods: {

    Forgot: function(){
      const email = document.getElementById("username").value
      this.data = fetch('http://localhost:8000/forgot', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email
        })
      })
          .then(res => {
            this.data = res.json
            return res;
          })
          .then(res => {
            console.log(res.status);
            if(res.status === 200){
              console.log("done")
              this.$router.push('/valid')
            }
            else{
              console.log("failed")
            }
          });

    },

    onAuth: function () {
      const email = document.getElementById("username").value
      const password = document.getElementById("password").value
      const type = document.getElementById("type").value
      sessionStorage.setItem('Current user', email);
       fetch('http://localhost:8000/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email, password, type
        })
      })

           .then(response => response.json())
           .then(data => {
             console.log('Success:', data);
             if(data.status === "Login complete"){
               console.log("done")
               this.status = data.file
               sessionStorage.setItem('type', this.status);
               alert(`Hello ${this.status}`)
               this.$router.push("home")
             }
             else{
               console.log("failed")
             }
           })
           .catch((error) => {
             console.error('Error:', error);
           });
    },

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
