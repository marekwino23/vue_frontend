<template>
  <div>
    <div>
      <p>Booking
      <p/>
      <form @submit="onTime">
      <date-picker v-model="date" valueType="format" ></date-picker>
      <vue-timepicker v-model="time" format="HH:mm:ss" ></vue-timepicker>
      <input type="submit" value="Book">
      </form>
    </div>
  </div>
</template>


<script>

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'


export default {
  name: 'book',
  components: {DatePicker, VueTimepicker},
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