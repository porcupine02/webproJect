<template>
  <div id="detail">
    <!-- content -->
    <div class="container" v-for="room in rooms" :key="room">
      <!-- left -->

      <div class="columns mx-6">
        <div class="column is-6">
          <img :src="'http://localhost:3000/' + room.pic1" alt="" />
          <div class="columns">
            <div class="column">
              <img
                :src="'http://localhost:3000/' + room.pic1"
                alt="picture room"
              />
            </div>
            <div class="column">
              <img
                :src="'http://localhost:3000/' + room.pic2"
                alt="picture room"
              />
            </div>
            <div class="column">
              <img
                :src="'http://localhost:3000/' + room.pic3"
                alt="picture room"
              />
            </div>
            <div class="column">
              <img
                :src="'http://localhost:3000/' + room.pic4"
                alt="picture room"
              />
            </div>
          </div>
        </div>

        <div class="column is-5 px-5">
          <p class="title is-3 mt-6">
            {{ room.room_type }}
          </p>
          <div>
            <i
              v-for="item in room.rate"
              :key="item"
              class="fa fa-star"
              style="font-size: 30px; color: rgb(244, 247, 76)"
            ></i>
            <i
              v-for="item in 5 - room.rate"
              :key="item"
              class="fa fa-star"
              style="font-size: 30px; color: rgb(188, 188, 165)"
            ></i>
          </div>
          <div class="tile">
            <h1 class="title has-text-danger mt-3">
              {{ room.price
              }}<span class="has-text-grey-dark" style="font-size: 1.3rem"
                >/day</span
              >
            </h1>
          </div>
          <div class="tile is-child">
            <div class="mt-6">
              บริการจากทางโรงแรม
              <br />
              <br />

              <div class="columns">
                <div
                  class="column is-2 has-text-centered"
                  v-if="room.breakfast == 'yes'"
                >
                  <i
                    class="fa fa-coffee"
                    style="font-size: 40px; color: #888"
                  ></i
                  ><br />
                  breakfast
                </div>

                <div
                  class="column is-2 has-text-centered"
                  v-if="room.air_conditioner == 'yes'"
                >
                  <i class="fa fa-wifi" style="font-size: 40px; color: #888"></i
                  ><br />
                  internet
                </div>
                <div
                  class="column is-2 has-text-centered"
                  v-if="room.wifi == 'yes'"
                >
                  <i class="fa fa-wifi" style="font-size: 40px; color: #888"></i
                  ><br />
                  internet
                </div>
                <div
                  class="column is-2 has-text-centered"
                  v-if="room.pool == 'yes'"
                >
                  <i
                    class="fas fa-swimming-pool"
                    style="font-size: 40px; color: #888"
                  ></i
                  ><br />
                  pool
                </div>
              </div>
            </div>
          </div>
          <div class="tile is-child">
            <a href="/booking">
              <button class="button is-success is-fullwidth is-outlined mt-6">
                จองตอนนี้
              </button>
            </a>
            <!-- </p> -->
          </div>
        </div>
      </div>
      <hr />
      <!-- description -->
      <div class="content is-medium px-3 mx-6">
        <h5>รายละเอียดเพิ่มเติม</h5>
        {{ room.description }}
      </div>
      <hr />
      <!-- comments -->
      <div class="content is-medium px-3 mx-6">
        <h5>ความคิดเห็นจากผู้ใช้บริการ</h5> <div class="card"></div>





      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      rooms: null,
    };
  },
  created() {
    axios
      .get(`http://localhost:3000/detail/${this.$route.params.id}`)
      .then((response) => {
        this.rooms = response.data;
        console.log(this.rooms);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style></style>
