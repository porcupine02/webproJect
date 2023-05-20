<template>
  <div>
    <div>
      <NavBar />
    </div>
    <div class="mt-6 pt-5" id="admin">
      <div class="mt-6 pt-5">
        <p class="title has-text-centered">ข้อมูลลูกค้า</p>

        <div class="columns">
          <div class="column is-1">
            <!-- left -->
          </div>
          <div class="column">
            <div class="is-medium tabs">
              <ul>
                <li
                  class="tab is-active"
                  @click="openTab(event, 'information')"
                >
                  <a><i class="fa fa-question-circle mr-3"></i> information</a>
                </li>
                <li class="tab" @click="openTab(event, 'customer')">
                  <a><i class="fa fa-users mr-3"></i> customers</a>
                </li>
                <li class="tab" @click="openTab(event, 'report')">
                  <a><i class="fas fa-bell mr-3"></i> Report </a>
                </li>
                <li class="tab" @click="openTab(event, 'edit')">
                  <a><i class="fas fa-cog mr-3"></i> Edit Rooms </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="column is-1">
            <!-- right -->
          </div>
        </div>
        <div class="columns">
          <div class="container section">
            <!-- information -->
            <div id="information" class="content-tab">
              <div class="columns">
                <div class="field column">
                  <label class="label">ข้อมูลที่ต้องการ</label>
                  <div class="control tags">
                    <div
                      class="field is-grouped is-grouped-multiline m-1"
                      v-for="(tag, index) in tags"
                      :key="tag"
                    >
                      <div class="control">
                        <div class="tags has-addons">
                          <span class="tag is-primary">{{ tag }}</span>
                          <a
                            class="tag is-delete"
                            @click="deleteTag(index)"
                          ></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="control">
                    <input
                      class="input"
                      type="text"
                      placeholder="Add tag"
                      v-model="tagInput"
                      @keydown="addTag"
                    />
                  </div>
                </div>
                <div class="column is-1">
                  <br />
                  <br />
                  <div class="button is-info" @click="searchQuery()">
                    search
                  </div>
                </div>
              </div>
              <div class="table">
                <div class="tr" v-for="item in result" :key="item">
                  <div class="th">
                    {{ item }}
                    {{ item }}
                  </div>
                </div>

                {{ result }}
              </div>
            </div>
            <!-- all customer -->
            <div id="customer" class="content-tab" style="display: none">
              <div class="columns">
                <div class="column is-1"></div>
                <div class="column is-8">
                  <input
                    type="text"
                    class="input is-rounded"
                    placeholder="ค้นหาข้อมูลลูกค้า"
                    v-model="search"
                  />
                </div>
                <div class="column is-2">
                  <div class="button is-info" @click="searchCustomer()">
                    ค้นหา
                  </div>
                </div>
              </div>
              <div class="columns is-multiline">
                <div
                  class="column is-4"
                  v-for="customer in customers"
                  :key="customer.cus_id"
                >
                  <div class="card-image">
                    <figure class="image is-4by3">
                      <img
                        src="https://bulma.io/images/placeholders/1280x960.png"
                        alt="Placeholder image"
                      />
                    </figure>
                  </div>
                  <div class="card-content">
                    <div class="content">
                      <i class="fa fa-id-card-o" aria-hidden="true"></i>
                      {{ "user" + customer.cus_id }}
                      <br />
                      <i class="fa fa-user" aria-hidden="true"></i>
                      {{ customer.name }}
                      <br />
                      <i class="fa fa-phone" aria-hidden="true"></i>
                      {{ customer.phone }}
                      <br />
                      <i class="fa fa-envelope" aria-hidden="true"></i>
                      <a @click="mailTo(customer.email)">
                        {{ customer.email }}</a
                      >
                      <br />
                      <i class="fa fa-birthday-cake" aria-hidden="true"></i>
                      {{ customer.DOB }}
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- report -->
            <div id="report" class="content-tab" style="display: none">
              <div
                v-for="report in allReports"
                :key="report.report_id"
                class="content container"
              >
                <article
                  class="card p-3"
                  :class="
                    report.status == 'accept'
                      ? 'has-background-success-light'
                      : 'has-background-danger-light'
                  "
                >
                  <div class="media-content">
                    <div class="content">
                      <div class="columns">
                        <div class="column is-2">
                          <i class="fa fa-user" aria-hidden="true"></i>
                          {{ report.name }}
                          <br />
                          <i class="fa fa-phone-square" aria-hidden="true"></i>
                          {{ report.phone }}
                        </div>
                        <div class="column">
                          <p>
                            {{ report.content }}
                          </p>
                        </div>
                        <div
                          class="column is-1"
                          v-if="report.status == 'submit'"
                        >
                          <div
                            class="button"
                            @click="acceptReport(report.report_id)"
                          >
                            รับเรื่อง
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
            <!-- edit rooms -->
            <div id="edit" class="content-tab content" style="display: ">
              <h3 class="has-text-centered has-text-danger m-6">{{ error }}</h3>
              <div class="columns is-multiline">
                <div class="column is-4" v-for="room in allRooms" :key="room">
                  <div class="card-image">
                    <figure class="image is-1024x1024">
                      <img
                        :src="'http://localhost:3000/' + room.file_path"
                        alt="Placeholder image"
                      />
                    </figure>
                  </div>
                  <div class="card-content">
                    <div class="content">
                      <i class="fa fa-credit-card-alt" aria-hidden="true"></i>
                      {{ room.room_id }}
                      <br />
                      <i class="fa fa-hashtag" aria-hidden="true"></i>
                      {{ room.room_type }}
                      <br />
                      <i class="fa fa-info" aria-hidden="true"></i>
                      {{ room.description.substring(0, 150) + "..." }}
                      <br />
                      <i class="fa fa-money" aria-hidden="true"></i>
                      {{ room.price }}
                      <br />
                      <strong>จำนวนผู้เข้าพักต่อห้อง</strong>
                      {{ room.people }}
                      <br />
                      <strong>จำนวนห้องที่เปิดให้บริการ</strong>
                      {{ room.count }}
                    </div>
                    <div class="columns">
                      <div
                        class="column is-2 has-text-centered"
                        v-if="room.breakfast == 'yes'"
                      >
                        <i
                          class="fa fa-coffee"
                          style="font-size: 40px; color: #888"
                        ></i>
                      </div>

                      <div
                        class="column is-4 has-text-centered"
                        v-if="room.air_conditioner == 'yes'"
                      >
                        <i
                          class="fa fa-snowflake-o"
                          style="font-size: 40px; color: #888"
                        ></i>
                      </div>
                      <div
                        class="column is-2 has-text-centered"
                        v-if="room.wifi == 'yes'"
                      >
                        <i
                          class="fa fa-wifi"
                          style="font-size: 40px; color: #888"
                        ></i>
                      </div>
                      <div
                        class="column is-3 has-text-centered"
                        v-if="room.pool == 'yes'"
                      >
                        <i
                          class="fas fa-swimming-pool"
                          style="font-size: 40px; color: #888"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <footer class="card-footer">
                    <a
                      @click="deleteRoom(room.room_id)"
                      class="card-footer-item"
                      >ลบห้องพัก</a
                    >
                    <a
                      :href="`/#/editroom/${room.room_id}`"
                      class="card-footer-item"
                      >แก้ไขห้อง</a
                    >
                  </footer>
                </div>
              </div>
            </div>
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
      allRooms: null,
      allReports: "",
      customers: [],
      search: "",
      dummyData: [],
      tags: [],
      tagInput: "",
      result: "",
      error: "",
    };
  },
  created() {
    axios
      .get("http://localhost:3000/admin")
      .then((response) => {
        this.customers = response.data.customers;
        this.dummyData = response.data.customers;
        this.allRooms = response.data.allRooms;
        console.log(this.customers);
      })
      .catch((err) => {
        console.log(err);
      });
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
  watch: {
    search(newVal) {
      this.customers = this.dummyData.filter((value) => {
        let fullname = value.first_name + " " + value.last_name;
        return (
          value.first_name.includes(newVal) ||
          value.last_name.includes(newVal) ||
          fullname.includes(newVal) ||
          value.email.includes(newVal)
        );
      });
    },
  },

  methods: {
    deleteRoom(room_id) {
      axios
        .delete(`http://localhost:3000/deleteRoom/${room_id}`)
        .then((res) => {
          // this.allRooms = res.data.allRooms;
          console.log(res);
          location.reload();
        })
        .catch((error) => {
          this.error = error.response.data;
          console.log(error.response.data);
        });
    },
    searchQuery() {
      axios
        .get(`http://localhost:3000/searchQuery`, {
          params: {
            search: this.tags,
          },
        })
        .then((res) => {
          console.log(res);
          this.result = res.data.result;
        })
        .catch((error) => {
          this.error = error.response.data;
          console.log(error.response.data);
        });
    },
    addTag(event) {
      if (event.code == "Enter") {
        console.log(event.code);
        this.tagInput = "";
        var val = event.target.value;
        this.tags.push(val);
        console.log(this.tags);
      }
    },
    deleteTag(index) {
      console.log(index);
      this.tags = Array.from(this.tags);
      this.tags.splice(index, 1);
    },
    // async getRooms() {
    //   try {
    //     const response = await axios.get("http://localhost:3000/admin");
    //     this.allRoom = response.data;
    //     console.log(this.allRoom);
    //     console.log("asdfklasdfjlkasdf");
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    searchCustomer() {
      axios
        .get(`http://localhost:3000/search`, {
          params: {
            search: this.search,
          },
        })
        .then((res) => {
          console.log(res);
          this.customers = res.data.result;
        })
        .catch((error) => {
          this.error = error.response.data;
          console.log(error.response.data);
        });
    },
    mailTo(target) {
      var mailtoLink = "mailto:" + target;
      window.location.href = mailtoLink;
    },
    acceptReport(reportId) {
      console.log(reportId);
      axios
        .put(`http://localhost:3000/report/${reportId}`)
        .then((res) => {
          console.log(res);
          this.reports = res.data.reports;
          this.allReports = res.data.allReports;
          console.log(this.reports);
        })
        .catch((error) => {
          this.error = error.response.data;
          console.log(error.response.data);
        });
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
