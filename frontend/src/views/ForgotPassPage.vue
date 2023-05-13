<template>
  <div id="home">
  

    <!-- nav bar -->
    <nav
      class="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
      style="position: fixed; top: 0; width: 100%"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="http://localhost:8080/">
          <i class="fas fa-home"></i>
          Home
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <a
            class="navbar-item"
            v-if="logins == true"
            href="http://localhost:8080/search"
          >
            ค้นหาห้องพัก
          </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link"> ห้องพักของเรา </a>

            <div class="navbar-dropdown">
              <a class="navbar-item" href="index.html#01"> Standard Room </a>
              <a class="navbar-item" href="index.html#02"> Deluxe Room </a>
              <a class="navbar-item" href="index.html#03"> Suite Room </a>
              <a class="navbar-item" href="index.html#04"> Superior Room </a>
            </div>
          </div>
        </div>
        
      </div>
    </nav>

    <div class="box modal-content" style="margin-top : 300px" v-if="isActive_username == true">
        <div class="field">
          <label class="label has-text-centered">เมลที่ใช้ลงทะเบียน</label>
        </div>
        <div class="field">
          <h1 class="label">Email {{ email }}</h1>
          <div class="control">
            <input
              class="input"
              type="email"
              placeholder="e.g. alex@example.com"
              v-model="sign_username"
            />
          </div>
        </div>


      

        <a class="button is-primary" value="submit" @click="forgot()">next</a>

    </div>


    <div class="box modal-content" style="margin-top : 300px" v-if="isActive_Password == true">
        <div class="field">
          <label class="label has-text-centered">Password</label>
        </div>
        <div class="field">
          <h1 class="label">Password {{ password }}</h1>
          <div class="control">
            <input
              class="input"
              type="password"
              placeholder="e.g. alex@example.com"
              v-model="password"
            />
          </div>
        </div>


      

        <a class="button is-primary" value="submit" @click="editPass()">next</a>

    </div>


    
   

  </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
    return {
      email :'',
      password : '',
      rooms: null,
      modal: true,
      isActive_Password : false,
      isActive_username : true,
      isActive_Sign_in: false,
      isActive_Sign_up: false,
      logins: false,
      sign_fname: "",
      sign_lname: "",
      sign_phone: "",
      sign_dob: "",
      sign_email: "",
      sign_username: "",
      sign_pass: "",
    };
  },

  methods: {
      forgot(){

        var data ={
            username : this.sign_username
        }
         axios.post('http://localhost:3000/forgot', data).then(response => {
            console.log(response.data)
        //    if(response.data.length != undefined){

        //    }
        if(response.data.length == 0){
            console.log("username wrong")
        }
        else{
            console.log('username Pass')
            this.isActive_username = false
            this.isActive_Password = true
        }
            
         }).catch(error =>{
            console.log(error)
         })

         
      },
      editPass(){
        var data = {
            username : this.sign_username,
            password : this.password 
        }
        axios.put('http://localhost:3000/forgot',data).then(response => {
            console.log(response.data)
            this.$router.push({path: '/'})
        }).catch(error =>{
            console.log(error)
        })
      }
  }
}
</script>

<style>

</style>