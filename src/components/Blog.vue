<template>
  <div>
    <div>
      <p>Blog
      <p/>
      <textarea name="nazwa" v-model="text" cols="50" rows="10" :disabled='status === "User" '>
      </textarea>
      <input type="button" value="addPost" @click="onBlog" :disabled='status === "User" '>
      <br>
      <br>
      <br>
      <ul v-for="list in lists" :key="list">
        <li> {{ lists }}</li>
      </ul>
    </div>
  </div>
</template>


<script>


export default {
  name: 'blog',
  components: {},
  updated() {

  },
  data() {
    return {
      lists: [],
      text: '',
      status: '',
      id: '',
    }
  },
  mounted() {
    this.status = sessionStorage.getItem("type")
   fetch("http://localhost:8000/updateBlog",{

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
         for(let i=0;i<data.post.length;i++) {
           this.lists.push(data.post[i])
           console.log(data.post[i]);
         }
       })
  },
  methods: {
    onBlog: function () {
      localStorage.setItem("text", this.text)
      localStorage.setItem("status", this.status)
      this.id = sessionStorage.getItem("id")
      fetch('http://localhost:8000/addPost', {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "text": this.text,
          "id": this.id
        })
      })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            console.log(data.posts)
            this.lists.push(data.posts)
            console.log(this.lists)
            localStorage.setItem("text", data.posts)
            localStorage.setItem("status", data.type)

          })
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>