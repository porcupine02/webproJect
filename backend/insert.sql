insert into images(room_id, img_id, file_path, main)
values (1, 1, '\imagehotel\standard.jpg', 1),
    (1, 2, '\imagehotel\standard1.jpg', null),
    (1, 3, '\imagehotel\standard2.jpg', null),
    (1, 4, '\imagehotel\standard3.jpg', null),
    (2, 5, '\imagehotel\superior.jpg', 1),
    (2, 6, '\imagehotel\superior1.jpg', null),
    (2, 7, '\imagehotel\superior2.jpg', null),
    (2, 8, '\imagehotel\superior3.jpg', null),
    (3, 9, '\imagehotel\deluxe.jpg', 1),
    (3, 10, '\imagehotel\deluxe1.jpg', null),
    (3, 11, '\imagehotel\deluxe2.jpg', null),
    (3, 12, '\imagehotel\deluxe3.jpg', null),
    (4, 13, '\imagehotel\suite1.jpg', 1),
    (4, 14, '\imagehotel\suite2.jpg', null),
    (4, 15, '\imagehotel\suite3.jpg', null),
    (4, 16, '\imagehotel\suite4.jpg', null);
insert into services(
        service_id,
        breakfast,
        wifi,
        air_conditioner,
        pool
    )
values(1, 'yes', 'yes', 'no', 'no'),
    (2, 'yes', 'yes', 'yes', 'no'),
    (3, 'yes', 'yes', 'yes', 'no'),
    (4, 'yes', 'yes', 'yes', 'yes');
insert into roomdetail(
        room_type,
        price,
        description,
        service_id,
        room_img_id,
        people,
        count
    )
values(
        "Standard Room",
        500,
        "ห้องพักเริ่มต้นเหมาะกับทุกเพศทุกวัย เตียงนอน 5 ฟุต จำนวน 2 เตียง เหมาะกับการมาพักผ่อนเป็นคู่ไม่ว่าจะเพื่อน หรือแแฟน ก็พร้อมฝห้คุฯได้ผ่อนคลายไปกับบรรยากาศดีๆ",
        1,
        1,
        2,
        10
    ),
    (
        "Superior Room",
        700,
        "สิ่งอำนวยความสะดวกพื้นครบจบที่ห้องนี้ วิวดีรับแสงแดดยามเช้ากับมุมจิบกาแฟชมพระอาทิตย์ขึ้นที่ริมระเบียงห้องส่วนตัว สัมผัสบรรยากาศสุดผ่อนคลายให้ทริปพักผ่อนของคุณเต็มอิ่มยิ่งกว่าใคร",
        2,
        2,
        2,
        10
    ),
    (
        "Deluxe Room",
        1200,
        "ห้องพักเรียบหรูกว้างสุดลูกหูลูกตา สิ่งอำนวยความสะดวกยิ่งกว่าครบ พร้อมใช้ประหนึ่งคอนโด วิวสวยจับใจชมพระอาทิตย์ตกดินรับกลิ่นอายความสดชื้นของธรรมชาติแบบเต็มอิ่ม เตียงนอนขนาดคิงไซส์ หนุ่มเด้งนอนสบาย ให้ได้พักร่างกายอย่างเต็มที่กับห้องดีๆของเรา",
        3,
        3,
        2,
        10
    ),
    (
        "Suite Room",
        1500,
        "ห้องพักแบบแยกส่วน มีห้องครัว ห้องนั่งเล่น พร้อมห้องนอน เหมาะกับการเที่ยวเล่นกับครอบครัว ห้องสวยชมวิวได้ 360 องศา ไม่ว่าพระอาทิตย์จะขึ้นหรือตกก็จบครบที่ห้องนี้ หากกำลังมองหาที่พักผ่อนในวันหยุดกับครอบ อย่ามัวที่จะคิด จองเลย!",
        4,
        4,
        4,
        5
    );