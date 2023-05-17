<template>

<div>
   <div>
    <NavBar />
   </div>

  <div class="container mt-6 pt-5" id="profile">
    <div class="columns">
      <!-- profile -->
      <div class="column is-3">
        <div class="card-image">
          <figure class="image is-4by3">
            <img
              src="https://bulma.io/images/placeholders/1280x960.png"
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div class="content is-size-4">
          <strong>{{ user[0].user_name }}</strong>
          <p class="is-size-5">
            {{ user[0].first_name + " " + user[0].last_name }}
            <br />
            tel : {{ user[0].phone }}
            <br />
            E-mail : {{ user[0].email }}
            <br />
            Birth-date : {{ user[0].DOB }}
          </p>
          <div class="is-size-5 has-text-centered content has-text-success">
            {{ complete }}
          </div>
          <div class="button" @click="uploadFile()">Edit Profile</div>
          <div class="button" @click="changePwd()">change password</div>
          <!-- change password -->
          <div v-if="pwd">
            <div class="field mt-3">
              <label class="label">Old password</label>
              <div class="control">
                <input
                  :class="$v.oldPassword.$error ? 'is-danger' : ''"
                  class="input"
                  type="text"
                  placeholder="e.g Alex Smith"
                  v-model="$v.oldPassword.$model"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">New password</label>
              <div class="control">
                <input
                  :class="$v.newPassword.$error ? 'is-danger' : ''"
                  v-model="$v.newPassword.$model"
                  class="input"
                  type="text"
                  placeholder="e.g. alexsmith@gmail.com"
                />
              </div>
              <template v-if="$v.newPassword.$error">
                <p
                  class="help is-danger"
                  v-if="!$v.newPassword.complexPassword"
                >
                  รหัสผ่านง่ายเกินไป
                </p>
              </template>
            </div>
            <button class="button" @click="changePassword()">
              เปลี่ยนรหัส
            </button>
            <div
              class="is-size-5 has-text-centered content has-text-danger is-2"
            >
              {{ error }}
            </div>
          </div>

          <!-- upload profile -->
          <div
            class="file has-name is-small mt-3 tile is-ancestor"
            v-if="upload"
          >
            <div class="">
              <label class="file-label">
                <input
                  class="file-input"
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  @change="selectImages"
                />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label"> Choose a file… </span>
                </span>
                <span class="file-name">
                  Screen Shot 2017-07-29 at 15.54.25.png
                </span>
              </label>
              <label class="file-label mt-3" style="float: right">
                <div class="button" @click="changeProfile()">เปลี่ยนรูปภาพ</div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <!-- history booking operate -->
      <div class="column">
        <strong class="content is-size-5"> ประวัติการจอง </strong>
        <article
          class="media mt-3 card p-3"
          v-for="(booked, index) in booking" :key="booked"
        >
          <div class="media-content">
            <div class="content has-icons-left">
              <span class="icon is-left">
                <i class="fas fa-calendar"></i>
              </span>
              check in : {{ booked.check_in }}
              <span class="icon is-left">
                <i class="fas fa-calendar"></i>
              </span>
              check out : {{ booked.check_out }}
              <p>
                <!-- <br /> -->
                <strong>{{
                  booked.booking_fname + " " + booked.booking_lname + "    "
                }}</strong>
                <small>booking date {{ booked.timestamp_booking }}</small>
                <br />

                <span class="icon is-left"> <i class="fas fa-user"></i> </span>
                {{ booked.people }}
                people

                <span class="icon is-left">
                  <i class="fas fa-bed"></i>
                </span>
                {{ booked.countRoom }} room
                <br />

                <span class="icon is-left">
                  <i class="fas fa-credit-card"></i>
                </span>
                สถานะการจ่ายเงิน :
                <strong
                  class="has-text-success"
                  v-if="booked.payment_amount >= booked.payment_total_money"
                  >complete</strong
                >
                <strong class="has-text-danger" v-else>incomplete</strong>

                <span class="is-size-5" style="float: right">
                  {{ booked.payment_total_money }}
                  
                  
                </span>
              </p>
              

              <div v-if="booked.status == 'complete' && booked.bstatus == 'booked'" >
                <div class="button" @click="checkIn(booked.booking_id, index)">check in </div>
                <div class="button">check out</div>
              </div>
       
              
              <div v-else-if="booked.bstatus == 'checkIn'">
                <div class="button has-background-success">check in </div>
                <div class="button"  @click="checkOut(booked.booking_id, index)">check out</div>
              </div>
              <div v-else-if="booked.bstatus == 'checkOut'">
                <div class="button">check in </div>
                <div class="button  has-background-danger"  >check out</div>
              </div>
              <div v-else>
                <div class="button" disabled>check in</div>
                <div class="button" disabled>check out</div>
              </div>
            </div>
          </div>
          <div class="media-right" v-if="booked.payment_amount < booked.payment_total_money">
            <div class="button has-background-danger" @click="cancelRoom(booked.booking_id, booked.check_in, booked.check_out, booked.room_id, booked.countRoom, booked.payment_id, index)">cancel</div>
          </div>
          <div class="media-right" v-else>
            <div class="button has-background-light" disabled >cancel</div>
          </div>
        </article>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from "@/plugins/axios";
