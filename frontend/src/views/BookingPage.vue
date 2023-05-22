<template>
  <div>
    <div>
      <NavBar />
    </div>

    <br />
    <br />
    <br />

    <div class="steps is-centered">
      <div class="step-item">
        <div class="step-marker">
          <span class="icon">
            <i class="fa fa-bed" aria-hidden="true"></i>
          </span>
        </div>

        <div class="step-details">
          <p class="step-title">เลือกห้องที่ต้องการ</p>
        </div>
      </div>

      <div class="step-item is-active">
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

    <br />
    <br />
    <br />

    <div class="container" id="Booking">
      <div
        class="tile is-ancestor"
        v-for="room in detalRoom"
        :key="room.room_id"
      >
        <div class="tile is-parent is-8">
          <div class="tile is-child box">
            <div class="columns">
              <div class="column is-6">
                <img
                  :src="
                    room.file_path
                      ? 'http://localhost:3000' + room.file_path
                      : 'https://i.pinimg.com/originals/22/c0/2f/22c02f8f67b478ef00cb12bcacde588b.jpg'
                  "
                  alt=""
                />
              </div>
              <div class="column is-6">
                <h1><b>ชื่อห้องพัก :</b> {{ room.room_type }}</h1>
                <h1><b>รายละเอียดห้องพัก</b></h1>
                {{ room.description }}
              </div>
            </div>
          </div>
        </div>

        <div class="tile is-4 is-vertical">
          <div class="tile is-child box">
            <p class="title">รายละเอียดราคา</p>
            <div class="columns">
              <div class="column is-6">
                <p>1 ห้อง x {{ countDays }} คืน</p>
              </div>
              <div class="column is-6">
                <p>{{ priceDayRoom(room.price) }} บาท</p>
              </div>
            </div>
            <div class="columns">
              <div class="column is-6">จำนวนห้อง {{ countRooms }} ห้อง</div>
              <div class="column is-6">{{ total(room.price) }} บาท</div>
            </div>
            <!-- {{ dayNow.split('T')[0] }} -->
            <div
              class="columns has-text-danger"
              v-if="dob.split('-')[1] == dayNow.split('-')[1]"
            >
              <div class="column is-6">โปรโมชั่น</div>
              <div class="column is-6">ลด 10%</div>
            </div>
            <hr />

            <div class="columns">
              <div class="column is-6">ที่ต้องชำระ</div>
              <div
                class="column is-6"
                v-if="dob.split('-')[1] == dayNow.split('-')[1]"
              >
                {{ promotion(room.price) }} บาท
              </div>
              <div class="column is-6" v-else>{{ total(room.price) }} บาท</div>
            </div>
            <div class="columns mt-4">
              <div class="column is-12">
                <a @click="comfirm()" class="button is-danger">ยืนยัน</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tile is-ancestor">
        <div class="tile is-parent is-8">
          <div class="tile is-child box">
            <div class="columns">
              <div class="column is-4">
                <label for="">เช็คอิน</label>

                <input
                  type="date"
                  class="input mt-4"
                  v-model="startDate"
                  disabled
                />
                <!-- {{ initialDate }} -->
              </div>
              <div class="column is-4">
                <label for="">เช็คเอ้าท์</label>

                <input
                  type="date"
                  class="input mt-4"
                  v-model="endDate"
                  disabled
                />
              </div>
              <div class="column is-4">
                <label for="">จำนวนห้อง</label>
                <br />
                <div class="select is-rounded mt-4">
                  <select v-model="countRooms" v-if="ucount[0].ucount != null">
                    <option
                      v-for="count in ucount[0].ucount"
                      :key="count"
                      :value="count"
                    >
                      {{ count }} ห้อง
                    </option>
                  </select>
                  <select v-model="countRooms" v-if="ucount[0].ucount == null">
                    <!-- <option selected value="1">1 ห้อง</option> -->
                    <option
                      v-for="count in detalRoom[0].count"
                      :key="count"
                      :value="count"
                    >
                      {{ count }} ห้อง
                    </option>
                    <!-- <option value="3">3 ห้อง</option>
                  <option value="4">4 ห้อง</option>
                  <option value="5">5 ห้อง</option> -->
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tile is-ancestor">
        <div class="tile is-parent is-8">
          <div class="tile is-child box">
            <div class="columns">
              <div class="column is-4">
                <h1>ข้อมูลผู้เข้าพัก</h1>
              </div>
              <div class="column is-4"></div>
              <div class="column is-4"></div>
            </div>

            <div class="columns">
              <div class="column is-6">
                <input
                  type="text"
                  class="input"
                  placeholder="ชื่อ"
                  v-model="$v.fname.$model"
                  :class="{ 'is-danger': $v.fname.$error }"
                />
                <template v-if="$v.fname.$error">
                  <p class="help is-danger" v-if="!$v.fname.required">
                    กรุณากรอกชื่อ
                  </p>
                  <p class="help is-danger" v-if="!$v.fname.alphaNum">
                    กรุณาอย่าเว้นช่อง
                  </p>
                  <p class="help is-danger" v-if="!$v.fname.word">
                    กรุณากรอกแต่ตัวอักษรเท่านั้น
                  </p>
                </template>
              </div>

              <div class="column is-6">
                <input
                  type="text"
                  class="input"
                  placeholder="นามสกุล"
                  v-model="$v.lname.$model"
                  :class="{ 'is-danger': $v.lname.$error }"
                />
                <template v-if="$v.lname.$error">
                  <p class="help is-danger" v-if="!$v.lname.required">
                    กรุณากรอกนามสกุล
                  </p>
                  <p class="help is-danger" v-if="!$v.lname.alphaNum">
                    กรุณาอย่าเว้นช่อง
                  </p>
                  <p class="help is-danger" v-if="!$v.lname.word">
                    กรุณากรอกแต่ตัวอักษรเท่านั้น
                  </p>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tile is-ancestor">
        <div class="tile is-parent is-8">
          <div class="tile is-child box">
            <div class="columns">
              <div class="column is-4">
                <h1>โปรโมชั่น</h1>
              </div>
              <div class="column is-4"></div>
              <div class="column is-4"></div>
            </div>

            <div class="columns">
              <div class="column is-2">
                <label for="">วันเดือนปีเกิด</label>
              </div>
              <div class="column is-4">
                <input type="date" class="input" v-model="dob" disabled />
                <!-- <h1>{{ dobDay[0].DOB.split("T")[0] }}</h1> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <br />
    <br />
    <div>
      <FooterBar />
    </div>
  </div>
