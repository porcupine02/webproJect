<template>
    <div id="detail">
    <!-- content -->
    <div class="container mt-6" v-for="room in rooms" :key="room">
      <!-- left -->

      <div class="columns">
        <div class="column is-6">
          <img
            :src="room.pic1 ? 'http://localhost:3000' + room.pic1 : 'https://i.pinimg.com/originals/22/c0/2f/22c02f8f67b478ef00cb12bcacde588b.jpg'"
            alt="image room"
            class="has-background-info-light"
          />
          <img
            :src="room.pic2 ? 'http://localhost:3000' + room.pic2 : 'https://i.pinimg.com/originals/22/c0/2f/22c02f8f67b478ef00cb12bcacde588b.jpg'"
            alt="image room"
            class="has-background-info-light"
            style="margin-top: 100px"
          />
          <img
            :src="room.pic3 ? 'http://localhost:3000' + room.pic3 : 'https://i.pinimg.com/originals/22/c0/2f/22c02f8f67b478ef00cb12bcacde588b.jpg'"
            alt="image room"
            class="has-background-info-light"
            style="margin-top: 100px"
          />
          <img
            :src="room.pic4 ? 'http://localhost:3000' + room.pic4 : 'https://i.pinimg.com/originals/22/c0/2f/22c02f8f67b478ef00cb12bcacde588b.jpg'"
            alt="image room"
            class="has-background-info-light"
            style="margin-top: 100px"
          />
        </div>

        <div class="column is-5">
          <p class="title is-3">
            {{ room.room_type }}
          </p>
          <div>
            <i
              class="fa fa-star"
              style="font-size: 40px; color: rgb(244, 247, 76)"
            ></i>
            <i
              class="fa fa-star"
              style="font-size: 40px; color: rgb(244, 247, 76)"
            ></i>
            <i
              class="fa fa-star"
              style="font-size: 40px; color: rgb(244, 247, 76)"
            ></i>
            <i
              class="fa fa-star"
              style="font-size: 40px; color: rgb(188, 188, 165)"
            ></i>
            <i
              class="fa fa-star"
              style="font-size: 40px; color: rgb(188, 188, 165)"
            ></i>
          </div>
          <div class="tile is-child">
            <p class="title has-text-danger mt-6">
              {{ room.price }}
              <a href="/booking">
                <button class="button has-background-success">จองตอนนี้</button>
              </a>
            </p>
          </div>
        </div>

        <div class="column is-1"></div>
      </div>
      <hr />
      <div>รายละเอียดเพิ่มเติม : {{ room.description }}</div>
      <hr />
      <div class="mb-6 mt-6">
        บริการจากทางโรงแรม

        <br />
        <br />

        <div class="columns">
          <div
            class="column is-2 has-text-centered"
            v-if="room.breakfast == 'yes'"
          >
            <i class="fa fa-coffee" style="font-size: 50px"></i><br />
            breakfast
          </div>

          <div
            class="column is-2 has-text-centered"
            v-if="room.air_conditioner == 'yes'"
          >
            <i class="fa fa-wifi" style="font-size: 50px"></i><br />
            internet
          </div>
          <div class="column is-2 has-text-centered" v-if="room.wifi == 'yes'">
            <i class="fa fa-wifi" style="font-size: 50px"></i><br />
            internet
          </div>
          <div class="column is-2 has-text-centered" v-if="room.pool == 'yes'">
            <i class="fas fa-swimming-pool" style="font-size: 50px"></i><br />
            pool
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            rooms : null
        }
    },
    created(){
        axios.get(`http://localhost:3000/detail/${this.$route.params.id}`)
        .then((response) => {
          this.rooms = response.data;
          console.log(this.blogs)
        })
        .catch((err) => {
          console.log(err);
        });
    }
}
</script>

<style>

</style>