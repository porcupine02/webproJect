<template>
  <div id="home" class="has-background-light">
    <div>
      <NavBar />
    </div>

    <br />
    <br />
    <br />

   


    <div>
      <div class="steps is-centered">
        <div class="step-item is-active">
          <div class="step-marker">
            <span class="icon">
              <i class="fa fa-bed" aria-hidden="true"></i>
            </span>
          </div>

          <div class="step-details">
            <p class="step-title">เลือกห้องที่ต้องการ</p>
          </div>
        </div>

        <div class="step-item">
          <div class="step-marker">
            <span class="icon">
              <i class="fa fa-user"></i>
            </span>
          </div>
          <div class="step-details">
            <p class="step-title">กรอกข้อมูลส่วนตัว</p>
          </div>
        </div>

        <div class="step-item">
          <div class="step-marker">
            <span class="icon">
              <i class="fa fa-check"></i>
            </span>
          </div>
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
        <div class="columns is-centered " >
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
                กรุณากรอกเวลา
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
                กรุณากรอกเวลา
              </p>
              <p class="help is-danger" v-else-if="!$v.end.ErrDate">
                ใส่เวลาให้น้อยกว่าเริ่มต้น
              </p>
            </template>
          </div>
          <div class="column is-3">
            <div class="subtitle is-4">จำนวนคน</div>

            <a class="button" @click="minus()"><i class="fa fa-minus" aria-hidden="true"></i></a>
            <a class="is-size-4 mx-4" v-if="count > 0">{{ count }}</a>
            <a class="button" @click="count++"><i class="fa fa-plus" aria-hidden="true"></i></a>

            <a class="button is-link mx-5" @click="serach()">  <span class="icon">
    <i class="fas fa-search"></i>
  </span>
  <span>ค้นหา</span></a>
          </div>
        </div>
      </div>
      <br />

      <br />
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
              {{ room.description.substring(0, 100) + "..." }}
              <p class="title has-text-danger mt-2">THB {{ room.price }} -.</p>
            </div>
          </div>
          <footer class="card-footer mb-0">
            <a :href="'#/detail/' + room.room_id" class="card-footer-item" 
              >เพิ่มเติม</a
            >
        
            <a
              @click="booking(room.room_id)"
              class="card-footer-item"
              v-if="Active_booking == true"
              >จองเลย</a
            >
          </footer>
        </div>
      </div>
    </div>
    <br />
    <br />
    <br />

    <section>
      <div class="container">
        <h3 class="title has-text-centered is-size-4">Rating Rooms</h3>
        <div class="columns is-centered is-size-5" v-if="topRoom.length == 0">
        <h1>ไม่มีการคอมเมนต์จากลูกค้า</h1>
      </div>
        <div class="columns mt-5 is-8 is-variable" v-else>
          <div
            class="column is-4-tablet is-3-desktop"
            v-for="(room, index) in detailTop"
            :key="room"
          >
            <div class="card">
              <!-- <div class="card-image has-text-centered px-6">
               
                 <span class="tag is-danger is-badge mb-5">{{CountReports}}</span>
                </div> -->
              <div class="image is-relative  is-4by3">
                <img
                :src="
                  room.file_path
                    ? 'http://localhost:3000' + room.file_path
                    : 'https://i.pinimg.com/originals/22/c0/2f/22c02f8f67b478ef00cb12bcacde588b.jpg'
                "
                alt="Placeholder image"
              />
                <span class="tag is-primary is-size-6" style="position:absolute; margin-left: 240px;">{{ topRoom[index].result }}</span>
              </div>
              <div class="card-content">
                <p>THB {{ room.price }} -.</p>
                <p class="title is-size-5">{{ room.room_type }}</p>
              </div>
              <footer class="card-footer">
                <div class="card-footer-item">
                  <a  :href="'#/detail/' + room.room_id">เพิ่มเติม</a>
                </div>
              </footer>
            </div>
          </div>
        </div>
       
      </div>
    </section>

    <br>
    <br>

    <div>
      <InfoBar/>
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
import InfoBar from "@/components/InfoBar.vue";
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
      rateRoom: null,
      topRoom: null,
      modal: true,
      isActive_Sign_in: false,
      isActive_Sign_up: false,
      Active_booking: false,
      logins: false,

      error: "",
      count: 1,
      begin: "",
      dateNow: "",
      end: "",
      detailTop: ''

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
  components: { NavBar, FooterBar, InfoBar },

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
        this.rateRoom = response.data.rateArr;
        this.topRoom = response.data.TopRoom;
        this.detailTop = response.data.detailTop;

        console.log(this.topRoom);
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
            this.rateRoom = response.data.rateArr;
            console.log(response.data);
            this.Active_booking = true;
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
