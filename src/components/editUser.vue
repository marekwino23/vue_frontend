<template>
  <div>
    <div>
      <p>Edit User
      <p/>
      <br>
      <br>
      <br>
      <form>
        <div id="name">
          <label>Name</label>
          <input type="text" name="name" required v-model="oldName">
        </div>
        <br>
        <br>
        <label>Surname </label>
        <input type="text" name="surname" required value="surname" v-model="oldSurname">
        <br>
        <br>
        <label>Email </label>
        <input type="email" name="email" id="email" required v-model="oldUsername">
        <br>
        <label>secondEmail </label>
        <input type="email" name="email" required v-model="oldsecondEmail">
        <br>
        <br>
        <label>Password</label>
        <input type="password" name="password" required min="8" value="password" v-model="oldPassword">
        <br>
        <br>
        <select v-model="oldType">
          <option>User</option>
          <option>Creator</option>
        </select>
        <br>
        <br>
        <br>
        <input type="submit" class="check" value="change data">
      </form>
    </div>
  </div>
</template>


<script>


export default {
  name: 'edit',
  components: {},
  updated() {

  },
  data() {
    return {
      name: "",
      oldName:'',
      oldType:'',
      type: '',
      id: '',
      surname: "",
      oldSurname:'',
      username: "",
      oldUsername:"",
      oldPassword:'',
      password: "",
      oldsecondEmail:"",
    }
  },
  mounted() {
    this.oldName = localStorage.getItem("name")
    this.oldSurname = localStorage.getItem("surname")
    this.oldUsername = localStorage.getItem("email")
    this.oldsecondEmail = localStorage.getItem("secondEmail")
    this.oldPassword = localStorage.getItem("password")
    this.oldType = localStorage.getItem("type")
    },

  methods: {
    editUser: function () {
      fetch('http://localhost:8000/editUser', {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          this.oldName,this.oldSurname
        )
      })
          .then(response => {
            if (response.status === 200) {
              return response.json();
            }
          })
          .then(data => {
            console.log(data)
            localStorage.setItem("name", data.name)
            localStorage.setItem("surname", data.surname)
            localStorage.setItem("email", data.email)
            localStorage.setItem("secondEmail", data.secondEmail)
            localStorage.setItem("password", data.password)
            localStorage.setItem("type", data.type)
            this.$router.push('edit')
          })
    },
  }
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>