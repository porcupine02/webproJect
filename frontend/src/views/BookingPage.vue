<template>
  <div class="container" id="Booking">
    <div class="tile is-ancestor">
      <div class="tile is-parent is-8">
        <div class="tile is-child box">
          <div class="columns">
            <div class="column is-6">
              <img
                src="https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768"
                alt=""
              />
            </div>
            <div class="column is-6">
              <h1>ชื่อห้องพัก</h1>
              <h1>ประเภทห้อง</h1>
            </div>
          </div>
        </div>
      </div>

      <div class="tile is-4 is-vertical is-parent">
        <div class="tile is-child box">
          <p class="title">รายละเอียดราคา</p>
          <div class="columns">
            <div class="column is-6">
              <p>1 ห้อง x 2 คืน</p>
            </div>
            <div class="column is-6">
              <p>8000 Baht</p>
            </div>
          </div>
          <div class="columns ">
             <div class="column is-6">จำนวนห้อง {{ countRoom }} ห้อง</div>
             <div class="column is-6">16000 Baht </div>
          </div>
          <hr>

          <div class="columns ">
             <div class="column is-6">ที่ต้องชำระ</div>
             <div class="column is-6">16000 Bath</div>
          </div>
          <div class="columns mt-4">
             <div class="column is-12">
               <a href="" class="button is-danger">ยืนยัน</a>
             </div>
        
          </div>
        </div>
       
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-8">
        <div class="tile is-child box">
          <div class="columns">
            <div class="column is-4">
              <label for="">เช็คอิน</label>
              
              <input type="date" class="input mt-4" v-model="startDate" disabled  />
              <!-- {{ initialDate }} -->
            </div>
            <div class="column is-4">
              <label for="">เช็คเอ้าท์</label>
            
                <input type="date" class="input mt-4" v-model="endDate" disabled/>
         
            </div>
            <div class="column is-4">
              <label for="">จำนวนห้อง </label>
               <br>
              <div class="select is-rounded mt-4" >
                <select   v-model="countRoom" >
                  <option selected value="1">1 ห้อง</option>
                  <option value="2">2 ห้อง</option>
                  <option value="3">3 ห้อง</option>
                  <option value="4">4 ห้อง</option>
                  <option value="5">5 ห้อง</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-8">
        <div class="tile is-child box">
          <div class="columns">
            <div class="column is-4">
                <h1>ข้อมูลผู้เข้าพัก
                </h1>
            </div>
            <div class="column is-4"></div>
            <div class="column is-4"></div>          
          </div>

          <div class="columns">
            <div class="column is-6">
               <input type="text" class="input" placeholder="ชื่อ">
            </div>
            <div class="column is-6">
               <input type="text" class="input" placeholder="นามสกุล">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-8">
        <div class="tile is-child box">
          <div class="columns">
            <div class="column is-4">
                <h1>โปรโมชั่น
                </h1>
            </div>
            <div class="column is-4"></div>
            <div class="column is-4"></div>          
          </div>

          <div class="columns">
            <div class="column is-2">
               <label for="">วันเดือนปีเกิด</label>
            </div>
            <div class="column is-4">
               <input type="date" class="input">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countRoom : 1,
      startDate : '',
      endDate : '',
    };
  },
  methods: {},
};
</script>

<style></style>
