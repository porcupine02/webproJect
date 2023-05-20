<template>
  <div>
    <div>
      <NavBar />
    </div>
    <div :class="{ modal: modal, 'is-active': is_active_comments }">
      <div class="modal-background"></div>
      <div class="box modal-content">
        <!-- <label class="label">room_id {{ room_id }}</label> -->
        <label class="label">Rate</label>
        <label v-for="index in 5" :key="index">
          <label @click="rateJaa(index)" style="font-size: 2em">
            <span class="fa fa-star fa-2xl" v-if="rate < index"></span>
            <span
              class="fa fa-star checked fa-2xl"
              style="color: #ff0"
              v-if="rate >= index"
            ></span>
          </label>
        </label>
        <label class="label">Review</label>
        <textarea
          :class="this.comment == '' ? 'is-danger' : ''"
          class="textarea"
          placeholder="ส่งต่อประสบการณ์ของคุณ"
          v-model="$v.comment.$model"
        ></textarea>
        <template v-if="$v.comment.$error">
          <p class="help is-danger" v-if="!$v.comment.required">
            กรุณากรอกข้อมูล
          </p>
        </template>
        <a @click="submitComment()"
          ><button class="button is-success mt-3" style="float: right">
            comment
          </button></a
        >
      </div>
    </div>
    <div :class="{ modal: modal, 'is-active': is_active_report }">
      <div class="modal-background"></div>
      <div class="box modal-content">
        <label class="label has-text-danger" style="font-size: 1.5rem"
          >Report</label
        >
        <textarea
          :class="$v.reportContent.$error ? 'is-danger' : ''"
          class="textarea mb-3"
          placeholder="บอกปัญหาของคุณ"
          v-model="$v.reportContent.$model"
        ></textarea>

        <template v-if="$v.reportContent.$error">
          <p class="help is-danger" v-if="!$v.reportContent.required">
            กรุณากรอกข้อมูล
          </p>
        </template>
        <div
          class="button has-background-danger-light mx-2"
          @click="reportButton()"
        >
          cancel
        </div>
        <div
          class="button has-background-info-light mx-2"
          @click="sentReport()"
        >
          report
        </div>
      </div>
    </div>

    <div class="container mt-6 pt-5" id="profile">
      <div class="columns">
        <!-- profile -->
        <div class="column is-3">
          <div class="card-image">
            <figure class="image is-4by3">
              <img
                :src="
                  image[0]
                    ? 'http://localhost:3000/' + image[0].file_path
                    : 'https://bulma.io/images/placeholders/1280x960.png'
                "
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
              <div class="file">
                <label class="file-label m-3">
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
                    <span class="file-label"> รูปภาพโปรไฟล์ : </span>
                  </span>
                </label>
                <a class="button is-primary mt-3" @click="confirm()">ยืนยัน</a>
              </div>
            </div>
          </div>
        </div>
        <!-- history booking operate -->
        <div class="column has-icons-right">
          <strong class="content is-size-5"> ประวัติการจอง </strong>
          <span
            @click="reportButton()"
            class="icon is-right mr-5 button py-4 is-danger"
            style="float: right; font-size: 25px"
          >
            <i class="fas fa-bell"></i>
          </span>
          <article
            class="media mt-3 card p-3"
            v-for="(booked, index) in booking"
            :key="booked"
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

                  <span class="icon is-left">
                    <i class="fas fa-user"></i>
                  </span>
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
                    v-if="booked.status == 'complete'"
                    >complete</strong
                  >

                  <strong class="has-text-danger" v-else>{{
                    booked.status
                  }}</strong>

                  <span class="is-size-5" style="float: right">
                    {{ booked.payment_total_money }}
                  </span>
                </p>

                <div
                  v-if="
                    booked.status == 'complete' && booked.bstatus == 'booked'
                  "
                >
                  <div
                    class="button"
                    @click="checkIn(booked.booking_id, index)"
                  >
                    check in
                  </div>
                  <div class="button">check out</div>
                </div>

                <div v-else-if="booked.bstatus == 'checkIn'">
                  <div class="button has-background-success">check in</div>
                  <div
                    class="button"
                    @click="checkOut(booked.booking_id, index, booked.room_id)"
                  >
                    check out
                  </div>
                </div>
                <div v-else-if="booked.bstatus == 'checkOut'">
                  <div class="button mx-3" disabled>check in</div>
                  <div class="button has-background-danger">check out</div>
                </div>

                <div v-else-if="user[0].login_role == 'manager'">
                  <div class="button mx-1" disabled>check in</div>
                  <div class="button mx-1" disabled>check out</div>

                  <div
                    class="button is-warning mx-3"
                    @click="confirmPayment(booked.booking_id, index)"
                  >
                    confirm payment
                  </div>
                </div>
                <div v-else>
                  <div class="button mx-1" disabled>check in</div>
                  <div class="button mx-1" disabled>check out</div>
                </div>
              </div>
            </div>
            <div class="media-right" v-if="booked.status == 'incomplete'">
              <div
                class="button has-background-danger"
                @click="
                  cancelRoom(
                    booked.booking_id,
                    booked.check_in,
                    booked.check_out,
                    booked.room_id,
                    booked.countRoom,
                    booked.payment_id,
                    index
                  )
                "
              >
                cancel
              </div>
            </div>
            <div class="media-right" v-else>
              <div class="button has-background-light" disabled>cancel</div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
