<template>
  <div class="container is-widescreen">
    <section class="hero">
      <div class="hero-body">
        <p class="title">Create new Room</p>
      </div>
    </section>
    <section class="px-6">
      <!-- <%= error.code + ': ' + error.sqlMessage %> -->
      <!---->
      {{ error }}
      <input
        class="mb-5"
        multiple
        type="file"
        accept="image/png, image/jpeg, image/webp"
        @change="selectImages"
      />

      <div v-if="images" class="columns is-multiline">
        <div
          v-for="(image, index) in images"
          :key="image.id"
          class="column is-one-quarter"
        >
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="showSelectImage(image)" alt="Placeholder image" />
              </figure>
            </div>
            <footer class="card-footer">
              <a
                @click="deleteSelectImage(index)"
                class="card-footer-item has-text-danger"
                >Delete</a
              >
            </footer>
          </div>
        </div>
      </div>

      <div class="field mt-5">
        <label class="label">ประเภทห้องพัก</label>
        <div class="control">
          <div class="select">
            <select v-model="selected">
              <option v-for="type in roomtype" :key="type.room_id">
                {{ type.room_type }}
              </option>
              <option value="0">อื่นๆ โปรดระบุ</option>
            </select>
          </div>
          <input
            class="input mt-2"
            type="text"
            placeholder="ประเภทห้องพัก"
            v-show="selected == 0"
            v-model="newRoom"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">รายละเอียดห้องพัก</label>
        <div class="control">
          <textarea
            v-model="description"
            class="textarea"
            placeholder="รายละเอียดห้องพัก"
          ></textarea>
        </div>
      </div>

      <div class="field">
        <label class="label">ราคาห้องต่อคืน</label>
        <div class="control">
          <input class="input column is-2" type="number" v-model="price" />
        </div>
      </div>

      <div class="field">
        <label class="label">บริการจากทางโรงแรม</label>
        <div class="control mb-3 columns">
          <label class="checkbox column is-2">
            <input type="checkbox" v-model="service1" />
            อาหารเช้า
          </label>
          <label class="checkbox column is-2">
            <input type="checkbox" v-model="service2" />
            สระว่าย
          </label>
          <label class="checkbox column is-2">
            <input type="checkbox" v-model="service3" />
            อินเทอร์เน็ต
          </label>
          <label class="checkbox column is-2">
            <input type="checkbox" v-model="service4" />
            เครื่องปรับอากาศ
          </label>
        </div>
      </div>

      <div class="field">
        <label class="label">จำนวนคนที่เหมาะกับห้องนี้</label>
        <div class="control">
          <input class="input column is-2" type="number" v-model="people" />
        </div>
      </div>
      <div class="field">
        <label class="label">จำนวนห้องที่เปิดให้บริการ</label>
        <div class="control">
          <input class="input column is-2" type="number" v-model="count" />
        </div>
      </div>

      <hr />

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" @click="submitNewRoom()">
            Submit
          </button>
        </div>
        <div class="control">
          <button class="button is-link is-light">Cancel</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  data() {
    return {
      newRoom: "",
      roomtype: [],
      error: null,
      images: [], // array of image
      selected: "asdf",
      price: "",
      description: "",
      service1: false,
      service2: false,
      service3: false,
      service4: false,
      people: "",
      count: '',
    };
  },
  methods: {
    selectImages(event) {
      this.images = event.target.files;
      console.log(typeof this.images);
      console.log(event.target.files);
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
    submitNewRoom() {
      console.log("submit");

      if (this.selected == 0) {
        this.selected = this.newRoom;
      }
      // this.images.forEach((image) => {
      //   formData.append("myImage", image);
      // });
      let formData = new FormData();
      formData.append("room_type", this.selected);
      formData.append("description", this.description);
      formData.append("price", this.price);
      formData.append("service1", this.service1 ? "yes" : "no");
      formData.append("service2", this.service2 ? "yes" : "no");
      formData.append("service3", this.service3 ? "yes" : "no");
      formData.append("service4", this.service4 ? "yes" : "no");
      formData.append("people", this.people);
      formData.append("count", this.count);
      this.images = Array.from(this.images)
      this.images.forEach((image) => {
        if (image.size > 1000000) {
          console.log("too large image");
        }
        formData.append("myImage", image);
      });

      // let formData = {
      //   room_type: this.selected,
      //   description: this.description,
      //   price: this.price,
      //   service1: this.service1 ? "yes" : "no",
      //   service2: this.service2 ? "yes" : "no",
      //   service3: this.service3 ? "yes" : "no",
      //   service4: this.service4 ? "yes" : "no",
      //   people: this.people,
      //   myImage: this.images,
      // };
      console.log(formData);

      axios
        .post("http://localhost:3000/admin/create", formData)
        .then((res) => {
          console.log(res);
          this.$router.push({
            name: "Home",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.images = Array.from(this.images);
    axios
      .get("http://localhost:3000/admin/create")
      .then((res) => {
        this.roomtype = res.data;
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style></style>