import NavBar from "@/components/NavBar.vue"

import { required } from "vuelidate/lib/validators";
function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}
export default {
  data() {
    return {
      history: "",
      // profiles: profiles,
      booking: [],
      upload: false,
      pwd: false,
      user: "",
      newPassword: "",
      oldPassword: "",
      images: [],
      complete: null,
      error: null,
      data: '',
    };
  },
  components: { NavBar },

  validations: {
    oldPassword: {
      required: required,
    },
    newPassword: {
      required: required,
      complexPassword: complexPassword,
    },
  },
  methods: {
    selectImages(event) {
      this.images = event.target.files;
      console.log("this.images");
      console.log(this.images);
      console.log(typeof this.images);
      console.log(event.target.files);
    },
    uploadFile() {
      if (!this.upload) {
        this.pwd = false;
        this.upload = true;
      } else {
        this.upload = false;
      }
    },
    changePwd() {
      this.error = null
      this.complete = null
      if (!this.pwd) {
        this.upload = false;
        this.pwd = true;
      } else {
        this.pwd = false;
      }
    },
    changePassword() {
      console.log("change");
      const data = {
        newPassword: this.newPassword,
        oldPassword: this.oldPassword,
      };
      axios
        .put("http://localhost:3000/changepassword", data)
        .then((res) => {
          console.log(res);
          this.pwd = false;
          this.complete = res.data;
        })
        .catch((err) => {
          console.log(err);
          this.error = err.response.data.message;
        });
    },
    changeProfile() {
      let formData = new FormData();
      this.images = Array.from(this.images);
      formData.append("profileImage", this.images);
      console.log("formData");
      console.log(formData);
      axios
        .put("http://localhost:3000/changeProfile", formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkIn(bookingId, index){
      console.log('checkIn')
      axios.put(`http://localhost:3000/checkIn/${bookingId}`).then((res)=>{
          console.log(res.data[0].status)
          this.booking[index].status = res.data[0].status
          // console.log(this.booking[index].comment)
      }).catch((err) => {
        console.log(err)
      })
    },
    checkOut(bookingId,  index){
      // console.log('checkOut')
      axios.put(`http://localhost:3000/checkOut/${bookingId}`).then((res) =>{
        console.log(res.data[0].status)
        this.booking[index].bstatus = res.data[0].status
        console.log(this.booking)
      }).catch((err)=>{
        console.log(err)
      })

    },
    cancelRoom(bookedId, bookedCheckIn, bookedIdCheckOut, bookedRoomId, bookedCountRoom, bookedPaymentId, index){
        console.log(bookedId, bookedCheckIn, bookedIdCheckOut, bookedRoomId, bookedCountRoom, bookedPaymentId, index)
        const result = confirm(
        `Are you sure you want to delete ${bookedId}`
      );

      if(result){
        
        const data = {
          bookedId : bookedId,
          bookedCheckIn : bookedCheckIn,
          bookedCheckOut :bookedIdCheckOut,
          bookedRoomId : bookedRoomId,
          bookedCountRoom : bookedCountRoom
        }
  
        axios.put(`http://localhost:3000/editBooking`, data ).then((res) =>{
            console.log(res.data)
            this.data = res.data
  
        }).catch((err)=>{
          console.log(err)
        })
      //  console.log(this.data)
  
  
    
         axios.delete(`http://localhost:3000/deleteBooking/${bookedPaymentId}`,).then((res) =>{
           console.log(res)
           this.booking.splice(index, 1);
         }).catch((err) =>{
           
           console.log(err)
         })
       
      }

    }
  },

  created() {
    // user = localStorage.getItem("user");
    this.user = localStorage.getItem("user");
    console.log(this.user);
    axios
      .get(`http://localhost:3000/user/`)
      .then((res) => {
        this.booking = res.data.booking;
        this.user = res.data.user;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
