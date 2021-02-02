<template>
  <div class="login">
    <p>Zmiana hasła</p>
    <br>
    <form action="http://localhost:8000/valid" @submit="Valid()">
      <label> Email </label>
      <input type="text" name="username" id="username" v-model="username">
      <br>
      <br>
      <label>Kod do zmiany hasła </label>
      <input type="text" name="code" min="8" v-model="code">
      <br>
      <br>
      <label>New Password</label>
      <input type="password" name="password" min="6" id="password" v-model="password">
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
      code:'',
    }
  },

  methods: {
    Valid: function(){
      this.data = fetch('http://localhost:8000/valid', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "username": this.username,
          "code": this.code,
          "password": this.password,
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
              this.$router.push('home')
            }
            else{
              console.log("failed")
            }
          });

    },

    onAuth: function () {
      const email = document.getElementById("username").value
      const password = document.getElementById("password").value
      this.data = fetch('http://localhost:8000/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email, password
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
              this.$router.push('home')
            }
            else{
              console.log("failed")
            }
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
