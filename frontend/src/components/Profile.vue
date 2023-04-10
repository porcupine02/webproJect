<template>
  <div class="container mt-6 pt-5" id="profile">
    <div class="container mt-6 pt-5">
      <p class="title has-text-centered">MY PROFILE</p>
      <div class="columns" v-for="p in profiles" :key="p">
        <div class="column is-2">
          <!-- left -->
        </div>
        <div class="column is-3">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="profile image"
          />
          <p class="has-text-centered title is-4 mt-2">{{ p.user_name }}</p>
        </div>
        <div class="column">
          <p class="title is-6 mt-2">
            Name : {{ p.first_name + " " + p.last_name }}
          </p>
          <p class="subtitle is-6" style="line-height: 1.7">
            Email : {{ p.email }} <br />
            Phone : {{ p.phone }} <br />
            Date of Birth : {{ p.birth_date }}
          </p>
        </div>
        <div class="column is-2">
          <!-- right -->
        </div>
      </div>

      <div class="columns">
        <div class="column is-1">
          <!-- left -->
        </div>
        <div class="column">
          <table class="table has-text-centered" width="100%">
            <tr class="title is-5 has-background-danger-light">
              <td>invoice id</td>
              <td>type room</td>
              <td>check in</td>
              <td>check out</td>
              <td>price</td>
              <td>status</td>
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
                <td>{{ item.price * item.countRoom }} ฿</td>
                <td
                  :class="
                    item.status == 'wait'
                      ? 'has-background-success'
                      : 'has-background-danger'
                  "
                >
                  {{ item.status }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="column is-1">
          <!-- right -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      history: "",
      profiles: profiles,
      booking: [],
    };
  },
  created() {
    this.history = JSON.parse(localStorage.getItem("book"));
    // const arr = Array.from(localStorage.getItem('book'))
    // this.history.push(this.books)
    // console.log(this.history.length)
    // const history_string = JSON.stringify(this.history);
    // localStorage.setItem("history_string", history_string)
    // this.history.push(this.booking)
    // console.log(this.booking)
    // console.log(typeof(history_string))
    console.log(typeof this.history);
  },
};
</script>