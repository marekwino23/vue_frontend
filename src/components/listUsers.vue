<template>
  <div>
    <div>
      <p>Panel Admina<p/>
      <input type="button"  @click="onList">
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
          .then(response =>{
            if(response.status === 200){
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

              })

    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>