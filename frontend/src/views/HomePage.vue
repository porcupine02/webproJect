<template>
  <div id="home">
    <div>
      <NavBar />
    </div>


    <br>
    <br>
    <br>

    <div>
      <div class="steps is-centered">
        <div class="step-item is-active">
          <div class="step-marker"><span class="icon">
            <i class="fa fa-bed" aria-hidden="true"></i>
            </span></div>

          <div class="step-details">
            <p class="step-title">เลือกห้องที่ต้องการ</p>
          </div>
        </div>

        <div class="step-item">
          <div class="step-marker"> <span class="icon">
              <i class="fa fa-user"></i>
            </span></div>
          <div class="step-details">
            <p class="step-title">กรอกข้อมูลส่วนตัว</p>
          </div>
        </div>

        <div class="step-item">
          <div class="step-marker"><span class="icon">
            <i class="fa fa-check"></i>
          </span></div>
          <div class="step-details">
            <p class="step-title">ยืนยันการจ่ายเงิน</p>
          </div>
        </div>
      </div>

      <!-- <ul class="steps">
        <li class="steps-segment">
          <a href="#" class="steps-marker"></a>
        </li>
        <li class="steps-segment">
          <a href="#" class="steps-marker"></a>
        </li>
        <li class="steps-segment is-active">
          <span class="steps-marker"></span>
        </li>
        <li class="steps-segment">
          <span class="steps-marker"></span>
        </li>
        <li class="steps-segment">
          <span class="steps-marker"></span>
        </li>
      </ul> -->
    </div>

    <br /><br /><br />
    <div class="container">
      <div class="card p-6">
        <div class="columns is-centered">
          <div class="column is-4">
            <div class="subtitle is-4">เช็คอิน :</div>
            <div class="">
              <!-- <p>{{ begin }}</p> -->

              <input
                class="input"
                type="date"
                v-model="$v.begin.$model"
                :min="dateNow"
                :class="{ 'is-danger': $v.begin.$error }"
              />
            </div>
            <template v-if="$v.begin.$error">
              <p class="help is-danger" v-if="!$v.begin.required">
                กรูณากรอกเวลา
              </p>
            </template>
          </div>
          <div class="column is-4">
            <div class="subtitle is-4">เช็คเอ้าท์ :</div>
            <div class="">
              <!-- <p>{{ end }}</p> -->
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
                กรูณากรอกเวลา
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





    <br>
    <br>


      <!-- </div> -->
      <!-- <div class="container"> -->
      <div class="columns is-centered" v-if="rooms.length == 0">
        <h1>ไม่พบสิ่งที่ต้องการค้นหา</h1>
      </div>
      <div class="columns is-multiline">
        <div
          class="column is-3 card"
          style="margin-left: 6%; margin-bottom: 4%"
          v-for="(room, index) in rooms"
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
              v-for="item in rateRoom[index]"
              :key="item"

              class="fa fa-star mt-3"
              style="font-size: 30px; color: rgb(244, 247, 76)"
            ></i>
            <i
              v-for="item in 5 - rateRoom[index]"
              :key="item"
              class="fa fa-star mt-3"
              style="font-size: 30px; color: rgb(188, 188, 165)"
            ></i>
                </p>
              </div>
            </div>
            <div class="content">
              <!-- รายละเอียดห้อง
              <br /> -->
              {{ room.description.substring(0, 150) + "..." }}
              <p class="title has-text-danger mt-2">THB {{ room.price }} -.</p>
            </div>
          </div>
          <footer class="card-footer">
            <a :href="'#/detail/' + room.room_id" class="card-footer-item"
              >เพิ่มเติม</a
            >
            <!-- :href="'#/booking?room=' + room.room_id + ' ' + begin + ' ' + end" -->
            <a @click="booking(room.room_id)" class="card-footer-item" v-if="Active_booking == true"
              >จองเลย</a
            >

            <!-- <a
              :href="`/#/editroom/${room.room_id}`"
              v-if="CheckRole()"
              class="card-footer-item"
              >แก้ไขห้อง</a
            > -->
          </footer>
        </div>
      </div>
    </div>
    <br />
    <br />
    <br />

    <!-- Contact -->
    <div class="container p-6">
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

    <div>
      <FooterBar />
    </div>

  </div>
</template>

<script>
// import Datepicker from "vuejs-datepicker";

import axios from "@/plugins/axios";
import NavBar from "@/components/NavBar.vue";
import FooterBar from "@/components/FooterBar.vue";
import "bulma/css/bulma.min.css";
import "bulma-steps/dist/css/bulma-steps.min.css";



import bulmaSteps from "bulma-steps/dist/js/bulma-steps.min.js";




document.addEventListener("DOMContentLoaded", function () {
  // Get all the step items
  var steps = document.querySelectorAll(".steps .step-item");

  // Initialize the steps component
  bulmaSteps.attach(steps);
});

import { required } from "vuelidate/lib/validators";
// import navbar from '../../component/navbar.vue';

function ErrDate(value) {
  if (value <= this.begin || value == null) {
    return false;
  }
  return true;
}

export default {
  props: ["user"],
  data() {
    return {
      rooms: null,
      rateRoom : null,
      modal: true,
      isActive_Sign_in: false,
      isActive_Sign_up: false,
      Active_booking : false,
      logins: false,


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
  components: { NavBar, FooterBar },

  created() {
    // console.log(this.user)
    // this.profile = this.user
    // console.log(this.user);
    // if (localStorage.getItem("user") != null) {
    //   this.logins = true;
    // } else {
    //   this.logins = false;

    // }
    axios
      .get("http://localhost:3000/showRoom")
      .then((response) => {
        this.rooms = response.data.roomShow;
        this.rateRoom = response.data.rateArr

        console.log(this.rateRoom);
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

    serach() {
      if (this.begin == "" || this.end == "") {
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
            this.rooms = response.data.roomShow;
        this.rateRoom = response.data.rateArr
            console.log(response.data);
            this.Active_booking = true
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

    CheckRole() {
      console.log(this.user);
      if (!this.user) {
        return false;
      } else if (this.user.login_role == "manager") {
        return true;
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
