<template>
    <div id="detail">
    <!-- content -->
    <div class="container mt-6" v-for="room in rooms" :key="room">
      <!-- left -->

      <div class="columns">
        <div class="column is-6">
        <div class="slider-holder">
        <span id="slider-image-1"></span>
        <span id="slider-image-2"></span>
        <span id="slider-image-3"></span>
        <span id="slider-image-4"></span>

        <div class="image-holder">
            <img :src="'http://localhost:3000'  + room.pic1 " class="slider-image" />
            <img :src="'http://localhost:3000'  + room.pic2 " class="slider-image" />
            <img :src="'http://localhost:3000'  + room.pic3 " class="slider-image" />
            <img :src="'http://localhost:3000'  + room.pic4 " class="slider-image" />
        </div>

        <div class="button-holder">
            <a href="#slider-image-1" class="slider-change"><img :src="'http://localhost:3000'  + room.pic1 " class="slider-change-image" /></a>
            <a href="#slider-image-2" class="slider-change"><img :src="'http://localhost:3000'  + room.pic2 " class="slider-change-image" /></a>
            <a href="#slider-image-3" class="slider-change"><img :src="'http://localhost:3000'  + room.pic3 " class="slider-change-image" /></a>
            <a href="#slider-image-4" class="slider-change"><img :src="'http://localhost:3000'  + room.pic4 " class="slider-change-image" /></a>
        </div>
    </div>








          <!-- <img
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
          /> -->
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

import axios from 'axios'

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
        })
        .catch((err) => {
          console.log(err);
        });
    }
}
</script>

<style>
       .slider-holder
        {
            width: 350px;
            height: 400px;
            margin-left: auto;
            margin-right: auto;
            margin-top: 0px;
            text-align: center;
            overflow: hidden;
        }

        .image-holder
        {
            width: 2100px;
            height: 400px;
            clear: both;
            position: relative;

            -webkit-transition: left 2s;
            -moz-transition: left 2s;
            -o-transition: left 2s;
            transition: left 2s;
        }

        .slider-image
        {
            float: left;
            margin: 0px;
            padding: 0px;
            position: relative;
          height: 350px;
          width: 350px;
        }

        #slider-image-1:target ~ .image-holder
        {
            left: 0px;
        }

        #slider-image-2:target ~ .image-holder
        {
            left: -350px;
        }

        #slider-image-3:target ~ .image-holder
        {
            left: -700px;
        }
         #slider-image-4:target ~ .image-holder
        {
            left: -1050px;
        }
          #slider-image-5:target ~ .image-holder
        {
            left: -1400px;
        }
         #slider-image-6:target ~ .image-holder
        {
            left: -1750px;
        }
.button-holder
        {
            position: relative;
            top: -50px;
        }

        .slider-change
        {
            display: inline-block;
          height: 50px;
          width: 50px;
            border-radius: 5px;
            background-color: brown;
        }

        .slider-change-image
        {

          height: 50px;
          width: 50px;
        }
</style>