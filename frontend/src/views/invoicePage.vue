<template>
  <div class="columns" style="margin-top: 100px" id="invoice">
    <div class="column"></div>
    <div class="column is-three box">
      <table class="table is-bordered" style="width: 100%">
        <tr>
          <th colspan="4" class="has-text-centered">ใบชำระเงิน</th>
        </tr>
        <tr>
          <td colspan="2">เลขบัญชี : 1234567890</td>
          <td colspan="2">ธนาคาร : กรุงไทย</td>
        </tr>
        <tr>
          <td colspan="4">ชื่อบัญชี : folk</td>
        </tr>

        <tr>
          <th colspan="4" class="has-text-centered">รายละเอียดการจอง</th>
        </tr>
        <!-- <tr>
          <td colspan="4">
            ชื่อ :
            {{ information[num - 1].fname + " " + information[num - 1].lname }}
          </td>
        </tr>
        <tr>
          <td colspan="2">Check in : {{ information[num - 1].checkIn }}</td>
          <td colspan="2">Check out : {{ information[num - 1].checkOut }}</td>
        </tr>
        <tr>
          <td colspan="2">จำนวนคน : {{ information[num - 1].people }}</td>
          <td colspan="2">จำนวนห้อง : {{ information[num - 1].countRoom }}</td>
        </tr>
        <tr>
          <td colspan="2">ประเภทห้อง : {{ information[num - 1].type }}</td>
          <td colspan="2">ราคา : {{ information[num - 1].price }}</td>
        </tr>
        <tr>
          <td colspan="3">รวม : {{ total }}</td>
        </tr> -->
        <tr>
          <th colspan="4" class="has-text-centered">หลักฐานการจ่ายตัง</th>
        </tr>
        <tr>
          <td colspan="4">
            สลิป :
            <input type="file" />
          </td>
        </tr>
      </table>
      <div class="columns">
        <div class="column"></div>
        <div class="column"></div>
        <div class="column is-three">
          <a class="button is-primary" @click="confirm()">ยืนยัน</a>
        </div>
        <div class="column">
          <a href="booking.html" class="button is-danger">ยกเลิก</a>
        </div>

        <div class="column"></div>
        <div class="column"></div>
      </div>
    </div>
    <div class="column"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      information: "",
      total: 0,
      file: "",
      // history: '',
      num: JSON.parse(localStorage.getItem("book")).length,
    };
  },
  methods: {
    confirm() {
      // const receipt = JSON.stringify(this.history)
      // this.history.push(receipt)
      // localStorage.setItem("history", this.history);
      window.location.href = "profile.html";
    },
  },
  created() {
    if (localStorage.getItem("book") != null) {
      // this.history = JSON.parse(localStorage.getItem('book'))
      this.information = JSON.parse(localStorage.getItem("book"));
      console.log(this.information);
      this.total =
        this.information[this.num - 1].price *
        this.information[this.num - 1].countRoom;
    }
  },
}
</script>

<style>

</style>