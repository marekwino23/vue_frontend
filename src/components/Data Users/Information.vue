<template>
  <div>
    <div>
      <p style="color: white">User data
      <p/>
      <br>
      <br>
      <form @submit="addEmail" action="http://localhost:8000/onchangeEmail">
      <ul>
        <li class="info"> Name: {{ name }}</li>
        <br>
        <li class="info"> Surname:{{ surname }}</li>
        <br>
        <li class="info"> Email: {{email}}</li>
        <br>
        <li class="info">Second Email: {{oldEmail}} </li>
        <br>
          <li class="info"> <input type="text" v-model="secondEmail" id="newEmail"> <input type="submit" value="change"> </li>
        <br>
        <br>
   <li class="info"> Password: <input type="text" id="newPassword"> <input type="button" value="change password" @click="onchangePassword">
      </li>
        <br>
        <br>
        <li class="info">Typeofaccount: {{type}} </li>
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
      id:'',
      name: '',
      type:'',
      surname: '',
      email: '',
      oldEmail: '',
      secondEmail:'',
      password: '',
      code: '',
    }
  },
  mounted() {
    this.id = sessionStorage.getItem("id")
    fetch('http://localhost:8000/userInfo/'+this.id,{
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
          this.name = data.name
          this.surname = data.surname
          this.email = data.email
          this.oldEmail = data.secondEmail
          this.password = data.password
          this.type = data.typeUser
        })
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
              this.oldEmail = data.file
              console.log("done")
              this.$router.push('home')
            } else if(data.error === "error") {
              alert("Error: you can t duplicate emails")
            }
          });

    },

    onchangePassword: function () {
      const newPassword = document.getElementById("newPassword").value
      const id = sessionStorage.getItem("id")
      console.log(newPassword)
      fetch('http://localhost:8000/onchangePassword', {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword, id
        })
      })
          .then(response => response.json())
          .then(data => {
            if (data.status === 200) {
              sessionStorage.setItem("newPassword",data.file);
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
ul{
  margin-left:383px;
}

.info{
  color:white;
  font-weight: bold;
}

</style>