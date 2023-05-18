<template>
   <div id="app">
    <div :class="{ modal: modal, 'is-active': isActive_Sign_in }">
      <div class="modal-background"></div>
      <div class="box modal-content">
        <div class="field">
          <label class="label has-text-centered">ล็อคอิน</label>
        </div>
        <div class="field">
          <h1 class="label">Username {{ username }}</h1>
          <div class="control has-icons-left">
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <input
              class="input"
              type="username"
              placeholder="e.g. alex@example.com"
              v-model="username"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Password {{ password }}</label>
          <div class="control has-icons-left">
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
            <input
              class="input"
              type="password"
              placeholder="********"
              v-model="password"
            />
          </div>
        </div>
        <p
          v-if="error"
          class="px-3 py-2 mb-3 has-text-danger-dark has-background-danger-light"
        >
          {{ error }}
        </p>
        <div class="field is-grouped is-grouped">
          <p class="control">
            <a class="button is-primary" @click="login()">เข้าสู่ระบบ</a>
          </p>
          <p class="control">
            <a class="button is-danger" @click="Close()">ปิด</a>
          </p>
        </div>
        <router-link :to="{ name: 'Forgot' }"> ลืมรหัสผ่าน </router-link>
      </div>
    </div>
    <div :class="{ modal: modal, 'is-active': isActive_Sign_up }">
      <div class="modal-background"></div>

      <form class="box modal-content">
        <div class="field">
          <label class="label has-text-centered">สมัครสมาชิก</label>
        </div>

        <div class="field">
          <h1 class="label">First Name{{ sign_fname }}</h1>
          <div class="control">
            <input
              class="input"
              :class="{ 'is-danger': $v.sign_fname.$error }"
              type="text"
              placeholder="Puttipong"
              v-model="$v.sign_fname.$model"
            />
          </div>

          <template v-if="$v.sign_fname.$error">
            <p class="help is-danger" v-if="!$v.sign_fname.required">
              This field is required
            </p>
            <p class="help is-danger" v-if="!$v.sign_fname.minLength">min 5</p>
            <p class="help is-danger" v-if="!$v.sign_fname.maxLength">max 15</p>
          </template>
        </div>
        <div class="field">
          <h1 class="label">Last Name</h1>
          <div class="control">
            <input
              class="input"
              :class="{ 'is-danger': $v.sign_lname.$error }"
              type="text"
              placeholder="Panich"
              v-model="$v.sign_lname.$model"
            />
          </div>
          <template v-if="$v.sign_lname.$error">
            <p class="help is-danger" v-if="!$v.sign_lname.required">
              This field is required
            </p>
            <p class="help is-danger" v-if="!$v.sign_lname.minLength">min 5</p>
            <p class="help is-danger" v-if="!$v.sign_lname.maxLength">max 15</p>
          </template>
        </div>
        <div class="field">
          <label class="label">Phone number</label>
          <div class="control">
            <input
              class="input"
              :class="{ 'is-danger': $v.sign_phone.$error }"
              type="number"
              placeholder="083-3343-xxx"
              v-model="$v.sign_phone.$model"
            />
          </div>
          <template v-if="$v.sign_phone.$error">
            <p class="help is-danger" v-if="!$v.sign_phone.required">
              This field is required
            </p>
            <p class="help is-danger" v-else-if="!$v.sign_phone.sign_phone">
              เบอร์โทรศัพท์ 10 ตัว
            </p>
            <p class="help is-danger" v-else-if="!$v.sign_phone.maxLength">
              เบอร์โทรศัพท์ 10 ตัว
            </p>
          </template>
        </div>
        <div class="field">
          <label class="label">Date</label>
          <div class="control">
            <input
              class="input"
              :class="{ 'is-danger': $v.sign_dob.$error }"
              type="date"
              placeholder="24/07/2002"
              v-model="$v.sign_dob.$model"
            />
          </div>
          <template v-if="$v.sign_dob.$error">
            <p class="help is-danger" v-if="!$v.sign_dob.required">
              This field is required
            </p>
          </template>
        </div>
        <div class="field">
          <h1 class="label">Email</h1>
          <div class="control">
            <input
              class="input"
              :class="{ 'is-danger': $v.sign_email.$error }"
              type="email"
              placeholder="e.g. alex@example.com"
              v-model="$v.sign_email.$model"
            />
          </div>
          <template v-if="$v.sign_email.$error">
            <p class="help is-danger" v-if="!$v.sign_email.required">
              This field is required
            </p>
            <p class="help is-danger" v-else-if="!$v.sign_email.email">
              not email
            </p>
            <!-- <p class="help is-danger" v-else-if="!$v.sign_email.minLength"> 10</p> -->
          </template>
        </div>

        <div class="field">
          <label class="label">User Name</label>
          <div class="control">
            <input
              class="input"
              :class="{ 'is-danger': $v.sign_username.$error }"
              type="text"
              placeholder="Folk"
              v-model="$v.sign_username.$model"
            />
          </div>
          <template v-if="$v.sign_username.$error">
            <p class="help is-danger" v-if="!$v.sign_username.required">
              This field is required
            </p>
            <p class="help is-danger" v-else-if="!$v.sign_username.maxLength">
              25
            </p>
            <p class="help is-danger" v-else-if="!$v.sign_username.minLength">
              5
            </p>
          </template>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input
              class="input"
              :class="{ 'is-danger': $v.sign_password.$error }"
              type="password"
              placeholder="********"
              v-model="$v.sign_password.$model"
            />
          </div>
          <template v-if="$v.sign_password.$error">
            <p class="help is-danger" v-if="!$v.sign_password.required">
              กรุณากรอกข้อมูล
            </p>
            <p class="help is-danger" v-else-if="!$v.sign_password.complex">
              รหัสมีความปลอดภัยน้อย
            </p>
            <p class="help is-danger" v-else-if="!$v.sign_password.minLength">
              จำนวนตัวอักษรมากกว่า 8 ตัว
            </p>
          </template>
        </div>
        <div class="field">
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
          <template v-if="$v.confirm_password.$error">
            <!-- <p class="help is-danger" v-if="!$v.confirm_password.required">This field is required</p> -->
            <p class="help is-danger" v-if="!$v.confirm_password.sameAs">
              รหัสไม่เหมือนกัน
            </p>
          </template>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <a class="button is-primary" value="submit" @click="signUp()"
              >ลงทะเบียน</a
            >
          </div>
          <div class="control">
            <a class="button is-danger" @click="Close()">ปิด</a>
          </div>
        </div>
      </form>
    </div>

    <!-- nav bar -->
    <nav
      class="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
      style="position: fixed; top: 0; width: 100%"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="http://localhost:8080/">
          <strong> <i class="fas fa-home"> </i> Home</strong>
        </a>
      </div>
      <div class="navbar-menu">
        <!-- <div class="navbar-start">
          <a class="navbar-item" v-if="logins == true" href="/search">
            ค้นหาห้องพัก
          </a>
        </div> -->
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons asd">
              <a
                class="button is-info"
                v-if="logins == false"
                @click="isActive_Sign_up = true"
              >
                <strong>สมัครสมาชิก</strong>
              </a>
              <a class="button is-dark" v-if="logins == true" href="#/profile">
                <strong> <i class="fas fa-user"> </i> {{profile.username }}</strong>
              </a>
              <a
                class="button is-dark"
                v-if="logins == false"
                @click="isActive_Sign_in = true"
              >
                ล็อคอิน
              </a>
              <a
                class="button is-danger"
                v-if="logins == true"
                @click="logOut()"
                >ล็อคเอ้า</a
              ><a
                class="navbar-item"
                href="http://localhost:8080/#/createRoom/"
              >
                create
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
   </div>
