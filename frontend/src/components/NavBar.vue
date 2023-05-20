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
              กรุณากรอกชื่อจริง
            </p>
            <p class="help is-danger" v-if="!$v.sign_fname.minLength">จำนวนตัวอักษรมากกว่า 4 ตัว</p>
            <p class="help is-danger" v-if="!$v.sign_fname.maxLength">จำนวนตัวอักษรน้อยกว่า 16 ตัว</p>
            <p class="help is-danger" v-if="!$v.sign_fname.alphaNum">อย่าเว้นช่อง</p>
            <p class="help is-danger" v-if="!$v.sign_fname.word">ตัวอักษรเท่านั้น</p>
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
              กรุณากรอกนามสกุล
            </p>
            <p class="help is-danger" v-if="!$v.sign_lname.minLength">จำนวนตัวอักษรมากกว่า 4 ตัว
</p>
            <p class="help is-danger" v-if="!$v.sign_lname.maxLength">จำนวนตัวอักษรน้อยกว่า 16 ตัว</p>
            <p class="help is-danger" v-if="!$v.sign_lname.alphaNum">อย่าเว้นช่อง</p>
            <p class="help is-danger" v-if="!$v.sign_lname.word">ตัวอักษรเท่านั้น</p>
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
              กรุณากรอกเบอร์โทรศัพท์
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
              กรุณากรอกวันเกิด

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
              กรุณากรอกอีเมล

            </p>
            <p class="help is-danger" v-else-if="!$v.sign_email.email">
              กรูณาใส่อีเมลให้ถูกต้อง
            </p>
            <!-- <p class="help is-danger" v-else-if="!$v.sign_email.minLength"> 10</p> -->
          </template>
        </div>

        <div class="field">
          <label class="label">Username</label>
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
              กรุณากรอก username
            </p>
            <p class="help is-danger" v-else-if="!$v.sign_username.maxLength">
              จำนวนตัวอักษรน้อยกว่า 26 ตัว
            </p>
            <p class="help is-danger" v-else-if="!$v.sign_username.minLength">
              จำนวนตัวอักษรมากกว่า 4 ตัว
              
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
              กรุณากรอกรหัสผ่าน
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
        <template v-if="error">
          
            <p class="help is-danger" >
              {{ error }}
            </p>
          </template>
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

              <div class="navbar-brand" v-if=" isActive_createAndReport == true">
                <!-- <div class="navbar-end"> -->
                <div class="navbar-item has-dropdown is-hoverable">
                  <a class="navbar-link"> REPORT 
                    <span class="tag is-danger is-badge mb-5">{{CountReports}}</span>
                  </a>
               

                  <div class="navbar-dropdown is-right">
                    <div
                      class="columns"
                      v-for="report in reports"
                      :key="report"
                    >
                      <div class="navbar-item column">
                        {{ report.content }}
                        <div
                          class="button is-primary column"
                          @click="acceptReport(report.report_id)"
                        >
                          accept
                        </div>
                      </div>
                    </div>
                    <div class="columns">
                      <a class="navbar-item column" v-if="reports.length == 0">
                        ไม่มีการร้องเรียนที่ค้างอยู่
                        <!-- <div class="button is-primary column">accept</div> -->
                      </a>
                    </div>
                    <!-- <a class="navbar-item"> Elements </a>
                    <a class="navbar-item"> Components </a> -->
                    <!-- <hr class="navbar-divider" /> -->
                  </div>
                  <!-- </div> -->
                </div>
              </div>

              <a class="button is-dark" v-if="logins == true" href="#/profile">
                <strong>
                  <i class="fas fa-user"> </i> {{ profile.username }}</strong
                >
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
                class="navbar-item button is-info"
                href="http://localhost:8080/#/createRoom/"
                v-if=" isActive_createAndReport == true"
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
import axios from '@/plugins/axios'

