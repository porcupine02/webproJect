<template>
  <div>
    <div>
      <NavBar />
    </div>
    <div class="container is-widescreen m-6">
      <section class="hero">
        <div class="hero-body">
          <p class="title">Edit Room</p>
        </div>
      </section>
      <section class="px-6">
        <!-- <%= error.code + ': ' + error.sqlMessage %> -->
        <!---->

        <!-- <label class="checkbox column is-2">
        <input type="checkbox" v-model="addNewImage" />
        ต้องการเปลี่ยนรูปใหม่
      </label>
      <div v-if="addNewImage">
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
      </div> -->
        <div class="field mt-5">
          <label class="label">ประเภทห้องพัก</label>
          <div class="control">
            <input class="input" type="text" v-model="room_type" disabled />
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
              disabled
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
            <button class="button is-link" @click="submitUpdateRoom()">
              Submit
            </button>
          </div>
          <div class="control">
            <a href="/"
              ><button class="button is-link is-light">Cancel</button></a
            >
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
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
      addNewImage: false,
      error: null,
      images: [], // array of image
      room_type: "",
      price: "",
      description: "",
      service1: false,
      service2: false,
      service3: false,
      service4: false,
      people: "",
      count: "",
      service_id: "",
    };
  },
  components: { NavBar },
  validations: {
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
    submitUpdateRoom() {
      console.log("submit");
      const formData = {
        room_type: this.room_type,
        description: this.description,
        price: this.price,
        service1: this.service1 ? "yes" : "no",
        service2: this.service2 ? "yes" : "no",
        service3: this.service3 ? "yes" : "no",
        service4: this.service4 ? "yes" : "no",
        people: this.people,
        count: this.count,
        service_id: this.service_id,
      };
      console.log(formData);

      axios
        .put(
          `http://localhost:3000/admin/update/${this.$route.params.id}`,
          formData
        )
        .then((res) => {
          console.log(res);
          console.log("send");
          this.$router.push({
            name: "Home",
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
      .get(`http://localhost:3000/admin/update/${this.$route.params.id}`)
      .then((res) => {
        console.log(res.data);
        const room = res.data[0];
        this.price = room.price;
        this.count = room.count;
        this.people = room.people;
        this.description = room.description;
        this.room_type = room.room_type;
        this.service_id = room.service_id;
        if (room.breakfast == "yes") {
          this.service1 = true;
        } else {
          this.service1 = false;
        }
        if (room.pool == "yes") {
          this.service2 = true;
        } else {
          this.service2 = false;
        }
        if (room.wifi == "yes") {
          this.service3 = true;
        } else {
          this.service3 = false;
        }
        if (room.air_conditioner == "yes") {
          this.service4 = true;
        } else {
          this.service4 = false;
        }
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style></style>
