<template>
    <div class="columns" style="margin-top: 200px" id="Booking">
      <div class="column"></div>
      <div
        class="box column is-three-fifths"
        style="margin-top: 20px; padding: 50px; font-size: 15px"
      >
        <div class="columns">
          <div class="column is-three">
            <label for="">Check in</label>
            <div>
              <input
                type="date"
                class="input is-small"
                style="width: 230px; margin-top: 10px"
                v-model="checkIn"
              />
            </div>
          </div>
          <div class="column">
            <label for="">Check out</label>
            <div>
              <input
                type="date"
                class="input is-small"
                style="width: 230px; margin-top: 10px"
                v-model="checkOut"
              />
            </div>
          </div>
  
          <div class="column">
            <label for="">People</label>
            <div>
              <div class="select is-small" style="margin-top: 10px">
                <select style="width: 230px" v-model="people">
                  <option value="1">1 person</option>
                  <option value="2">2 people</option>
                  <option value="3">3 people</option>
                  <option value="4">4 people</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-three">
            <label for="">Rooms</label>
            <div>
              <div class="select is-small" style="margin-top: 10px">
                <select style="width: 230px" v-model="room">
                  <option value="1">1 room</option>
                  <option value="2">2 rooms</option>
                  <option value="3">3 rooms</option>
                  <option value="4">4 rooms</option>
                </select>
              </div>
            </div>
          </div>
          <div class="column">
            <label for="">Type room</label>
            <div>
              <div class="select is-small" style="margin-top: 10px">
                <select style="width: 230px" v-model="checkType">
                  <option v-for="item in allRoom" :key="item">
                    {{ item.room_type }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="column">
            <label for="">Price</label>
            <input v-model="price" class="mt-3" />
            {{ price + " x " + room + " = " + price * room }}
          </div>
        </div>
        <div class="columns">
          <div class="column is-three">
            <label for="">First Name</label>
            <div>
              <input
                type="text"
                class="input is-small"
                style="margin-top: 10px; width: 230px"
                placeholder="Puttonpong"
                v-model="fname"
              />
            </div>
          </div>
          <div class="column">
            <label for="">Last Name</label>
            <div>
              <input
                type="text"
                class="input is-small"
                style="margin-top: 10px; width: 230px"
                placeholder="Panich"
                v-model="lname"
              />
            </div>
          </div>
  
          <div class="column"></div>
        </div>
        <div class="columns">
          <div class="column"></div>
          <div class="column"></div>
          <div class="column"></div>
          <div class="column"></div>
          <div class="column">
            <a
              href="/booking/invoice"
              class="button has-background-danger is-normal is-rounded"
              @click="confirm_booking()"
              >Next</a
            >
          </div>
        </div>
      </div>
  
      <div class="column"></div>
    </div>
  </template>
  
  <script>

  
  
  export default {
    data() {
      return {
        allRoom: JSON.parse(`<%- rooms %>`),
        checkType: "",
        price: 0,
        fname: "",
        lname: "",
        checkIn: "",
        checkOut: "",
        people: "",
        num: "",
        room: 0,
        customer: [],
        money: [],
      };
    },
    methods: {
      confirm_booking() {
        this.customer.push({
          fname: this.fname,
          lname: this.lname,
          checkIn: this.checkIn,
          checkOut: this.checkOut,
          price: this.price,
          people: this.people,
          countRoom: this.room,
          type: this.checkType,
          status: "wait",
        });
        // console.log(this.customer)
        const dataBooking = JSON.stringify(this.customer);
        localStorage.setItem("book", dataBooking);
        console.log(dataBooking);
        window.location.href = "invoice.html";
        // window.location.href = "profile.html";
      },
    },
    watch: {
      checkType(newVal) {
        if (newVal == "standard room") {
          this.price = this.allRoom[0].price;
        } else if (newVal == "deluxe room") {
          this.price = this.allRoom[1].price;
        } else if (newVal == "suite room") {
          this.price = this.allRoom[2].price;
        } else if (newVal == "superior room") {
          this.price = this.allRoom[3].price;
        }
      },
    },
    created() {
      if (JSON.parse(localStorage.getItem("book")) != null)
        this.customer = JSON.parse(localStorage.getItem("book"));
    },
  };
  </script>
  
  <style>
  </style>