<template>
      <div id="home">
        <!-- login signout -->
        <div :class="{modal: modal, 'is-active': isActive_Sign_in}">
            <div class="modal-background"></div>
            <form class="box  modal-content">
                <div class="field">
                    <label class="label has-text-centered">Sign in</label>
                </div>
                <div class="field">
                    <h1 class="label">Email</h1>
                    <div class="control">
                        <input class="input" type="email" placeholder="e.g. alex@example.com" />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Password</label>
                    <div class="control">
                        <input class="input" type="password" placeholder="********" />
                    </div>
                </div>

                <a class="button is-primary" @click="login()">Sign in</a>
                <button class="button is-danger" @click="Close()">Close</button>
            </form>

        </div>
        <div :class="{modal: modal, 'is-active': isActive_Sign_up}">
            <div class="modal-background"></div>

            <form class="box  modal-content">
                <div class="field">
                    <label class="label has-text-centered">Sign up</label>
                </div>

                <div class="field">
                    <h1 class="label">First Name</h1>
                    <div class="control">
                        <input class="input" type="text" placeholder="Puttipong" v-model="sign_fname" />
                    </div>
                </div>
                <div class="field">
                    <h1 class="label">Last Name</h1>
                    <div class="control">
                        <input class="input" type="text" placeholder="Panich" v-model="sign_lname" />
                    </div>
                </div>
                <div class="field">
                    <label class="label">Phone number</label>
                    <div class="control">
                        <input class="input" type="password" placeholder="083-3343-xxx" v-model="sign_phone" />
                    </div>
                </div>
                <div class="field">
                    <label class="label">Date</label>
                    <div class="control">
                        <input class="input" type="date" placeholder="24/07/2002" v-model="sign_dob" />
                    </div>
                </div>
                <div class="field">
                    <h1 class="label">Email</h1>
                    <div class="control">
                        <input class="input" type="email" placeholder="e.g. alex@example.com" v-model="sign_email" />
                    </div>
                </div>

                <div class="field">
                    <label class="label">User Name</label>
                    <div class="control">
                        <input class="input" type="password" placeholder="Folk" v-model="sign_username" />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Password</label>
                    <div class="control"> <input class="input" type="password" placeholder="********"
                            v-model="sign_pass" />
                    </div>
                </div>

                <button class="button is-primary">
                    <a href="profile.html">Sign up</a>
                </button>
                <button class="button is-danger" @click="Close()">Close</button>
            </form>
        </div>

        <!-- nav bar -->
        <nav class="navbar is-dark" role="navigation" aria-label="main navigation"
            style="position:fixed; top: 0; width: 100%;">
            <div class="navbar-brand">
                <a class="navbar-item" href="http://localhost:8080/">
                    <i class="fas fa-home "></i>
                  Home
                </a>
            </div>
            <div class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-item" v-if="logins == true" href="search.html">
                        ค้นหาห้องพัก
                    </a>

                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            ห้องพักของเรา
                        </a>

                        <div class="navbar-dropdown">
                            <a class="navbar-item" href="index.html#01">
                                Standard Room
                            </a>
                            <a class="navbar-item" href="index.html#02">
                                Deluxe Room
                            </a>
                            <a class="navbar-item" href="index.html#03">
                                Suite Room
                            </a>
                            <a class="navbar-item" href="index.html#04">
                                Superior Room
                            </a>
                        </div>
                    </div>
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons asd">
                            <a class="button is-info" v-if="logins == false" @click="isActive_Sign_up = true">
                                <strong>Sign up</strong>
                            </a>
                            <a class="button is-dark" v-if="logins == true" href="profile.html">
                                <strong>My Profile</strong>
                            </a>
                            <a class="button is-dark" v-if="logins == false" @click="isActive_Sign_in = true">
                                Log in
                            </a>
                            <a class="button is-danger" v-if="logins == true" @click="logins = false">Log out</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <!-- banner -->

        <section class="hero has-background-info-light is-large bannerImage">
            <div class="hero-body has-text-centered" style="z-index: 2;">
                <p class="title is-size-1">
                    HOTEL BOOKING
                </p>
                <p class="subtitle">
                    information for you
                </p>
            </div>
        </section>




        <!-- content -->
        <div class="container my-5" v-for="room in rooms" :key="room">

            <div id="room.room_id">
                <div class="tile is-ancestor my-5 has-background-danger-light">
                    <div class="tile is-4 is-vertical is-parent">
                        <div class="tile is-child">

                            <img :src="room.pic1" alt="" style="width: 100%;">
                            <fa icon="star" class=" mt-3" style="font-size:40px ;color:rgb(244, 247, 76)"></fa>
                            <fa icon="star" class=" mt-3" style="font-size:40px ;color:rgb(244, 247, 76)"></fa>
                            <fa icon="star" class=" mt-3" style="font-size:40px ;color:rgb(244, 247, 76)"></fa>
                            <fa icon="star" class=" mt-3" style="font-size:40px ;color:rgb(188, 188, 165)"></fa>
                            <fa icon="star" class=" mt-3" style="font-size:40px ;color:rgb(188, 188, 165)"></fa>
                        </div>
                    </div>
                    <div class="tile is-parent is-vertical">
                        <div class="tile is-child">
                            <p class="title">{{room.room_type}}</p>
                            <p class="subtitle">{{room.description}}</p>
                        </div>
                        <!-- services -->
                        <hr>
                        <p class="subtitle is-5">Facilities</p>
                        <div class="columns">
                            <div class="column is-2 has-text-centered"  v-if="room.breakfast == 'yes'">
                                <fa icon="coffee" style="font-size:50px"></fa><br>
                                breakfast
                            </div>

                            <div class="column is-2 has-text-centered"  v-if="room.wifi == 'yes'">
                                <fa icon="wifi" style="font-size:50px"></fa><br>
                                internet
                            </div>
                            <div class="column is-2 has-text-centered"  v-if="room.air_conditioner == 'yes'">
                                <fa icon="wifi" style="font-size:50px"></fa><br>
                                internet
                            </div>
                            <div class="column is-2 has-text-centered" v-if="room.pool == 'yes'">
                                <fa icon="swimming-pool" style="font-size:50px"></fa><br>
                                pool
                            </div>

                        </div>
                        <div class="tile is-child has-text-right">
                            <p class="title has-text-danger"></p>
                            <a href="/booking">
                                <button v-if="logins == true" class="button has-background-success">จองตอนนี้</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Contact -->
        <div class="container">
            <div class="columns">
                <div class="column is-7">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15513.042363639155!2d100.653445!3d13.580884599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d5fb6535ef921%3A0x92a8402c649e96b8!2z4LiV4Lil4Liy4LiU4LmA4LiL4LmI4LmA4Lin4LmI4LiZ!5e0!3m2!1sth!2sth!4v1679677449385!5m2!1sth!2sth"
                        width="100%" height="500" allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div class="column is-5">
                    <p class="title is-5 has-text-centered">
                        Contact Me
                    </p>
                    <p class="subtitle is-6">
                        Tell : <br>
                        Facebook : <br>
                        Instargram : <br>
                        E-mail : <br>
                    </p>
                </div>
            </div>



        </div>
    </div>
