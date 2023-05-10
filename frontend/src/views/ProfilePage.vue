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
          <strong>username</strong>
          <p class="is-size-5">
            fist_name last_name
            <br />
            tel : 000000
            <br />
            E-mail : asdfl@gmail.com
            <br />
            Birth-date : 01-01-2000
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

        <article class="media mt-3 card p-3">
          <div class="media-content">
            <div class="content has-icons-left">
              <span class="icon is-left">
                <i class="fas fa-calendar"></i>
              </span>
              check in : 01-01-2001
              <span class="icon is-left">
                <i class="fas fa-calendar"></i>
              </span>
              check out : 01-01-2001
              <p>
                <!-- <br /> -->
                <strong>John Smith</strong> <small>booking date</small>
                <br />

                <span class="icon is-left"> <i class="fas fa-user"></i> </span>2
                peopl

                <span class="icon is-left">
                  <i class="fas fa-bed"></i>
                </span>
                1 room
                <br />

                <span class="icon is-left">
                  <i class="fas fa-credit-card"></i>
                </span>
                สถานะการจ่ายเงิน :
                <strong class="has-text-success">complate</strong>

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
        <article class="media mt-3 card p-3">
          <div class="media-content">
            <div class="content has-icons-left">
              <span class="icon is-left">
                <i class="fas fa-calendar"></i>
              </span>
              check in : 01-01-2001
              <span class="icon is-left">
                <i class="fas fa-calendar"></i>
              </span>
              check out : 01-01-2001
              <p>
                <!-- <br /> -->
                <strong>John Smith</strong> <small>booking date</small>
                <br />

                <span class="icon is-left"> <i class="fas fa-user"></i> </span>2
                peopl

                <span class="icon is-left">
                  <i class="fas fa-bed"></i>
                </span>
                1 room
                <br />

                <span class="icon is-left">
                  <i class="fas fa-credit-card"></i>
                </span>
                สถานะการจ่ายเงิน :
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
        <article class="media mt-3 card p-3">
          <div class="media-content">
            <div class="content has-icons-left">
              <span class="icon is-left">
                <i class="fas fa-calendar"></i>
              </span>
              check in : 01-01-2001
              <span class="icon is-left">
                <i class="fas fa-calendar"></i>
              </span>
              check out : 01-01-2001
              <p>
                <!-- <br /> -->
                <strong>John Smith</strong> <small>booking date</small>
                <br />

                <span class="icon is-left"> <i class="fas fa-user"></i> </span>2
                peopl

                <span class="icon is-left">
                  <i class="fas fa-bed"></i>
                </span>
                1 room
                <br />

                <span class="icon is-left">
                  <i class="fas fa-credit-card"></i>
                </span>
                สถานะการจ่ายเงิน :
                <strong class="has-text-success">complate</strong>

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
        <article class="media mt-3 card p-3">
          <div class="media-content">
            <div class="content has-icons-left">
              <span class="icon is-left">
                <i class="fas fa-calendar"></i>
              </span>
              check in : 01-01-2001
              <span class="icon is-left">
                <i class="fas fa-calendar"></i>
              </span>
              check out : 01-01-2001
              <p>
                <!-- <br /> -->
                <strong>John Smith</strong> <small>booking date</small>
                <br />

                <span class="icon is-left"> <i class="fas fa-user"></i> </span>2
                peopl

                <span class="icon is-left">
                  <i class="fas fa-bed"></i>
                </span>
                1 room
                <br />

                <span class="icon is-left">
                  <i class="fas fa-credit-card"></i>
                </span>
                สถานะการจ่ายเงิน :
                <strong class="has-text-success">complate</strong>

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
        <article class="media mt-3 card p-3">
          <div class="media-content">
            <div class="content has-icons-left">
              <span class="icon is-left">
                <i class="fas fa-calendar"></i>
              </span>
              check in : 01-01-2001
              <span class="icon is-left">
                <i class="fas fa-calendar"></i>
              </span>
              check out : 01-01-2001
              <p>
                <!-- <br /> -->
                <strong>John Smith</strong> <small>booking date</small>
                <br />

                <span class="icon is-left"> <i class="fas fa-user"></i> </span>2
                peopl

                <span class="icon is-left">
                  <i class="fas fa-bed"></i>
                </span>
                1 room
                <br />

                <span class="icon is-left">
                  <i class="fas fa-credit-card"></i>
                </span>
                สถานะการจ่ายเงิน :
                <strong class="has-text-success">complate</strong>

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
        <article class="media mt-3 card p-3">
          <div class="media-content">
            <div class="content has-icons-left">
              <span class="icon is-left">
                <i class="fas fa-calendar"></i>
              </span>
              check in : 01-01-2001
              <span class="icon is-left">
                <i class="fas fa-calendar"></i>
              </span>
              check out : 01-01-2001
              <p>
                <!-- <br /> -->
                <strong>John Smith</strong> <small>booking date</small>
                <br />

                <span class="icon is-left"> <i class="fas fa-user"></i> </span>2
                peopl

                <span class="icon is-left">
                  <i class="fas fa-bed"></i>
                </span>
                1 room
                <br />

                <span class="icon is-left">
                  <i class="fas fa-credit-card"></i>
                </span>
                สถานะการจ่ายเงิน :
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
import axios from "axios";
export default {
  data() {
    return {
      history: "",
      // profiles: profiles,
      booking: [],
      upload: false,
      pwd: false,
    };
  },
  methods: {
    uploadFile() {
      if (!this.upload) {
        this.upload = true;
      } else {
        this.upload = false;
      }
    },
    changePwd() {
      if (!this.pwd) {
        this.pwd = true;
      } else {
        this.pwd = false;
      }
    },
    changePassword() {
      console.log("change")
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
    // ยังไม่ได้ทำ ลืมไปแล้วว่าเขียนไง
    axios.get("/user/", cus)
    this.history = JSON.parse(localStorage.getItem("book"));

    console.log(typeof this.history);
  },
};
</script>
