<template>
  <div>
    <div>
      <p>User data
      <p/>
      <br>
      <br>
      <form @submit="addEmail" action="http://localhost:8000/onchangeEmail">
      <ul>
        <li> Name: {{ name }}</li>
        <li> Surname:{{ surname }}</li>
        <li> Email: {{email}}</li>
        <br>
        <li> Second Email: <input type="text" v-model="secondEmail" id="newEmail"> <input type="submit" value="change email"> </li>
<!--        <li> Password: <input type="text" id="newPassword"> <input type="button" value="change password" @click="onchangePassword"></li>-->
      </ul>
        </form>
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
      name: '',
      surname: '',
      email: '',
      secondEmail:'',
      password: '',
      code: '',
    }
  },
  mounted() {
    this.name = sessionStorage.getItem("name")
    this.surname = sessionStorage.getItem("surname")
    this.email = sessionStorage.getItem("email")
    this.secondEmail = sessionStorage.getItem("newEmail")
  },
  methods: {
    addEmail: function () {
      const id = sessionStorage.getItem("id")
      const newEmail = document.getElementById("newEmail").value
      sessionStorage.setItem("newEmail", newEmail)
      console.log(newEmail)
      fetch('http://localhost:8000/addEmail', {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newEmail, id
        })
      })
          .then(response => response.json())
          .then(data => {
            if (data.status === 200) {
              this.secondEmail = data.file
              console.log("done")
              this.$router.push('home')
            } else if(data.error === "error") {
              alert("Error: you can t duplicate emails")
            }
          });

    },

    onchangePassword: function () {
      const newPassword = document.getElementById("newPassword").value
      console.log(newPassword)
      fetch('http://localhost:8000/onchangePassword', {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword,
        })
      })
          .then(response => response.json())
          .then(data => {
            if (data.status === 200) {
              this.secondEmail = data.file
              console.log("done")
              this.$router.push('home')
            } else {
              console.log("failed")
            }
          });
    },
  }
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>