</template>

<script>
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

function word(value) {
  if (value.match("^[^0-9]*$")) {
    return true;
  }
  return false;
}

function validateNotBlank(value) {
  return !value.match(/\s+/);
}

import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      countRooms: 1,
      startDate: this.$route.query.room.split(" ")[1],
      endDate: this.$route.query.room.split(" ")[2],
      booking: this.$route.query.room,
      detalRoom: null,
      countDays: null,
      dob: "",
      dayNow: null,
      fname: "",
      lname: "",
      dobDay: null,
      promotionDob: 0,
      totalPrice: 0,
      priceRoomCountDays: 0,
      price: 0,
      allCountRooms: 0,
      ucount: null,
    };
  },

  components: { NavBar, FooterBar },

  created() {
    // console.log(this.booking.split(' '))
    axios
      .get(`http://localhost:3000/booking`, { params: { room: this.booking } })
      .then((response) => {
        // this.rooms = response.data;
        // console.log(response.data.countDays)
        this.detalRoom = JSON.parse(response.data.room);
        this.countDays = JSON.parse(response.data.countDays);
        this.dayNow = JSON.parse(response.data.dateNow);
        this.dobDay = JSON.parse(response.data.dob);
        this.ucount = JSON.parse(response.data.ucount);
        this.dob = this.dobDay[0].DOB.split("T")[0];
        // this.allCountRooms = this.detalRoom[0].count
        console.log(this.ucount[0].ucount);
        console.log(this.dob);
        console.log(this.dayNow);
        // if(this.ucount[0].ucount == null){
        //   this.allCountRooms = this.detalRoom[0].count
        // }
        // else{
        //   this.allCountRooms = this.ucount[0].ucount
        // }
        this.allCountRooms = this.detalRoom[0].count;
        console.log(this.allCountRooms);
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
  validations: {
    fname: {
      required: required,
      alphaNum: validateNotBlank,
      word: word,
    },
    lname: {
      required: required,
      alphaNum: validateNotBlank,
      word: word,
    },
  },
  methods: {
    comfirm() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.$router.push({
          path: "/invoice",
          query: {
            booking:
              this.booking +
              " " +
              this.countRooms +
              " " +
              this.fname +
              " " +
              this.lname +
              " " +
              this.price +
              " " +
              this.priceRoomCountDays +
              " " +
              this.totalPrice +
              " " +
              this.countDays +
              " " +
              this.allCountRooms +
              " " +
              this.dob +
              " " +
              this.dayNow,
          },
        });
      }
    },
    total(roomPrice) {
      this.totalPrice = roomPrice * this.countDays * this.countRooms;
      this.price = roomPrice;

      return this.totalPrice;
    },
    promotion(roomPrice) {
      this.totalPrice = Math.floor(
        roomPrice * this.countDays * this.countRooms -
          0.1 * roomPrice * this.countDays * this.countRooms
      );
      this.price = roomPrice;
      return this.totalPrice;
    },
    priceDayRoom(roomPrice) {
      this.priceRoomCountDays = roomPrice * this.countDays;
      this.price = roomPrice;
      return this.priceRoomCountDays;
    },
  },
};
</script>

<style></style>
