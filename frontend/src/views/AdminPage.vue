<template>
<div id="admin">


            <nav
                class="navbar is-dark"
                role="navigation"
                aria-label="main navigation"
                style="position: fixed; top: 0; width: 100%"
            >
                <div class="navbar-brand">
                <a class="navbar-item" href="http://localhost:8080/">
                    <i class="fas fa-home"></i>
                    Home
                </a>
                </div>
                <div class="navbar-menu">
                <div class="navbar-start">
                    <a
                    class="navbar-item"
                    v-if="logins == true"
                    href="http://localhost:8080/search"
                    >
                    ค้นหาห้องพัก
                    </a>

                    <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link"> ห้องพักของเรา </a>

                    <div class="navbar-dropdown">
                        <a class="navbar-item" href="index.html#01"> Standard Room </a>
                        <a class="navbar-item" href="index.html#02"> Deluxe Room </a>
                        <a class="navbar-item" href="index.html#03"> Suite Room </a>
                        <a class="navbar-item" href="index.html#04"> Superior Room </a>
                    </div>
                    </div>
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                    <div class="buttons asd">
                        <a
                        class="button is-info"
                        v-if="logins == false"
                        @click="isActive_Sign_up = true"
                        >
                        <strong>Sign up</strong>
                        </a>
                        <a class="button is-dark" v-if="logins == true" href="profile.html">
                        <strong>My Profile</strong>
                        </a>
                        <a
                        class="button is-dark"
                        v-if="logins == false"
                        @click="isActive_Sign_in = true"
                        >
                        Log in
                        </a>
                        <a class="button is-danger" v-if="logins == true" @click="logOut()"
                        >Log out</a
                        >
                    </div>
                    </div>
                </div>
                </div>
            </nav>
            <div class="container mt-6 pt-5">
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
                                                <img :src=" room.pic1
                    ? 'http://localhost:3000' + room.pic1
                    : 'https://i.pinimg.com/originals/22/c0/2f/22c02f8f67b478ef00cb12bcacde588b.jpg'" alt="image_room" width="100%">
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
                                <div id="addRoom" class="content-tab" style="display: none">
                                    <!-- <form method="GET" action="/admin/addroom" enctype="multipart/form-data"> -->

                                        ชื่อห้อง
                                        <p class="control has-icons-left has-icons-right mb-3">
                                            <span class="icon is-small is-left">
                                            <i class="fas fa-hotel"></i>
                                            </span>
                                            <input class="input" type="text" name="room_type" placeholder="Standard room" v-model="room_type"
                                                required>
                                        </p>
                                        รายละเอียด
                                        <p class="control has-icons-left has-icons-right mb-3">
                                            <span class="icon is-small is-left">
                                            <i class="fas fa-book"></i>
                                            </span>
                                            <textarea name="description" class="input"
                                                placeholder="Detail for this room"  v-model="room_description" required></textarea>
                                        </p>
                                        <p>บริการจากทางโรงแรม
                                            <br>
                                        <ul class="checkbox columns mb-3" name="services">
                                            <div class="column">
                                                <input type="checkbox" name="breakfast" value="yes" v-model="breakfast" > breakfast
                                            </div>
                                            <div class="column">
                                                <input type="checkbox" name="pool" value="yes" v-model="pool" > pool
                                            </div>
                                            <div class="column">
                                                <input type="checkbox" name="wifi" value="yes" v-model="wifi" > wifi
                                            </div>
                                            <div class="column">
                                                <input type="checkbox" name="air_conditioner"  v-model="air_conditioner"
                                                    value="air_conditioner"> air_conditioner</div>
                                        </ul>
                                        </p>
                                        <input
                                            class="mb-5"
                                            multiple
                                            type="file"
                                            accept="image/png, image/jpeg, image/webp"
                                            @change="selectImages" name="images"
                                        />

                                        <div v-if="images" class="columns is-multiline">
                                            <div v-for="(image, index) in images" :key="image.id" class="column is-one-quarter">
                                            <div class="card">
                                                <div class="card-image">
                                                <figure class="image is-4by3">
                                                    <img :src="showSelectImage(image)" alt="Placeholder image" />
                                                </figure>
                                                </div>
                                                <footer class="card-footer">
                                                <a @click="deleteSelectImage(index)" class="card-footer-item has-text-danger">Delete</a>
                                                </footer>
                                            </div>
                                            </div>
                                        </div>
                                        <!-- ภาพห้อง
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
                                        </div> -->
                                        <div class="columns mt-3">
                                            <div class="column is-3">
                                                จำนวนห้องที่เปิดให้บริการ
                                                    <input class="input" type="number" v-model="count_room" required>
                                            </div>

                                            <div class="column is-2">
                                                ราคา<input type="number" class="input" name="price" v-model="price" required>
                                            </div>

                                        </div>
                                        <input class="button is-success" type="submit" value="Add Room" @click="submit()">

                                    <!-- </form> -->
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

export default {
  data() {
    return {
      logins: true,
      allRoom: null,
      room_type: "",
      room_description: "",
      breakfast: false,
      pool: false,
      wifi: false,
      air_conditioner: false,
      pic: [],
      count_room: 0,
      price: 0,
      images: [], // array of image
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
    submit() {
      console.log("submit");
      let formData = new FormData();
      formData.append("room_type", this.room_type);
      formData.append("room_description", this.room_description);
      formData.append("price", this.price);
      formData.append("air", this.air_conditioner);
      formData.append("breakfast", this.breakfast);
      formData.append("pool", this.pool);
      formData.append("wifi", this.wifi);
      formData.append("count_room", this.count_room);
      //   this.images.forEach((image) => {
      formData.append("myImage1", this.images);
      //   });
      //   const newRoom = {
      //     room_type: this.room_type,
      //     room_description: this.room_description,
      //     price: this.price,
      //     breakfast: this.breakfast,
      //     pool: this.pool,
      //     wifi: this.wifi,
      //     air: this.air_conditioner,
      //     count_room: this.count_room,
      //     images: this.images,
      //   };
      axios
        .post("http://localhost:3000/admin/addroom", formData)
        .then((res) => {
          console.log(res);
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectImages(event) {
      this.images = event.target.files;
    },
    showSelectImage(image) {
      // for preview only
      return URL.createObjectURL(image);
    },
    deleteSelectImage(index) {
      console.log(this.images);
      this.images = Array.from(this.images);
      this.images.splice(index, 1);
    },
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
