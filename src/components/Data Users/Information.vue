<template>
  <div>
    <div style="border: 3px solid white">
      <h1 style="color: white; font-weight: bold">User data:
      </h1>
      <br>
      <br>
      <form>
        <div class="row">
          <div class="column" style="background-color:#aaa;">
            <h2>Name</h2>
            <p>{{name}}</p>
          </div>
          <div class="column" style="background-color:#bbb;">
            <h2>Surname</h2>
            <p>{{surname}}</p>
          </div>
          <div class="column" style="background-color:#ccc;">
            <h2>Email</h2>
            <p>{{email}}</p>
          </div>
          <div class="column" style="background-color:#ddd;">
            <h2>Second email</h2>
            <p>{{oldEmail}}</p>
            <input type="text" required class="oldEmail" v-model="secondEmail" id="newEmail"> <input type="button" :disabled='secondEmail === "" ' class="button" @click="addEmail" value="add new Email">
          </div>
          <div class="column" style="background-color:#ddd;">
            <h2>Password</h2>
            <input type="text" required class="password" id="newPassword"> <input type="button" class = "button" value="change password" @click="onchangePassword">
          </div>
          <div class="column" style="background-color:#ddd;">
            <h2>typeUser</h2>
            <p>{{type}}</p>
          </div>
        </div>
        </form>
    </div>
  </div>
</template>


<script>


export default {
  name: 'info',
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
            if (data.info === "update success") {
              this.oldEmail = data.file
              this.$swal.fire("Second email success")
              window.location.href = '/info'
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
            if (data.info === "update success") {
              sessionStorage.setItem("newPassword",data.file);
              this.$swal.fire("Password changed")
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


.button{
  background-color: #39633a; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

.oldEmail, .password {
  text-align: center;
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}


</style>