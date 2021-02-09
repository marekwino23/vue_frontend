<template>
  <div>
    <div>
      <p>Panel Admina<p/>
      <table>
        <th> id</th>
        <th> name</th>
        <th> surname </th>
        <th> email </th>
        <th>secondEmail</th>
        <th>code</th>
        <th>typeUser</th>
        <tr v-for="list in lists" :key="list.id">
         <td>{{list.id}}</td>
          <td>{{list.name}}</td>
          <td>{{list.surname}}</td>
          <td>{{list.email}}</td>
          <td>{{list.secondEmail}}</td>
          <td>{{list.code}}</td>
          <td>{{list.typeUser}}</td>
          <input type="button" value="delete" @click="deleteRow(list, list.id)">
          <input type="button" value="edit" @click="editUser(list)">
        </tr>
        <input type="button" value="add user" @click="addUser">
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
              this.$router.push('home')
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
</style>