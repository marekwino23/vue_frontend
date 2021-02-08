<template>
  <div>
    <div>
      <p>Panel Admina
      <p/>
      <br>
      <br>
      <table>
        <th>id</th>
        <th>name</th>
        <th>surname</th>
        <th>email</th>
        <th>secondEmail</th>
        <th>password</th>
        <th>typeUser</th>
        <tr v-for="list in lists" :v-if="lists" :key="list">
          <td>{{ list.id }}</td>
          <td>{{ list.name }}</td>
          <td>{{ list.surname }}</td>
          <td>{{ list.email }}</td>
          <td>{{ list.secondEmail }}</td>
          <td>{{ list.password }}</td>
          <td>{{ list.typeUser }}</td>
          <input type="button" value="delete" @click="deleteRow(lists,list.id)"> <input type="button" @click="editUser(list.id)" value="edit">
        </tr>
<!--        <tr v-for="table in tables" :v-if="tables" :key="table">-->
<!--          <td>{{ table.id }}</td>-->
<!--          <td>{{ table.name }}</td>-->
<!--          <td>{{ table.surname }}</td>-->
<!--          <td>{{ table.email }}</td>-->
<!--          <td>{{ table.secondEmail }}</td>-->
<!--          <td>{{ table.password }}</td>-->
<!--          <td>{{ table.typeUser }}</td>-->
<!--          <input type="button" value="delete" @click="deleteRow(tables,table.id)"> <input type="button" @click="editUser" value="edit">-->
<!--        </tr>-->
        <input type="button" value="add">
      </table>
      <input type="button" @click="onList">
    </div>
  </div>
</template>
<script>


export default {
  name: 'Admin',
  components: {},
  updated() {

  },
  data() {
    return {
      lists: [],
      tables: [],
    }
  },
  methods: {
    onList: function () {
      fetch("http://localhost:8000/List", {
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
            console.log(data.user[0])
            const users = [{
              id: data.user[0].id,
              name: data.user[0].name,
              surname: data.user[0].surname,
              email: data.user[0].id,
              secondEmail: data.user[0].secondEmail,
              password: data.user[0].secondEmail,
              code: data.user[0].code,
              typeUser: data.user[0].typeUser,
            }]
            console.log(users)
            this.lists = users


            // const persons = [{
            //   id: data.user[1].id,
            //   name: data.user[1].name,
            //   surname: data.user[1].surname,
            //   email: data.user[1].id,
            //   secondEmail: data.user[1].secondEmail,
            //   password: data.user[1].secondEmail,
            //   code: data.user[1].code,
            //   typeUser: data.user[1].typeUser,
            // }]
            // console.log(persons)
            // this.tables = persons

          })
    },

    editUser: function(id){
      console.log(id);
      fetch('http://localhost:8000/dataDownload', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id
        })
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

    deleteRow: function (table) {
      console.log(table)
      fetch('http://localhost:8000/deleteRow', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table
        })
      })
          .then(response => response.json())
          .then(data => {
            if (data.status === 200) {
              console.log("done")
              this.$router.push('home')
            } else if (data.error === "error") {
              alert("you can t delete this row")
            }
          });
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

table {
  border-collapse: collapse;
}
</style>