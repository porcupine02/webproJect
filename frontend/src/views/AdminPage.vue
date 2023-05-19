<template>
  <div>
    <div>
      <NavBar />
    </div>
    <div class="container mt-6 pt-5" id="admin">
      <div class="container mt-6 pt-5">
        <p class="title has-text-centered">ข้อมูลลูกค้า</p>

        <div class="columns">
          <div class="column is-1">
            <!-- left -->
          </div>
          <div class="column">
            <div class="is-medium tabs">
              <ul>
                <li class="tab is-active" @click="openTab(event, 'orders')">
                  <a>orders</a>
                </li>
                <li class="tab" @click="openTab(event, 'rooms')">
                  <a>rooms</a>
                </li>
                <li class="tab" @click="openTab(event, 'report')">
                  <a><i class="fas fa-bell mr-3"></i> Reports </a>
                </li>
              </ul>
            </div>
            <div class="container section">
              <!-- orders -->
              <div id="orders" class="content-tab">
                <table class="table has-text-centered" width="100%">
                  <tr class="title is-5 has-background-danger-light">
                    <td>invoice id</td>
                    <td>type room</td>
                    <td>check in</td>
                    <td>check out</td>
                    <td>price</td>
                    <td>status</td>
                    <td>confirm booking</td>
                  </tr>
                  <tbody
                    class="title is-5 has-background-light subtitle"
                    v-for="(item, index) in history"
                    :key="item"
                  >
                    <tr>
                      <td>{{ "000" + index + 1 }}</td>
                      <td>{{ item.type }}</td>
                      <td>{{ item.checkIn }}</td>
                      <td>{{ item.checkOut }}</td>
                      <td>{{ item.price }} ฿</td>
                      <td
                        :class="
                          item.status == 'wait'
                            ? 'has-background-success'
                            : 'has-background-danger'
                        "
                      >
                        {{ item.status }}
                      </td>
                      <td class="has-background-primary" @click="confirm()">
                        confirm
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- all rooms -->
              <div id="rooms" class="content-tab" style="display: none">
                <div class="container my-5" v-for="room in allRoom" :key="room">
                  <div
                    class="tile is-ancestor my-5 has-background-danger-light"
                  >
                    <div class="tile is-4 is-vertical is-parent">
                      <img
                        :src="
                          room.pic1
                            ? 'http://localhost:3000' + room.pic1
                            : 'https://i.pinimg.com/originals/22/c0/2f/22c02f8f67b478ef00cb12bcacde588b.jpg'
                        "
                        alt="image_room"
                        width="100%"
                      />
                      <div class="tile is-child" style="margin: 20px">
                        <i
                          class="fa fa-star mt-3"
                          style="
                            font-size: 40px;
                            color: rgb(244, 247, 76);
                            margin-left: 100px;
                          "
                        ></i>
                        <i
                          class="fa fa-star mt-3"
                          style="font-size: 40px; color: rgb(244, 247, 76)"
                        ></i>
                        <i
                          class="fa fa-star mt-3"
                          style="font-size: 40px; color: rgb(244, 247, 76)"
                        ></i>
                        <i
                          class="fa fa-star mt-3"
                          style="font-size: 40px; color: rgb(188, 188, 165)"
                        ></i>
                        <i
                          class="fa fa-star mt-3"
                          style="font-size: 40px; color: rgb(188, 188, 165)"
                        ></i>
                      </div>
                    </div>
                    <div class="tile is-parent is-vertical">
                      <div class="tile is-child">
                        <p class="title">{{ room.room_type }}</p>
                        <p class="subtitle">{{ room.description }}</p>
                      </div>
                      <!-- services -->
                      <hr />
                      <p class="subtitle is-5">Facilities</p>
                      <div class="columns">
                        <div
                          class="column is-2 has-text-centered"
                          v-if="room.breakfast == 'yes'"
                        >
                          <i class="fa fa-coffee" style="font-size: 50px"></i
                          ><br />
                          breakfast
                        </div>

                        <div
                          class="column is-2 has-text-centered"
                          v-if="room.air_conditioner == 'yes'"
                        >
                          <i class="fa fa-wifi" style="font-size: 50px"></i
                          ><br />
                          internet
                        </div>
                        <div
                          class="column is-2 has-text-centered"
                          v-if="room.wifi == 'yes'"
                        >
                          <i class="fa fa-wifi" style="font-size: 50px"></i
                          ><br />
                          internet
                        </div>
                        <div
                          class="column is-2 has-text-centered"
                          v-if="room.pool == 'yes'"
                        >
                          <i
                            class="fas fa-swimming-pool"
                            style="font-size: 50px"
                          ></i
                          ><br />
                          pool
                        </div>
                      </div>
                      <div class="tile is-child has-text-right">
                        <p class="title has-text-danger">{{ room.price }}</p>

                        <a :href="'/update/' + room.room_id">
                          <button
                            v-if="logins == true"
                            class="button has-background-success"
                          >
                            แก้ไขข้อมูล
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- report -->
              <div id="report" class="content-tab" style="display: ">
                <div v-for="report in allReports" :key="report.report_id">
                  <article class="card p-3 m-1" :class="report.status == 'accept' ? 'has-background-success-light' : 'has-background-danger-light'">
                    <div class="media-content">
                      <div class="content">
                        <i class="fa fa-user" aria-hidden="true"></i> {{ report.name }}
                        <i class="fa fa-phone-square" aria-hidden="true"></i> {{ report.phone }}
                        <p>
                          {{ report.content }}
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-1">
            <!-- right -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "@/components/NavBar.vue";

export default {
  data() {
    return {
      logins: true,
      allRoom: null,
      allReports: "",
    };
  },
  created() {
    // axios
    //   .get("http://localhost:3000/")
    //   .then((response) => {
    //     this.allRoom = response.data;
    //     console.log(this.allRoom);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // this.getRooms();

    axios
      .get("http://localhost:3000/report")
      .then((res) => {
        this.allReports = res.data.allReports;
        console.log(res.data.allReports);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  components: { NavBar },

  methods: {
    async getRooms() {
      try {
        const response = await axios.get("http://localhost:3000/admin");
        this.allRoom = response.data;
        console.log(this.allRoom);
        console.log("asdfklasdfjlkasdf");
      } catch (err) {
        console.log(err);
      }
    },
    confirm() {
      console.log("test");
    },
    openTab(evt, tabName) {
      var i, x, tablinks;
      x = document.getElementsByClassName("content-tab");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tab");
      for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" is-active", "");
      }
      document.getElementById(tabName).style.display = "block";
      evt.currentTarget.className += " is-active";
    },
  },
};
</script>
