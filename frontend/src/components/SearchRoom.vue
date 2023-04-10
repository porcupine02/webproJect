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
            <option v-for="room in allRoom" :key="room">
              {{ room.room_type }}
            </option>
          </select>
        </div>

        <!-- </p> -->
        <div class="control is-expanded select" style="width: 5%">
          <select style="width: 100%">
            <option v-for="item in limit" :key="item">
              {{ item.price }}
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
            value="<%= search %>"
          />
          <button class="button" value="Search">Search</button>
        </div>
      </form>

      <!-- result -->
      <p class="subtitle has-text-centered mt-6">ผลการค้นหา</p>
      <div class="container my-5" v-for="room in selRoom" :key="room">
        <div class="tile is-ancestor my-5 has-background-danger-light">
          <div class="tile is-4 is-vertical is-parent">
            <div class="tile is-child">
              <img :src="room.pic1" alt="room.type" width="100%" />
            </div>
          </div>
          <div class="tile is-parent is-vertical">
            <div class="tile is-child">
              <p class="title">{{ room.room_type }}</p>
              <p class="subtitle">{{ room.description }}</p>
            </div>
            <div class="tile is-child has-text-right">
              <p class="title has-text-danger">{{ room.price }}</p>
              <a :href="'/detail/' + room.room_id">
                <button class="button has-background-success">
                  รายละเอียด
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allRoom: JSON.parse(`<%- roomSearch %>`),
      selected_room: "All",
      selected_price: "",
      limit: JSON.parse(`<%- roomSearch %>`),
      limit_reserve: JSON.parse(`<%- roomSearch %>`),
    };
  },
  computed: {
    selRoom() {
      return this.allRoom.filter(
        (value) =>
          value.room_type == this.selected_room || this.selected_room == "All"
      );
    },
  },
  watch: {
    selected_room(newval) {
      console.log(newval);
      this.limit = this.limit_reserve.filter((value) => {
        return value.room_type == newval;
      });
    },
  },
};
</script>