</template>

<script>
//import axios
import axios from "axios";
/* add fontawesome core */



export default {

  data() {
    return {
      rooms: [],
      filename : '~',
      link: 'standard1.jpg',
      modal: true,
      isActive_Sign_in: false,
      isActive_Sign_up: false,
      logins: false,
      sign_fname: '',
      sign_lname: '',
      sign_phone: '',
      sign_dob: '',
      sign_email: '',
      sign_username: '',
      sign_pass: '',
    };
  },
  created() {
    this.getRooms();
  },
  methods: {
    // get all rooms
    async getRooms(){
        try{
            const response = await axios.get('http://localhost:5000/room')
            this.rooms = response.data;
            console.log(JSON.stringify(this.rooms));

        }catch(err){
            console.log(err);
        }
    },
    Close() {
        this.isActive_Sign_in = false
        this.isActive_Sign_up = false
    },
    login() {
        this.logins = true;
        this.isActive_Sign_in = false
    },


  },

//   computed:{
//      images(){
//          return require(`../assets/standard1.jpg`)

//     }
//   }
};
</script>

<style>
.bannerImage {
    background: linear-gradient(rgba(221, 246, 255, 0.141) 50%, rgba(108, 120, 123, 0.278)), url('../assets/banner.jpg');
}
</style>
