<template>
  <div>
    <div>
      <h2 style="color: white">Panel Admina</h2>
      <br>
      <table id="users">
        <th> id</th>
        <th> name</th>
        <th> surname </th>
        <th> email </th>
        <th>secondEmail</th>
        <th>code</th>
        <th>typeUser</th>
        <th>Action</th>
        <tr v-for="list in lists" :key="list.id">
         <td>{{list.id}}</td>
          <td>{{list.name}}</td>
          <td>{{list.surname}}</td>
          <td>{{list.email}}</td>
          <td>{{list.secondEmail}}</td>
          <td>{{list.code}}</td>
          <td>{{list.typeUser}}</td>
          <div class="btn-group">
          <input type="button" class="button" value="delete" @click="deleteRow(list, list.id)">
          <input type="button" class="button" value="edit" @click="editUser(list)">
          </div>
        </tr>
        <input type="button" class="button" value="add user" @click="addUser">
      </table>
    </div>
  </div>
</template>
<script>

import Vue from 'vue';
import { VuejsDatatableFactory } from 'vuejs-datatable';

Vue.use( VuejsDatatableFactory );


export default {
  name: 'Admin',
  components: {},
  updated() {

  },
  data() {
    return {
      lists: [],
    }
  },
  methods: {
    addUser: function () {
      this.$router.push('add')
    },

    editUser: function (list){
      console.log(list.id)
      this.$router.push({name: 'edit', params:{id:list.id}})
    },

    deleteRow: function (list) {
      const id = list.id
      console.log(id)
      fetch("http://localhost:8000/deleteRow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id})
      })
          .then(response => {
            if (response.status === 200) {
              return response.json();
            }
          })
          .then(data => {
            console.log(data.message)
            if (data.message === "delete success") {
              this.$swal.fire("Delete user success")
              window.location.href = '/list'
            } else {
              alert("failed")
            }
          })
    },
  },

    mounted() {
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
            console.log(data)
            for(let i=0;i<data.user.length;i++) {
              this.lists= data.user
              console.log(data.user);
            }
          })

    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


#users {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  color:white;
  background-color: #345834;
}

#users td, #users th {
  border: 1px solid #ddd;
  padding: 8px;
}


#users tr:hover {background-color: green;}

#users th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #4CAF50;
  color: white;
}

.btn-group .button {
  background-color: #426944; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  float: left;
}

.btn-group .button:hover {
  background-color: #3e8e41;
}




</style>