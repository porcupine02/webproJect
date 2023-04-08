<template>
    <div id="search">
    <div class="container">
      <!-- seach bar -->
      <div
        class="field is-grouped mt-6 pt-5 has-background-info-light py-3 px-3"
      >
        <p class="control is-expanded" style="width: 5%">
          <!-- start date -->
          <input class="input" type="date" />
        </p>
        <p class="control is-expanded" style="width: 5%">
          <!-- end date -->
          <input class="input" type="date" />
        </p>
        <!-- <p class=""> -->
        <div class="control is-expanded select" style="width: 5%">
          <select style="width: 100%" v-model="selected_room">
            <option>All</option>
            <option v-for="room in rooms" :key="room.room_id">
              {{ room.room_type }}
            </option>
          </select>
        </div>

        <!-- </p> -->
        <div class="control is-expanded select" style="width: 5%">
          <select style="width: 100%" v-model=" selected_price">
            <option v-for="room in priceRoomNew" :key="room.room_id">
              {{ room.price }}
            </option>
          </select>
        </div>
      </div>
      <form action="/search" method="GET">
        <div class="field is-grouped px-3 py-3 pt-5 has-background-info-light">
          <input
            type="text"
            class="input"
            name="search"
            v-model="this.$route.query.search"
          />
          <button class="button" type="submit" value="Search">Search</button>
        </div>
      </form>

      <!-- result -->
      <p class="subtitle has-text-centered mt-6">ผลการค้นหา</p>
      <div class="container my-5" v-for="room in priceRoomNew" :key="room.room_id">
        <div class="tile is-ancestor my-5 has-background-danger-light">
          <div class="tile is-4 is-vertical is-parent">
            <div class="tile is-child">
              <img :src="room.pic1 ? 'http://localhost:3000' + room.pic1 : 'https://i.pinimg.com/originals/22/c0/2f/22c02f8f67b478ef00cb12bcacde588b.jpg'" alt="room.type" width="100%" />
            </div>
          </div>
          <div class="tile is-parent is-vertical">
            <div class="tile is-child">
              <p class="title">{{ room.room_type }}</p>
              <p class="subtitle">{{ room.description }}</p>
            </div>
            <div class="tile is-child has-text-right">
              <p class="title has-text-danger">{{ room.price }}</p>
              <router-link :to="{ name :'Detail', params : { id : room.room_id} }" >
                <button class="button has-background-success">
                  รายละเอียด
                </button>
            </router-link>
              
            </div>
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
            rooms : null,
           selected_room : "All",
           selected_price: "1500",
           priceRoomOld : null,
           priceRoomNew : null,
           search : this.$route.query.search


        }
    },

    created(){
        console.log(this.search)
        axios.get("http://localhost:3000/search", {params : {search : this.search}})
        .then((response) => {
          this.rooms = response.data;
          this.priceRoomNew =response.data;
          this.priceRoomOld = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    computed: {
    // typeRoom() {
    //   return this.rooms.filter(
    //     (value) =>
    //       (value.room_type == this.selected_room || this.selected_room == "All") || (value.price == this.selected_price || this.selected_price == "")
    //   );
    // },
  },
  watch: {
    selected_room(newval) {
      console.log(newval);
      this.priceRoomNew = this.priceRoomOld.filter((value) => {
        return value.room_type == newval || newval == 'All';
      });
    },
    selected_price(newVal){
        this.priceRoomNew = this.priceRoomOld.filter((value) =>{
            return value.price == newVal || newVal == '';
        })
    }
  },
}
</script>

<style>

</style>