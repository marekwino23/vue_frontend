<template>
  <div>
    <div>
      <p style="color:white">Sended message<p/>
      <table id="users">
        <th> email</th>
        <th> message </th>
        <th>dateSend</th>
        <th>To</th>
        <tr v-for="message in messages" :key="message.email">
          <td>{{message.personAnswer}}</td>
          <td>{{message.answer}}</td>
          <td>{{message.date_send}}</td>
          <td>{{message.email}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>

export default {
  name: 'received',
  components: {},
  updated() {

  },
  data() {
    return {
      messages: [],
      type:"",
      answer:'',
      date:'',
      id:'',
    }
  },

  methods: {
    answerMessage: function (message){
      console.log(message.id)
      this.date = new Date()
      this.type = sessionStorage.getItem("type")
      this.id = message.id
      console.log(message)
      fetch("http://localhost:8000/answerMessage", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "answer": this.answer,
          "date": this.date,
          "id": this.id,
          "type": this.type
        })
      })
          .then(response => {
            if (response.status === 200) {
              return response.json();
            }
          })
          .then(data => {
            console.log(data.message)
            if (data.message === "answer success") {
              this.$router.push('home')
            } else {
              alert("failed")
            }
          })
    },

    deleteMessage: function (list) {
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
    this.email = sessionStorage.getItem("email")
    fetch("http://localhost:8000/listMessage/"+this.email, {
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
          for(let i=0;i<data.message.length;i++) {
            this.messages= data.message
            console.log(data.message);
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
}

#users td, #users th {
  border: 1px solid #ddd;
  padding: 8px;
}

tr{
  background-color:white;
}

#users tr:nth-child(even){background-color: #f2f2f2;}

#users tr:hover {background-color: #ddd;}

#users th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4CAF50;
  color: white;
}

.btn-group .button {
  background-color: #4CAF50; /* Green */
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