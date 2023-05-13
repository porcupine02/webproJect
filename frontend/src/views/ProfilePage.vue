<template>
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
          <strong>{{ user[0].user_name}}</strong>
          <p class="is-size-5">
            {{ user[0].first_name + " " + user[0].last_name}}
            <br />
            tel : {{ user[0].phone }}
            <br />
            E-mail : {{ user[0].email }}
            <br />
            Birth-date : {{ user[0].DOB }}
          </p>
          <div class="button" @click="uploadFile()">Edit Profile</div>
          <div class="button" @click="changePwd()">change password</div>
          <!-- change password -->
          <div v-if="pwd">
            <div class="field mt-3">
              <label class="label">Old password</label>
              <div class="control">
                <input class="input" type="text" placeholder="e.g Alex Smith" />
              </div>
            </div>
            <div class="field">
              <label class="label">New password</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="e.g. alexsmith@gmail.com"
                />
              </div>
            </div>
            <button class="button" @click="changePassword()">
              เปลี่ยนรหัส
            </button>
          </div>

          <!-- upload profile -->
          <div class="file has-name is-small mt-3" v-if="upload">
            <label class="file-label">
              <input class="file-input" type="file" name="resume" />
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
          </div>
        </div>
      </div>
      <!-- history booking operate -->
      <div class="column">
        <strong class="content is-size-5"> ประวัติการจอง </strong>
        <article
          class="media mt-3 card p-3"
          v-for="booked in booking"
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
                <strong class="has-text-success">complate</strong>
                <strong class="has-text-danger">incomplate</strong>

                <span class="is-size-5" style="float: right">
                  total price
                </span>
              </p>
              <div class="button">check in</div>
              <div class="button">check out</div>
            </div>
          </div>
          <div class="media-right">
            <div class="button has-background-danger">cancel</div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  data() {
    return {
      history: "",
      // profiles: profiles,
      booking: [],
      upload: false,
      pwd: false,
      user: "",
    };
  },
  methods: {
    uploadFile() {
      if (!this.upload) {
        this.pwd = false;
        this.upload = true;
      } else {
        this.upload = false;
      }
    },
    changePwd() {
      if (!this.pwd) {
        this.upload = false;
        this.pwd = true;
      } else {
        this.pwd = false;
      }
    },
    changePassword() {
      console.log("change");
      axios
        .put("http://localhost:3000/changepassword")
        .then((res) => {
          console.log(res);
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
        this.booking = res.data.booking
        this.user = res.data.user
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