import NavBar from "@/components/NavBar.vue";

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
      data: "",
      is_active_comments: false,
      modal: true,
      comment: "",
      room_id: "",
      rate: 5,
      is_active_report: false,
      reportContent: "",
      image: "",
    };
  },
  components: { NavBar },

  validations: {
    newPassword: {
      required: required,
      complexPassword: complexPassword,
    },
    reportContent: {
      required: required,
    },
    comment: {
      required: required,
    },
  },
  methods: {
    // selectImages(event) {
    //   this.images = event.target.files;
    //   console.log("this.images");
    //   console.log(this.images);
    //   console.log(typeof this.images);
    //   console.log(event.target.files);
    // },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);

      this.fileSize += this.$refs.file.files[0].size;
      console.log(this.fileSize);
      // console.log(this.file);
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
      this.error = null;
      this.complete = null;
      if (!this.pwd) {
        this.upload = false;
        this.pwd = true;
      } else {
        this.pwd = false;
      }
    },
    changePassword() {
      this.$v.$touch();
      if (this.$v.$touch()) {
        console.log("change");
        const data = {
          newPassword: this.newPassword,
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
      }
    },
    // changeProfile() {
    //   let formData = new FormData();
    //   this.images = Array.from(this.images);
    //   formData.append("profileImage", this.images);
    //   console.log("formData");
    //   console.log(formData);
    //   axios
    //     .put("http://localhost:3000/changeProfile", formData)
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    confirm() {
      var formData = new FormData();
      formData.append("file_image", this.file);
      console.log(formData);
      axios
        .post("http://localhost:3000/changeProfile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          this.image = response.data.image;
          location.reload();
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    checkIn(bookingId, index) {
      console.log("checkIn");
      axios
        .put(`http://localhost:3000/checkIn/${bookingId}`)
        .then((res) => {
          console.log(res.data[0].status);
          this.booking[index].bstatus = res.data[0].status;
          // console.log(this.booking[index].comment)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkOut(bookingId, index, room_id) {
      // console.log('checkOut')
      this.room_id = room_id;
      this.is_active_comments = true;
      axios
        .put(`http://localhost:3000/checkOut/${bookingId}`)
        .then((res) => {
          console.log(res.data[0].status);
          this.booking[index].bstatus = res.data[0].status;
          console.log(this.booking);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitComment() {
      console.log("submit(ccomment)");
      const comment_data = {
        room_id: this.room_id,
        content: this.comment,
        rate: this.rate,
      };
      if (this.comment != "") {
        axios
          .post(`http://localhost:3000/comment/`, comment_data)
          .then((res) => {
            console.log(res);
            this.is_active_comments = false;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    rateJaa(index) {
      console.log(index);
      this.rate = index;
    },
    reportButton() {
      if (this.is_active_report) {
        this.is_active_report = false;
      } else {
        this.is_active_report = true;
      }
    },
    sentReport() {
      this.$v.$touch();
      axios
        .post(`http://localhost:3000/report/`, {
          content: this.reportContent,
        })
        .then((res) => {
          console.log(res);
          alert(res.data);
          location.reload();
          this.is_active_report = false;
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data);
        });
    },
    cancelRoom(
      bookedId,
      bookedCheckIn,
      bookedIdCheckOut,
      bookedRoomId,
      bookedCountRoom,
      bookedPaymentId,
      index
    ) {
      console.log(
        bookedId,
        bookedCheckIn,
        bookedIdCheckOut,
        bookedRoomId,
        bookedCountRoom,
        bookedPaymentId,
        index
      );
      const result = confirm(`Are you sure you want to delete ${bookedId}`);

      if (result) {
        const data = {
          bookedId: bookedId,
          bookedCheckIn: bookedCheckIn,
          bookedCheckOut: bookedIdCheckOut,
          bookedRoomId: bookedRoomId,
          bookedCountRoom: bookedCountRoom,
        };

        axios
          .put(`http://localhost:3000/editBooking`, data)
          .then((res) => {
            console.log(res.data);
            this.data = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
        //  console.log(this.data)

        axios
          .delete(`http://localhost:3000/deleteBooking/${bookedPaymentId}`)
          .then((res) => {
            console.log(res);
            this.booking.splice(index, 1);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    confirmPayment(bookingId, index) {
      console.log(bookingId, index);
      axios
        .put(`http://localhost:3000/confirmPayment/${bookingId}`)
        .then((res) => {
          console.log(res.data[0].status);
          this.booking[index].status = res.data[0].status;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created() {
    // user = localStorage.getItem("user");
    this.user = localStorage.getItem("user");
    console.log(this.user);
    axios
      .get(`http://localhost:3000/user/`)
      .then((res) => {
        // this.booking = res.data.booking;
        this.user = res.data.user;
        // this.allbooking = res.data.allbooking;
        this.image = res.data.image;
        console.log(this.user[0]);
        console.log(this.booking);
        console.log(this.allbooking);
        if (this.user[0].login_role == "manager") {
          this.booking = res.data.allbooking;
        } else {
          this.booking = res.data.booking;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
