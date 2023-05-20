<template>

  <div>

    <div>
      <NavBar />
    </div>
      <br>
      <br>

    
    <div class="steps is-centered">
        <div class="step-item">
          <div class="step-marker"><span class="icon">
            <i class="fa fa-bed" aria-hidden="true"></i>
            </span></div>
          
          <div class="step-details">
            <p class="step-title">เลือกห้องที่ต้องการ</p>
          </div>
        </div>

        <div class="step-item  ">
          <div class="step-marker"> <span class="icon">
              <i class="fa fa-user"></i>
            </span></div>
          <div class="step-details">
            <p class="step-title">กรอกข้อมูลส่วนตัว</p>
          </div>
        </div>

        <div class="step-item is-active">
          <div class="step-marker"><span class="icon">
            <i class="fa fa-check"></i>
          </span></div>
          <div class="step-details ">
            <p class="step-title">ยืนยันการจ่ายเงิน</p>
          </div>
        </div>
      </div>
    
 

  <div class="columns" style="margin-top: 100px" id="invoice">
    <div class="column"></div>
    <div class="column is-three box">
      <table class="table is-bordered" style="width: 100%">
        <tr>
          <th colspan="4" class="has-text-centered">ใบชำระเงิน</th>
        </tr>
        <tr>
          <td colspan="2">เลขบัญชี : 1234567890</td>
          <td colspan="2">ธนาคาร : กรุงไทย</td>
        </tr>
        <tr>
          <td colspan="4">ชื่อบัญชี : folk</td>
        </tr>

        <tr>
          <th colspan="4" class="has-text-centered">รายละเอียดการจอง</th>
        </tr>
        <tr>
          <td colspan="4">ชื่อ : {{ fname + " " + lname }}</td>
        </tr>
        <tr>
          <td colspan="2">Check in : {{ checkIn }}</td>
          <td colspan="2">Check out : {{ checkOut }}</td>
        </tr>
        <tr>
          <td colspan="2">จำนวนวันที่เข้า : {{ countDays }}</td>
          <td colspan="2">จำนวนห้อง : {{ countRooms }}</td>
        </tr>
        <tr>
          <td colspan="2">ราคาต่อคืน : {{ priceForDay }}</td>
          <td colspan="2">
            ราคา :
            {{
              priceForDay +
              " x " +
              countRooms +
              " x " +
              countDays +
              " = " +
              allPrice
            }}
          </td>
        </tr>
        <tr>
          <td colspan="3">รวม : {{ allPrice }}</td>
        </tr>
        <tr>
          <th colspan="4" class="has-text-centered">หลักฐานการจ่ายตัง</th>
        </tr>
        <tr>
          <td colspan="4">
            <div class="file">
              <label class="file-label">
                <input
                  accept="image/png, image/jpeg, image/webp"
                  class="file-input"
                  type="file"
                  id="file"
                  ref="file"
                  @change="handleFileUpload()"
                />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label"> สลิป : </span>
                </span>
              </label>
            </div>
            <div>
              <label for="">กรอกเงินที่จ่าย {{ paidAmount }}</label>
              <input type="number" v-model="paidAmount" />
            </div>
            <template v-if="$v.fileSize.$error">
              <p class="help is-danger" v-if="!$v.fileSize.checkuploadfile">
                กรุณากรอกทั้งสองฝั่ง
              </p>
            </template>
          </td>
        </tr>
      </table>
      <div class="columns">
        <div class="column"></div>
        <div class="column"></div>
        <div class="column is-three">
          <a class="button is-primary" @click="confirm()">ยืนยัน</a>
        </div>
        <div class="column">
          <a href="/" class="button is-danger">ยกเลิก</a>
        </div>

        <div class="column"></div>
        <div class="column"></div>
      </div>
    </div>
    <div class="column"></div>
  </div>

  <br>
  <br>
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

// import { required } from "vuelidate/lib/validators";

function checkuploadfile(value) {
  console.log(value);
  if (value == 0) {
    // console.log(this.paidAmount)
    if (this.paidAmount != "") {
      return false;
    } else {
      return true;
    }
  } else {
    console.log(this.paidAmount);
    if (this.paidAmount != "") {
      return true;
    } else {
      return false;
    }
  }
}
export default {
  props: ["user"],
  data() {
    return {
      information: "",
      total: 0,
      // file: "",
      booking: this.$route.query.booking,
      fname: "",
      lname: "",
      checkIn: "",
      checkOut: "",
      countDays: "",
      countRooms: "",
      priceForDay: "",
      price: 0,
      allPrice: "",
      roomId: "",
      file: null,
      paidAmount: "",
      fileSize: 0,
      allCountRooms: 0,
      // user : this.user.username
    };
  },
  components: { NavBar, FooterBar },
  validations: {
    fileSize: {
      checkuploadfile: checkuploadfile,
    },
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);

      this.fileSize += this.$refs.file.files[0].size;
      console.log(this.fileSize);
      // console.log(this.file);
    },
    confirm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        // console.log(this.file)
        var formData = new FormData();
        formData.append("file_image", this.file);
        formData.append("fname", this.fname);
        formData.append("lname", this.lname);
        formData.append("checkIn", this.checkIn);
        formData.append("checkOut", this.checkOut);
        formData.append("countDays", this.countDays);
        formData.append("countRooms", this.countRooms);
        formData.append("priceForDay", this.priceForDay);
        formData.append("price", this.price);
        formData.append("allPrice", this.allPrice);
        formData.append("roomId", this.roomId);
        formData.append("paidAmount", this.paidAmount);
        formData.append("people", this.people);
        formData.append("allCountRooms", this.allCountRooms);
        // console.log(formData);

        axios
          .post("http://localhost:3000/invoice", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response.data);
            this.$router.push({ path: "/" }); // Success! -> redirect to home page
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    },
  },
  created() {
    this.roomId = this.booking.split(" ")[0];
    this.fname = this.booking.split(" ")[5];
    this.lname = this.booking.split(" ")[6];
    this.people = this.booking.split(" ")[3];
    this.checkIn = this.booking.split(" ")[1];
    this.checkOut = this.booking.split(" ")[2];
    this.countDays = this.booking.split(" ")[10];
    this.countRooms = this.booking.split(" ")[4];
    this.priceForDay = this.booking.split(" ")[7];
    this.price =
    this.booking.split(" ")[7] *
    this.booking.split(" ")[4] *
    this.booking.split(" ")[10];
    this.allPrice = this.booking.split(" ")[9];
    console.log("folK" + this.allPrice);
    this.allCountRooms = this.booking.split(" ")[11];

    console.log(this.allPrice);
    console.log(this.user);

    // axios
    //   .get(`http://localhost:3000/invoice`, {params : {booking : this.booking}})
    //   .then((response) => {
    //     // this.rooms = response.data;
    //     console.log(response.data)

    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  },
};
</script>

<style></style>
