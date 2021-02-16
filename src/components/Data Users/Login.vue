<template>
  <div class="login">
    <p>Logowanie</p>
    <br>
    <form action="http://localhost:8000/login" @submit="onAuth()">
      <label>Username </label>
      <input type="text" class="login" name="username" required id="username" v-model="username">
      <br>
      <br>
      <label>Password </label>
      <input type="password" class="login" name="password" required min="8" id="password" v-model="password">
      <br>
      <br>
      <br>
      <div class="btn-login">
      <input type="button" class="button" value="Forgotten password" v-on:click="Forgot">
      </div>
        <br>
        <div class="btn-submit">
        <input type="submit" class="button" value="submit">
        </div>
      <br>
      <br>
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
       fetch('http://localhost:8000/forgot', {
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
      sessionStorage.setItem('Current user', email);
       fetch('http://localhost:8000/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email, password
        })
      })

           .then(response => response.json())
           .then(data => {
             console.log('Success:', data);
             if(data.status === "Login complete" || data.type === "admin" ){
               sessionStorage.setItem("loggedin",true);
               sessionStorage.setItem("name",data.name);
               sessionStorage.setItem("surname",data.surname);
               sessionStorage.setItem("email",data.email);
               sessionStorage.setItem("password",data.password);
               sessionStorage.setItem("id",data.id);
               sessionStorage.setItem("type",data.type);
               sessionStorage.setItem("oldEmail",data.secondEmail);
               console.log(data.type)
               alert(`Success Login` + "Hello" + data.type )
               this.$router.push("home")
             }
             else if(data.status === "Login complete" || data.type === "Creator"){
               sessionStorage.setItem("loggedin",true);
               sessionStorage.setItem("name",data.name);
               sessionStorage.setItem("surname",data.surname);
               sessionStorage.setItem("email",data.email);
               sessionStorage.setItem("password",data.password);
               sessionStorage.setItem("id",data.id);
               sessionStorage.setItem("type",data.type);
               sessionStorage.setItem("secondEmail",data.secondEmail);
               console.log(data.type)
               alert(`Success Login` + "Hello" + data.type )
             }
             else if(data.status === "Login complete" || data.type === "User"){
               sessionStorage.setItem("loggedin",true);
               sessionStorage.setItem("name",data.name);
               sessionStorage.setItem("surname",data.surname);
               sessionStorage.setItem("email",data.email);
               sessionStorage.setItem("password",data.password);
               sessionStorage.setItem("id",data.id);
               sessionStorage.setItem("type",data.type);
               sessionStorage.setItem("secondEmail",data.secondEmail);
               console.log(data.type)
               alert(`Success Login` + "Hello" + data.type )
             }
             else if(data.error === "failed" ) {
               alert("Wrong password or email")
               this.$router.push("register")

             }
           })
    },

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}


.btn-login .button {
  background-color: #4CAF50; /* Green */
  border: none;
  margin-left: 640px;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  float: left;
}

.btn-login .button:hover {
  background-color: #3e8e41;
}

.btn-submit .button {
  background-color: #4CAF50;
  border: none;
  margin-left: 690px;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  float: left;
}

.btn-submit .button:hover {
  background-color: #3e8e41;
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
