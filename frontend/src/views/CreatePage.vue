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
      <div class="content">
        <h1 class="has-text-danger has-text-centered">
          {{ error }}
        </h1>
      </div>
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
            <select v-model="$v.selected.$model">
              <option v-for="type in roomtype" :key="type.room_id">
                {{ type.room_type }}
              </option>
              <option value="0">อื่นๆ โปรดระบุ</option>
            </select>
          </div>
          <input
            :class="$v.newRoom.$error ? 'is-danger' : ''"
            class="input mt-2"
            type="text"
            placeholder="ประเภทห้องพัก"
            v-show="selected == 0"
            v-model="$v.newRoom.$model"
          />

          <template v-if="$v.newRoom.$error">
            <p class="help is-danger" v-if="!$v.newRoom.minLength">
              ต้องมีข้อมูลมากกว่า 10 ตัวอักษร
            </p>
            <p class="help is-danger" v-if="!$v.newRoom.maxLength">
              ต้องมีข้อมูลไม่เกิน 50 ตัวอักษร
            </p>
          </template>
        </div>
      </div>

      <div class="field">
        <label class="label">รายละเอียดห้องพัก</label>
        <div class="control">
          <textarea
            :class="$v.description.$error ? 'is-danger' : ''"
            v-model="$v.description.$model"
            class="textarea"
            placeholder="รายละเอียดห้องพัก"
          ></textarea>

          <template v-if="$v.description.$error">
            <p class="help is-danger" v-if="!$v.description.minLength">
              ต้องมีข้อมูลมากกว่า 50 ตัวอักษร
            </p>
          </template>
        </div>
      </div>

      <div class="field">
        <label class="label">ราคาห้องต่อคืน</label>
        <div class="control">
          <input
            class="input column is-2"
            type="number"
            v-model="$v.price.$model"
            :class="$v.price.$error ? 'is-danger' : ''"
          />
        </div>
        <template v-if="$v.price.$error">
          <p class="help is-danger" v-if="!$v.price.integer">
            จำนวณเงินต้องมากกว่า 0
          </p>
        </template>
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
          <input
            class="input column is-2"
            type="number"
            :class="$v.people.$error ? 'is-danger' : ''"
            v-model="$v.people.$model"
          />
        </div>
        <template v-if="$v.people.$error">
          <p class="help is-danger" v-if="!$v.people.integer">
            จำนวณเงินต้องมากกว่า 0
          </p>
        </template>
      </div>
      <div class="field">
        <label class="label">จำนวนห้องที่เปิดให้บริการ</label>
        <div class="control">
          <input
            class="input column is-2"
            v-model="$v.count.$model"
            :class="$v.count.$error ? 'is-danger' : ''"
            type="number"
          />
        </div>
        <template v-if="$v.people.$error">
          <p class="help is-danger" v-if="!$v.count.integer">
            จำนวนห้องต้องมากกว่า 0
          </p>
        </template>
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
import {
  required,
  minLength,
  maxLength,
  integer,
} from "vuelidate/lib/validators";
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
      count: "",
    };
  },
  validations: {
    selected: {
      required,
      minLength: minLength(10),
      maxLength: maxLength(50),
    },
    description: {
      required,
      minLength: minLength(50),
    },
    price: {
      required,
      integer: integer,
    },
    people: {
      required,
      integer: integer,
    },
    newRoom: {
      minLength: minLength(10),
      maxLength: maxLength(50),
    },
    count: {
      required,
      integer: integer,
    },
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
      this.images = Array.from(this.images);
      this.images.forEach((image) => {
        if (image.size > 1000000) {
          console.log("too large image");
        }
        formData.append("myImage", image);
      });
      console.log(formData);

      axios
        .post("http://localhost:3000/admin/create", formData)
        .then((res) => {
          console.log(res);
          this.$router.push({
            name: "Home"
             });
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data.message;
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
