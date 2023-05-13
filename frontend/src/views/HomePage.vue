<template>
  <div id="home">
    <!-- login signout -->
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
          <i class="fas fa-home"></i>
          Home
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" v-if="logins == true" href="/search">
            ค้นหาห้องพัก
          </a>
        </div>
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
              <a
                class="button is-dark"
                v-if="logins == true"
                href="#/profile"
              >
                <strong>My Profile {{ user.user_name }}</strong>
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
              >
            </div>
          </div>
        </div>
      </div>
    </nav>
    <br /><br /><br />
    <div class="container">
      <div class="card p-6">
        <div class="columns is-centered">
          <div class="column is-4">
            <div class="subtitle is-4">เช็คอิน :</div>
            <div class="">
              <p>{{ begin }}</p>
              <input type="date" class="input" v-model="begin"/>
            </div>
          </div>
          <div class="column is-4">
            <div class="subtitle is-4">เช็คเอ้าท์ :</div>
            <div class="">
              <p>{{ end }}</p>
              <input type="date" class="input"  v-model="end"/>
            </div>
          </div>
          <div class="column is-3">
            <div class="subtitle is-4">จำนวนคน</div>

            <a class="button" @click="minus()">-</a>
            <a class="is-size-4 mx-4" v-if="count > 0">{{ count }}</a>
            <a class="button" @click="count++">+</a>

            <a href="" class="button is-link mx-5">ค้นหา</a>

          </div>

        </div>
      </div>
      <br />

    <!-- </div> -->
    <!-- <div class="container"> -->
      <div class="columns  is-multiline">
        <div class="column is-2.5 card m-2" v-for="room in rooms" :key="room.id">

          <div class="card-image">
            <figure class="image is-4by3">
              <img
                :src="
                  room.pic1
                    ? 'http://localhost:3000' + room.pic1
                    : 'https://i.pinimg.com/originals/22/c0/2f/22c02f8f67b478ef00cb12bcacde588b.jpg'
                "
                alt="Placeholder image"
              />
            </figure>
          </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">{{ room.room_type }}</p>
                  <p class="subtitle is-6">
                    <i
                      class="fas fa-star mt-3"
                      style="font-size: 40px; color: rgb(244, 247, 76)"
                    ></i>
                    <i
                      class="fas fa-star mt-3"
                      style="font-size: 40px; color: rgb(244, 247, 76)"
                    ></i>
                    <i
                      class="fas fa-star mt-3"
                      style="font-size: 40px; color: rgb(244, 247, 76)"
                    ></i>
                    <i
                      class="fas fa-star mt-3"
                      style="font-size: 40px; color: rgb(244, 247, 76)"
                    ></i>
                    <i
                      class="fas fa-star mt-3"
                      style="font-size: 40px; color: rgb(244, 247, 76)"
                    ></i>
                  </p>
                </div>
              </div>
              <div class="content">
                รายละเอียดห้อง
                <br />
                {{ room.description }}
                <p class="title has-text-danger mt-2">
                  THB {{ room.price }} -.
                </p>
              </div>
            </div>
            <footer class="card-footer">
              <a :href="'#/detail/' + room.room_id" class="card-footer-item"
                >เพิ่มเติม</a
              >
              <a :href="'#/booking?room=' + room.room_id + ' ' + begin + ' ' + end" class="card-footer-item">จองเลย</a>
            </footer>
          </div>
        </div>

      </div>
    <br />
    <br />
    <br />
    <br />

    <!-- Contact -->
    <div class="container">
      <div class="columns">
        <div class="column is-7">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15513.042363639155!2d100.653445!3d13.580884599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d5fb6535ef921%3A0x92a8402c649e96b8!2z4LiV4Lil4Liy4LiU4LmA4LiL4LmI4LmA4Lin4LmI4LiZ!5e0!3m2!1sth!2sth!4v1679677449385!5m2!1sth!2sth"
            width="100%"
            height="500"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div class="column is-5">
          <p class="title is-5 has-text-centered">Contact Me</p>
          <p class="subtitle is-6">
            Tell : <br />
            Facebook : <br />
            Instargram : <br />
            E-mail : <br />
          </p>
        </div>
      </div>
    </div>
    <br />
    <footer class="footer" style="background-color: black">
      <!-- Start Footer Top -->
      <div class="footer-top">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-4 col-12">
              <!-- Single Widget -->
              <div class="single-footer" style="color: whitesmoke">
                <p>Alway make you happy by providing the best option for you</p>
                <ul class="social">
                  <br />
                  <li>
                    <a href=""
                      ><i
                        class="fab fa-facebook"
                        style="font-size: 40px; margin-right: 10px"
                      ></i
                    ></a>
                    <a href=""
                      ><i class="fab fa-instagram" style="font-size: 40px"></i
                    ></a>
                  </li>
                </ul>
                <!-- <p class="copyright-text">Designed and Developed by <a href="https://uideck.com/"
                                    rel="nofollow" target="_blank">UIdeck</a>
                            </p> -->
              </div>
              <!-- End Single Widget -->
            </div>
          </div>
        </div>
      </div>
      <!--/ End Footer Top -->
    </footer>
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
function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}

function phone(value) {
  return  !!value.match(/0[0-9]{9}/);
}

export default {
  props: ["user"],
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
      begin: '',
      end : ''
    };
  },

  created() {
    console.log(this.user);
    if (localStorage.getItem("user") != null) {
      this.logins = true;
    } else {
      this.logins = false;
      // this.isActive_Sign_in = true;
    }
    axios
      .get("http://localhost:3000/")
      .then((response) => {
        this.rooms = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
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
      maxLength: maxLength(10)
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
  },
  methods: {
    minus() {
      if (this.count > 1) {
        this.count--;
      }
    },
    Close() {
      this.isActive_Sign_in = false;
      this.isActive_Sign_up = false;
      this.username = "";
      this.password = "";
      this.error = "";
     this.sign_fname = "",
       this.sign_lname = "",
       this.sign_phone = "",
       this.sign_dob = "",
       this.sign_email = "",
       this.sign_username = "",
       this.sign_password = "",
       this.confirm_password = "",
        this.$v.$reset();
    },
    login() {
      var data = {
        username: this.username,
        password: this.password,
      };
      axios
        .post("http://localhost:3000/user/login", data)
        .then((response) => {
          // console.log(response.data)
          const token = response.data.token;
          localStorage.setItem("user", token);
          this.$emit("auth-change");
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

      if (!this.$v.$invalid) {

        var data = {
          fname : this.sign_fname,
          lname : this.sign_lname,
          phone : this.sign_phone,
          dob : this.sign_dob,
          email : this.sign_email,
          username : this.sign_username,
          confirm_password: this.confirm_password,
          password : this.sign_password
        }

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

      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: "Queensides", sans-serif;
}
</style>
