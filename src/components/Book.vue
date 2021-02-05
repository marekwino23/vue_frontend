<template>
  <div>
    <div>
      <p>Blog<p/>
    </div>
  </div>
</template>


<script>




export default {
  name: 'book',
  components: {},
  updated() {

  },
  data() {
    return {
      date: '',
      time: '',
    }
  },
    methods:{
      onTime: function () {
        fetch('http://localhost:8000/addDate', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "date": this.date,
            "time": this.time,
          })
        })
      }
  },
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>