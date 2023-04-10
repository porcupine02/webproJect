<template>


            <div class="container mt-6 pt-5" id="admin">

                ยังเป็น code ejs


                <div class="container mt-6 pt-5">
                    <p class="title has-text-centered">UPDATE .....</p>
                    <div class="columns">
                        <div class="column is-1">
                            <!-- left -->
                        </div>
                        <div class="column">
                            <form method="POST" action="/admin/updateroom/:id" enctype="multipart/form-data">
                                    ชื่อห้อง
                                    <input class="input" type="text" name="room_type" value="<%= room[0].room_type %>"
                                        required>
                                    <p>รายละเอียด
                                        <textarea name="description" class="input textarea" rows="5"
                                            required></textarea>
                                    </p>
                                    <p>บริการจากทางโรงแรม
                                        <br>
                                    <ul class="checkbox" name="services">
                                        <li><input type="checkbox" name="breakfast" value="yes">breakfast</li>
                                        <li><input type="checkbox" name="pool" value="yes">pool</li>
                                        <li><input type="checkbox" name="wifi" value="yes">wifi</li>
                                        <li><input type="checkbox" name="air_conditioner"
                                                value="air_conditioner">air_conditioner</li>
                                    </ul>
                                    </p>
                                    ภาพห้อง
                                    <div class="columns mt-3">
                                        <div class="cloumn">
                                            <img src="<%= img[0].pic1 %>" alt="picture 1">
                                            <input type="file" name="pic1" >
                                        </div>
                                        <div class="cloumn">
                                            <img src="<%= img[0].pic2 %>" alt="picture 1">
                                            <input type="file" name="pic2">
                                        </div>
                                        <div class="cloumn">
                                            <img src="<%= img[0].pic3 %>" alt="picture 1">
                                            <input type="file" name="pic3">
                                        </div>
                                        <div class="cloumn">
                                            <img src="<%= img[0].pic4 %>" alt="picture 1">
                                            <input type="file" name="pic4">
                                        </div>
                                    </div>
                                    <div class="columns mt-3">
                                        <div class="cloumn">
                                            จำนวนห้องที่เปิดให้บริการ
                                            <input class="input" type="number"  value="<%=  %>" required>
                                        </div>

                                        <div class="cloumn">
                                            ราคา
                                            <input type="number" class="input" name="price"  value="<%= room[0].price %>" required>
                                        </div>

                                    </div>
                                    <input class="button" type="submit" value="Submit">
                            </form>
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
  date() {
    return;
    {
    }
  },
  methods: {
    confirm() {
      console.log("test");
    },
  },
  created() {
    this.history = JSON.parse(localStorage.getItem("book"));
    console.log(this.history);
  },
};
</script>