import {
  required,
  maxLength,
  minLength,
  sameAs,
  email,
  alphaNum
} from "vuelidate/lib/validators";
// import navbar from '../../component/navbar.vue';
function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}

function word(value){
  if(value.match('^[^0-9]*$')){
    return true
  }
  return false
}


function phone(value) {
  return !!value.match(/0[0-9]{9}/);
}

function ErrDate(value) {
  if (value < this.begin) {
    return false;
  }
  return true;
}

export default {
  // props: ["user"],
  name: "NavBar",

  data() {
    return {
      username: "",
      password: "",
      rooms: null,
      modal: true,
      isActive_Sign_in: false,
      isActive_Sign_up: false,
      isActive_createAndReport: false,
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
      profile: "",
      reports: "",
      CountReports: null
    };
  },

  created() {
   
    this.getUser();
    
    
    if (localStorage.getItem('user') != null) {
      console.log(localStorage.getItem('user').split(' ')[1])
      if(localStorage.getItem('user').split(' ')[1] == 'manager'){
        console.log('true')
        this.isActive_createAndReport = true
        this.logins = true;
      }
      else{
        this.logins = true;
      }
     
    } else {
      console.log('false')
      this.logins = false;
    }

    axios
      .get("http://localhost:3000/report")
      .then((res) => {
        this.reports = res.data.reports;
        this.CountReports = res.data.Countreports[0].CountReport
        console.log(this.CountReports)
      })
      .catch((error) => {
        this.error = error.response.data;

        console.log(error.response.data);
      });
  },

  validations: {
    sign_fname: {
      required: required,
      maxLength: maxLength(15),
      minLength: minLength(5),
      alphaNum : alphaNum,
      word : word
    },
    sign_lname: {
      required: required,
      maxLength: maxLength(15),
      minLength: minLength(5),
      alphaNum : alphaNum,
      word : word
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
    begin: {
      required: required,
    },
    end: {
      required: required,
      ErrDate: ErrDate,
    },
  },

  methods: {
    acceptReport(reportId) {
      console.log(reportId);
      axios
        .put(`http://localhost:3000/report/${reportId}`)
        .then((res) => {
          console.log(res);
          this.reports = res.data.reports;
          this.allReports = res.data.allReports;
         
          
          console.log(this.reports)
        })
        .catch((error) => {
          this.error = error.response.data;
          console.log(error.response.data);
        });
    },
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

      console.log(data);
      axios
        .post("http://localhost:3000/user/login", data)
        .then((response) => {
          // location.reload()
          // console.log(response.data)
          const token = response.data.token;
          const role = response.data.user.login_role
          console.log(role);
          // const userProfile = [role, token]
          localStorage.setItem("user", token + ' ' + role);

          if(role == 'manager'){
            this.isActive_createAndReport = true
          }
          this.$emit("auth-change");
          this.getUser();
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
      this.$router.push({path: '/'})
      localStorage.removeItem("user");
      this.isActive_createAndReport = false;
      this.logins = false;
      this.isActive_Sign_in = false;
    },
    signUp() {
      this.$v.$touch();

      if (this.sign_fname != '' && this.sign_lname != '' && this.sign_phone != '' && this.sign_email != '' && this.sign_username != '' && this.confirm_password != '' && this.sign_password != '') {
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

      console.log(data);

      axios
        .post("http://localhost:3000/signUp", data)
        .then((response) => {
          console.log(response);
          this.$v.$reset();

          this.isActive_Sign_in = true;
          this.isActive_Sign_up = false;
        })
        .catch((error) => {
          this.error = error.response.data.details.message;
          console.log(error.response.data.details.message);
        });
      }
    },

    getUser() {
      axios.get("/user/me").then((res) => {
        this.user = res.data;
        this.profile = this.user;
     
        console.log(this.profile)
      }).catch((err) =>{
        console.log(err)
      })
    },
  },
};
</script>

<style></style>
