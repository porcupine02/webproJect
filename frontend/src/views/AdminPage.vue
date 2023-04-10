<template>
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
                                    <li class="tab is-active" @click="openTab(event,'orders')"><a>orders</a></li>
                                    <li class="tab" @click="openTab(event,'rooms')"><a>rooms</a></li>
                                    <li class="tab" @click="openTab(event,'addRoom')"><a>add room</a></li>
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
                                        <tbody class="title is-5 has-background-light subtitle"
                                            v-for="(item, index) in history" :key="item">
                                            <tr>
                                                <td>{{ '000' + index+1 }}</td>
                                                <td>{{ item.type }}</td>
                                                <td>{{ item.checkIn }}</td>
                                                <td>{{ item.checkOut }}</td>
                                                <td>{{ item.price }} ฿</td>
                                                <td
                                                    :class="item.status == 'wait' ? 'has-background-success' : 'has-background-danger'">
                                                    {{ item.status }}</td>
                                                <td class="has-background-primary" @click="confirm()"> confirm</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- all rooms -->
                                <div id="rooms" class="content-tab" style="display:none">
                                    <div class="container my-5" v-for="room in allRoom" :key="room">
                                        <div class="tile is-ancestor my-5 has-background-danger-light">
                                            <div class="tile is-4 is-vertical is-parent">
                                                <img :src="room.pic1" alt="image_room" width="100%">
                                                <div class="tile is-child " style="margin: 20px;">
                                                    <i class="fa fa-star mt-3"
                                                        style="font-size:40px ;color:rgb(244, 247, 76); margin-left: 100px;"></i>
                                                    <i class="fa fa-star mt-3"
                                                        style="font-size:40px ;color:rgb(244, 247, 76)"></i>
                                                    <i class="fa fa-star mt-3"
                                                        style="font-size:40px ;color:rgb(244, 247, 76)"></i>
                                                    <i class="fa fa-star mt-3"
                                                        style="font-size:40px ;color:rgb(188, 188, 165)"></i>
                                                    <i class="fa fa-star mt-3"
                                                        style="font-size:40px ;color:rgb(188, 188, 165)"></i>
                                                </div>
                                            </div>
                                            <div class="tile is-parent is-vertical">
                                                <div class="tile is-child">
                                                    <p class="title">{{ room.room_type }}</p>
                                                    <p class="subtitle">{{ room.description }}</p>
                                                </div>
                                                <!-- services -->
                                                <hr>
                                                <p class="subtitle is-5">Facilities</p>
                                                <div class="columns">


                                                    <div class="column is-2 has-text-centered"
                                                        v-if="room.breakfast == 'yes'">
                                                        <i class="fa fa-coffee" style="font-size:50px"></i><br>
                                                        breakfast
                                                    </div>

                                                    <div class="column is-2 has-text-centered"
                                                        v-if="room.air_conditioner == 'yes'">
                                                        <i class="fa fa-wifi" style="font-size:50px"></i><br>
                                                        internet
                                                    </div>
                                                    <div class="column is-2 has-text-centered"
                                                        v-if="room.wifi == 'yes'">
                                                        <i class="fa fa-wifi" style="font-size:50px"></i><br>
                                                        internet
                                                    </div>
                                                    <div class="column is-2 has-text-centered"
                                                        v-if="room.pool == 'yes'">
                                                        <i class="	fas fa-swimming-pool" style="font-size:50px"></i><br>
                                                        pool
                                                    </div>

                                                </div>
                                                <div class="tile is-child has-text-right">
                                                    <p class="title has-text-danger">{{room.price}}</p>

                                                    <a :href="'/update/' + room.room_id ">
                                                        <button v-if="logins == true"
                                                            class="button has-background-success">แก้ไขข้อมูล</button>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- add room -->
                                <div id="addRoom" class="content-tab" style="display:none">
                                    <form method="GET" action="/admin/addroom" enctype="multipart/form-data">

                                        ชื่อห้อง
                                        <input class="input" type="text" name="room_type" placeholder="Standard room"
                                            required>
                                        <p>รายละเอียด
                                            <textarea name="description" class="input"
                                                placeholder="Detail for this room" required></textarea>
                                        </p>
                                        <p>บริการจากทางโรงแรม
                                            <br>
                                        <ul class="checkbox" name="services">
                                            <li><input type="checkbox" name="breakfast" value="yes">breakfast</li>
                                            <li><input type="checkbox" name="pool" value="yes">pool</li>
                                            <li><input type="checkbox" name="wifi" value="yes">wifi</li>
                                            <li><input type="checkbox" name="air_conditioner"
                                                    value="air_conditioner">air_conditioner</li>
                                        </ul>
                                        </p>
                                        ภาพห้อง
                                        <div class="columns mt-3">
                                            <div class="cloumn">
                                                <input type="file" name="pic1" required>
                                            </div>
                                            <div class="cloumn">
                                                <input type="file" name="pic2">
                                            </div>
                                            <div class="cloumn">
                                                <input type="file" name="pic3">
                                            </div>
                                            <div class="cloumn">
                                                <input type="file" name="pic4">
                                            </div>
                                        </div>
                                        <div class="columns mt-3">
                                            <div class="cloumn">
                                                จำนวนห้องที่เปิดให้บริการ<input class="input" type="number" required>
                                            </div>

                                            <div class="cloumn">
                                                ราคา<input type="number" class="input" name="price" required>
                                            </div>

                                        </div>
                                        <input class="button" type="submit" value="Submit">

                                    </form>
                                </div>
                            </div>

                        </div>
                        <div class="column is-1">
                            <!-- right -->
                        </div>
                    </div>
                </div>
            </div>



</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      logins: true,
      allRoom: null,
    };
  },
  created() {
    axios
      .get("http://localhost:3000/")
      .then((response) => {
        this.allRoom = response.data;
        console.log(this.allRoom);
      })
      .catch((err) => {
        console.log(err);
      });
    this.getRooms();
  },
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