</template>

<script>
import axios from "@/plugins/axios";



import {
  required,
  maxLength,
  minLength,
  sameAs,
  email,
} from "vuelidate/lib/validators";
// import navbar from '../../component/navbar.vue';
function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}

function phone(value) {
  return !!value.match(/0[0-9]{9}/);
}

function ErrDate(value){
  if(value < this.begin){
    return false
  }
  return true
}

export default {
  // props: ["user"],
  name : "NavBar",

    data() {
        return {
      username: "",
      password: "",
      rooms: null,
      modal: true,
      isActive_Sign_in: false,
      isActive_Sign_up: false,
      logins: false,
      sign_fname: "",
      sign_lname: "",
      sign_phone: "",
      sign_dob: "",
      sign_email: "",
      sign_username: "",
      sign_password: "",
      confirm_password: "",
      error: "",
      count: 1,
      begin: "",
      end: "",
      profile : ''
     
        }
    },

    created(){
       console.log(this.user);
       this.getUser()
       console.log(this.getUser())
    if (localStorage.getItem("user") != null) {
      this.logins = true;
    } else {
      this.logins = false;
     
    }
    },

    
  validations: {
    sign_fname: {
      required: required,
      maxLength: maxLength(15),
      minLength: minLength(5),
    },
    sign_lname: {
      required: required,
      maxLength: maxLength(15),
      minLength: minLength(5),
    },
    sign_phone: {
      required: required,
      sign_phone: phone,
      maxLength: maxLength(10),
    },
    sign_dob: {
      required: required,
    },
    sign_email: {
      required: required,
      email: email,
    },
    sign_username: {
      required: required,
      maxLength: maxLength(25),
      minLength: minLength(5),
    },
    sign_password: {
      required: required,
      minLength: minLength(8),
      complex: complexPassword,
    },
    confirm_password: {
      sameAs: sameAs("sign_password"),
    },
    begin:{
      required: required,
    },
    end :{
      required: required,
      ErrDate : ErrDate
    }
  },
    
    methods:{
        Close() {
      this.isActive_Sign_in = false;
      this.isActive_Sign_up = false;
      this.username = "";
      this.password = "";
      this.error = "";
      (this.sign_fname = ""),
        (this.sign_lname = ""),
        (this.sign_phone = ""),
        (this.sign_dob = ""),
        (this.sign_email = ""),
        (this.sign_username = ""),
        (this.sign_password = ""),
        (this.confirm_password = ""),
        this.$v.$reset();
    },
        login() {
      const data = {
        username: this.username,
        password: this.password,
      };

      console.log(data)
      axios
        .post("http://localhost:3000/user/login", data)
        .then((response) => {
          // console.log(response.data)
          const token = response.data.token;

          console.log(token)
          localStorage.setItem("user", token);
          this.$emit("auth-change");
         this.getUser()
          this.isActive_Sign_in = false;
          this.logins = true;
          this.username = "";
          this.password = "";
        })
        .catch((error) => {
          this.error = error.response.data;
          console.log(error.response.data);
        });
    },
    logOut() {
      localStorage.removeItem("user");
      this.logins = false;
      this.isActive_Sign_in = false;
    },
    signUp() {
      this.$v.$touch();

      // if (!this.$v.$invalid) {
        var data = {
          fname: this.sign_fname,
          lname: this.sign_lname,
          phone: this.sign_phone,
          dob: this.sign_dob,
          email: this.sign_email,
          username: this.sign_username,
          confirm_password: this.confirm_password,
          password: this.sign_password,

        };

        console.log(data)

        axios
          .post("http://localhost:3000/signUp", data)
          .then((response) => {
            console.log(response);

            this.isActive_Sign_in = true;
            this.isActive_Sign_up = false;
          })
          .catch((error) => {
            this.error = error.response.error;
            console.log(error.response.error);
          });
      // }
    },

    getUser(){
      axios.get('/user/me').then((res => {
     
          this.user = res.data
          this.profile = this.user
      }))
    }
    }
}
</script>

<style>

</style>