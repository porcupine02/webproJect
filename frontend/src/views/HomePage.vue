<template>
  <div id="home">
    <div>
      <NavBar />
    </div>

    <br /><br /><br />
    <div class="container">
      <div class="card p-6">
        <div class="columns is-centered">
          <div class="column is-4">
            <div class="subtitle is-4">เช็คอิน :</div>
            <div class="">
              <p>{{ begin }}</p>

              <input
                class="input"
                type="date"
                v-model="$v.begin.$model"
                :min="dateNow"
              />
            </div>
            <template v-if="$v.begin.$error">
              <p class="help is-danger" v-if="!$v.begin.required">
                This field is required
              </p>
            </template>
          </div>
          <div class="column is-4">
            <div class="subtitle is-4">เช็คเอ้าท์ :</div>
            <div class="">
              <p>{{ end }}</p>
              <input
                type="date"
                class="input"
                :class="{ 'is-danger': $v.end.$error }"
                v-model="$v.end.$model"
                :min="begin"
              />
            </div>
            <template v-if="$v.end.$error">
              <p class="help is-danger" v-if="!$v.end.required">
                This field is required
              </p>
              <p class="help is-danger" v-else-if="!$v.end.ErrDate">
                ใส่เวลาให้น้อยกว่าเริ่มต้น
              </p>
            </template>
          </div>
          <div class="column is-3">
            <div class="subtitle is-4">จำนวนคน</div>

            <a class="button" @click="minus()">-</a>
            <a class="is-size-4 mx-4" v-if="count > 0">{{ count }}</a>
            <a class="button" @click="count++">+</a>

            <a class="button is-link mx-5" @click="serach()">ค้นหา</a>
          </div>
        </div>
      </div>
      <br />

      <!-- </div> -->
      <!-- <div class="container"> -->
      <div class="columns is-centered" v-if="rooms.length == 0">
        <h1>ไม่พบสิ่งที่ต้องการค้นหา</h1>
      </div>
      <div class="columns is-multiline">
        <div
          class="column is-3 card"
          style="margin-left: 6%; margin-bottom: 4%"
          v-for="room in rooms"
          :key="room.id"
        >
          <div v-if="room == ''"></div>
          <div class="card-image">
            <figure class="image is-4by3">
              <img
                :src="
                  room.file_path
                    ? 'http://localhost:3000' + room.file_path
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
              <p class="title has-text-danger mt-2">THB {{ room.price }} -.</p>
            </div>
          </div>
          <footer class="card-footer">
            <a :href="'#/detail/' + room.room_id" class="card-footer-item"
              >เพิ่มเติม</a
            >
            <!-- :href="'#/booking?room=' + room.room_id + ' ' + begin + ' ' + end" -->
            <a @click="booking(room.room_id)" class="card-footer-item"
              >จองเลย</a
            >
            <a :href="`/#/editroom/${room.room_id}`" class="card-footer-item"
              >แก้ไขห้อง</a
            >
          </footer>
        </div>
      </div>
    </div>
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
// import Datepicker from "vuejs-datepicker";

import axios from "@/plugins/axios";
import NavBar from "@/components/NavBar.vue";
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

function ErrDate(value) {
  if (value <= this.begin) {
    return false;
  }
  return true;
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
      begin: "",
      dateNow: "",
      end: "",
      // model: {
      //   date: "",
      // },
      // DatePickerFormat: "dd/MM/yyyy",
      // disabledDates: {
      //   to: new Date(Date.now() - 8640000),
      // },
    };
  },
  // name : 'app',
  components: { NavBar },

  created() {
    // console.log(this.user);
    // if (localStorage.getItem("user") != null) {
    //   this.logins = true;
    // } else {
    //   this.logins = false;

    // }
    axios
      .get("http://localhost:3000/showRoom")
      .then((response) => {
        this.rooms = response.data;
        console.log(this.rooms);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {
    // this.serach()
    const currentDate = new Date();

    const formattedDate = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;
    this.dateNow = formattedDate;
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
    begin: {
      required: required,
    },
    end: {
      required: required,
      ErrDate: ErrDate,
    },
  },
  methods: {
    minus() {
      if (this.count > 1) {
        this.count--;
      }
    },
    // Close() {
    //   this.isActive_Sign_in = false;
    //   this.isActive_Sign_up = false;
    //   this.username = "";
    //   this.password = "";
    //   this.error = "";
    //   (this.sign_fname = ""),
    //     (this.sign_lname = ""),
    //     (this.sign_phone = ""),
    //     (this.sign_dob = ""),
    //     (this.sign_email = ""),
    //     (this.sign_username = ""),
    //     (this.sign_password = ""),
    //     (this.confirm_password = ""),
    //     this.$v.$reset();
    // },
    // login() {
    //   var data = {
    //     username: this.username,
    //     password: this.password,
    //   };
    //   axios
    //     .post("http://localhost:3000/user/login", data)
    //     .then((response) => {
    //       // console.log(response.data)
    //       const token = response.data.token;
    //       localStorage.setItem("user", token);
    //       this.$emit("auth-change");
    //       this.isActive_Sign_in = false;
    //       this.logins = true;
    //       this.username = "";
    //       this.password = "";
    //     })
    //     .catch((error) => {
    //       this.error = error.response.data;
    //       console.log(error.response.data);
    //     });
    // },
    // logOut() {
    //   localStorage.removeItem("user");
    //   this.logins = false;
    //   this.isActive_Sign_in = false;
    // },
    // signUp() {
    //   this.$v.$touch();

    //   // if (!this.$v.$invalid) {
    //     var data = {
    //       fname: this.sign_fname,
    //       lname: this.sign_lname,
    //       phone: this.sign_phone,
    //       dob: this.sign_dob,
    //       email: this.sign_email,
    //       username: this.sign_username,
    //       confirm_password: this.confirm_password,
    //       password: this.sign_password,

    //     };

    //     console.log(data)

    //     axios
    //       .post("http://localhost:3000/signUp", data)
    //       .then((response) => {
    //         console.log(response);

    //         this.isActive_Sign_in = true;
    //         this.isActive_Sign_up = false;
    //       })
    //       .catch((error) => {
    //         this.error = error.response.error;
    //         console.log(error.response.error);
    //       });
    //   // }
    // },
    serach() {
      if (this.begin == "" && this.end == "") {
        this.$v.$touch();
      }
      if (this.begin != "" && this.end != "") {
        axios
          .get("http://localhost:3000", {
            params: {
              begin: this.begin,
              end: this.end,
              people: this.count,
            },
          })
          .then((response) => {
            this.rooms = response.data;
            console.log(this.rooms);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    booking(roomId) {
      this.$v.$touch();
      // if(!this.$v.$invalid){
      if (this.begin != "" && this.end != "") {
        this.$router.push({
          path: "/booking",
          query: {
            room: roomId + " " + this.begin + " " + this.end + " " + this.count,
          },
        });
      }
      // }
    },
  },
};
</script>

<style scoped>
body {
  font-family: "Queensides", sans-serif;
}
</style>
