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

    </nav>

    <div class="box modal-content" style="margin-top : 300px" v-if="isActive_username == true">
        <div class="field">
          <label class="label has-text-centered">เมลที่ใช้ลงทะเบียน</label>
        </div>
        <div class="field">
          <h1 class="label">Username</h1>
          <div class="control">
            <input
              class="input"
              type="email"
              placeholder="username"
              v-model="username"
            />
          </div>
          <!-- {{ error }} -->
          <br>
          <template v-if="error">
            <!-- <p class="help is-danger" v-if="!$v.confirm_password.required">This field is required</p> -->
            <p
          v-if="error"
          class="px-3 py-2 mb-3 has-text-danger-dark has-background-danger-light"
        >
          {{ error }}
        </p>
          </template>
        </div>




        <a class="button is-primary" value="submit" @click="forgot()">next</a>

    </div>


    <div class="box modal-content" style="margin-top : 300px" v-if="isActive_Password == true">
        <div class="field">
          <label class="label has-text-centered">Password</label>
        </div>
        <div class="field">
          <h1 class="label">Password</h1>
          <div class="control">
            <input
              class="input"
              type="password"
              placeholder="***********"
              :class="{ 'is-danger': $v.password.$error }"
              v-model="$v.password.$model"
            />
          </div>
          <template v-if="$v.password.$error">
            <p class="help is-danger" v-if="!$v.password.required">This field is required</p>
            <p class="help is-danger" v-else-if="!$v.password.minLength">
               ห้ามน้อยกว่า 8 ตัว
            </p>
            <p class="help is-danger" v-else-if="!$v.password.complex">
               รหัสง่ายไปนะครับ
            </p>
          </template>
        </div>
        <div class="field">
          <h1 class="label">  Comfirm Password</h1>
          <div class="control">
            <input
              class="input"
              type="password"
              placeholder="***********"
              :class="{ 'is-danger': $v.confirm_password.$error }"
              v-model="$v.confirm_password.$model"
            />
          </div>
          <template v-if="$v.confirm_password.$error">
            <!-- <p class="help is-danger" v-if="!$v.confirm_password.required">This field is required</p> -->
            <p class="help is-danger" v-if="!$v.confirm_password.sameAs">
              รหัสไม่เหมือนกัน
            </p>
          </template>
        </div>

        <!-- <div class="field">
          <label class="label">confirm_password</label>
          <div class="control">
            <input
              class="input"
              :class="{ 'is-danger': $v.confirm_password.$error }"
              type="password"
              placeholder="********"
              v-model="$v.confirm_password.$model"
            />
          </div>
          <template v-if="$v.confirm_password.$error"> -->
            <!-- <p class="help is-danger" v-if="!$v.confirm_password.required">This field is required</p> -->
            <!-- <p class="help is-danger" v-if="!$v.confirm_password.sameAs">
              รหัสไม่เหมือนกัน
            </p>
          </template> -->




        <a class="button is-primary" value="submit" @click="editPass()">next</a>

    </div>





  </div>
</template>

<script>
import axios from "@/plugins/axios";

import {
  required,
  minLength,
  sameAs,
} from "vuelidate/lib/validators";
function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}

export default {
    data() {
    return {
      password : '',
      confirm_password : '',
      rooms: null,
      modal: true,
      isActive_Password : false,
      isActive_username : true,
      isActive_Sign_in: false,
      isActive_Sign_up: false,
      username: "",
      error: "",

    };
  },
  validations: {

    password: {
      required: required,
      minLength: minLength(8),
      complex: complexPassword,
    },
    confirm_password: {
      sameAs: sameAs("password"),
    },
    username:{
      required: required
    }
  },

  methods: {
      forgot(){
        this.$v.$touch();

        // this.error = 'ใส่ข้อมูล'

        if(this.username != ''){

        var data ={
            username : this.username
        }

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
         this.$v.$reset();
     }

      }).catch(error =>{
         console.log(error.response.data)
         this.error = error.response.data
      })
      },
      editPass(){
        // console.log(this.confirm_password)
        this.$v.$touch();
          if(!this.$v.$invalid){
        var data = {
            username : this.username,
            password : this.password,
            confirm_password : this.confirm_password
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
}
</script>

<style>

</style>