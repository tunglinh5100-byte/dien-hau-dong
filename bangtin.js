// Sự tích hiển thị trong bảng bên trái màn hình live, chữ tự cuộn lên như máy nhắc chữ, hết lại quay về đầu.
// Đang ngự giá nào thì bảng chỉ hiện sự tích của giá đó. Giá chưa có nội dung riêng thì hiện mục "chung".
// Toàn bộ nội dung lấy từ Báo Nhân Dân (nhandan.vn); dòng "Nguồn" tự hiện ở cuối bảng.
// Anh sửa ngay trên GitHub: mỗi câu đặt trong dấu nháy đơn, cuối câu có dấu phẩy.
window.BANG_TIN = {
  nguon: 'Báo Nhân Dân (nhandan.vn)',
  // Bài: "Thực hành nghi lễ tín ngưỡng thờ Mẫu Tam phủ của người Việt" - nhandan.vn/trinh-dien-thuc-hanh-nghi-le-tin-nguong-tho-mau-tam-phu-cua-nguoi-viet-post864851.html
  chung: [
    'Thực hành tín ngưỡng thờ Mẫu Tam phủ của người Việt đã được UNESCO ghi danh là Di sản văn hóa phi vật thể đại diện của nhân loại',
    'Tín ngưỡng thờ Mẫu Tam Tứ Phủ là sự kết hợp giữa tín ngưỡng bản địa của người Việt với một số yếu tố của Đạo giáo và Phật giáo',
    'Các Thánh Mẫu và các vị thần trong điện thờ có nguồn gốc không chỉ từ người Kinh mà còn từ các dân tộc Mường, Tày, Nùng, Dao',
    'Nghi lễ lên đồng hội tụ nhiều yếu tố văn hóa dân gian: trang phục, âm nhạc, múa và hát chầu văn',
  ],
  // Bài: "Lễ hội đền Bảo Hà tưởng nhớ Tướng quân Hoàng Bảy" - nhandan.vn/le-hoi-den-bao-ha-tuong-nho-tuong-quan-hoang-bay-post710405.html
  // và "Lễ hội đền Bảo Hà tưởng nhớ Thần vệ quốc Hoàng Bảy" - nhandan.vn/le-hoi-den-bao-ha-tuong-nho-than-ve-quoc-hoang-bay-post906649.html
  ongbay: [
    'Ông Hoàng Bảy là danh tướng Nguyễn Hoàng Bảy, người có công đánh giặc, bảo vệ vùng đất phía Bắc',
    'Cuối triều Lê (1740-1786), giặc thường xuyên cướp phá các châu thuộc phủ Quy Hóa. Triều đình cử Ông dẫn quân theo sông Hồng đánh đuổi giặc',
    'Ông giải phóng Khau Bàn, xây dựng Bảo Hà thành căn cứ lớn, huấn luyện binh sĩ từ các thổ ti, tù trưởng',
    'Ông chỉ huy quân thủy bộ đánh giặc ở Lào Cai, giải phóng các châu thuộc phủ Quy Hóa, nay là Yên Bái và Lào Cai',
    'Ông hy sinh anh dũng trong một trận đánh không cân sức. Nhân dân trong vùng an táng Ông và lập đền thờ tại Bảo Hà',
    'Các vua Minh Mạng, Thiệu Trị tặng Ông danh hiệu "Trấn an hiển liệt". Đền được sắc phong "Thần vệ quốc"',
    'Ngày giỗ chính của Ông là 17 tháng 7 âm lịch. Lễ hội đền Bảo Hà được công nhận là Di sản văn hóa phi vật thể cấp quốc gia năm 2016',
    'Đền Bảo Hà ở xã Bảo Hà, tỉnh Lào Cai, là Di tích lịch sử - văn hóa cấp quốc gia',
  ],
  // Cô Đôi: theo bài "Lan tỏa văn hóa tín ngưỡng thờ Mẫu qua du lịch Việt Nam" - nhandan.vn/lan-toa-ve-dep-van-hoa-tin-nguong-tho-mau-qua-du-lich-post907068.html
  // và "Tân Nhàn mang nghệ thuật truyền thống đến gần khán giả" - nhandan.vn/tan-nhan-mang-nghe-thuat-truyen-thong-den-gan-khan-gia-post344169.html
  // Chầu Bé Bắc Lệ (chỉ hiện ở link thử /tn). Nguồn: Sở Văn hoá, Thể thao và Du lịch Lạng Sơn, tài liệu "Thuyết minh các tuyến, điểm du lịch Công viên địa chất Lạng Sơn"; báo Dân Việt (danviet.vn)
  nguon_chaube: 'Sở VHTTDL Lạng Sơn; báo Dân Việt (danviet.vn)',
  chaube: [
    'Chầu Bé Bắc Lệ là vị Thánh Chầu nổi tiếng, được thờ cùng Mẫu Thượng Ngàn tại quần thể đền Bắc Lệ, xã Tân Thành, huyện Hữu Lũng, tỉnh Lạng Sơn',
    'Đền Bắc Lệ là quần thể hàng chục ngôi đền thờ Mẫu, là điểm khởi đầu của Công viên địa chất Lạng Sơn',
    'Theo tích truyền, Mẫu Bắc Lệ và Chầu Bé Bắc Lệ có công hiển linh phù trợ các triều đại đánh giặc giữ nước',
    'Trong tâm thức người dân xứ Lạng, đền Bắc Lệ thờ Mẫu Thượng Ngàn, vị Mẫu sáng tạo và cai quản mọi vùng rừng núi',
    'Lễ hội đền Bắc Lệ diễn ra vào trung tuần tháng Chín âm lịch hằng năm',
  ],
  codoi: [
    'Cô Đôi Thượng Ngàn là một giá hầu trong nghi lễ hầu đồng của tín ngưỡng thờ Mẫu',
    'Giá văn Cô Đôi Thượng Ngàn có lời cổ, thuộc những giá hầu văn nổi tiếng',
    'Các vị Thánh thuộc hệ thống Tứ phủ, trong đó Mẫu Liễu Hạnh ở vị trí trung tâm. Nghi lễ hầu đồng có các giá hầu nam thần và nữ thần',
    'Âm nhạc chầu văn là phần cốt lõi của nghi lễ hầu đồng',
    'Thực hành tín ngưỡng thờ Mẫu Tam phủ của người Việt đã được UNESCO ghi danh là Di sản văn hóa phi vật thể đại diện của nhân loại',
    'Tín ngưỡng thờ Mẫu Tam Tứ Phủ là sự kết hợp giữa tín ngưỡng bản địa của người Việt với một số yếu tố của Đạo giáo và Phật giáo',
  ],
  // Cô Bơ: chưa tìm được bài Nhân Dân nên để trống, bảng sẽ hiện mục "chung"
  cobo: [],
  // Ông Hoàng Mười (link thử /om-thu). Bài: "Đông đảo người dân cầu an tại hai ngôi đền thờ ông Hoàng Mười" - baovanhoa.vn
  nguon_ongmuoi: 'Báo Văn Hóa (baovanhoa.vn)',
  ongmuoi: [
    'Theo tín ngưỡng Tứ Phủ, Ông Hoàng Mười được tôn là con thứ mười của Vua Cha Bát Hải Động Đình',
    'Truyền thuyết kể Ông từng xuống trần gian, giúp dân khai hoang, chống lũ, phát triển nông nghiệp và nghề dệt',
    'Ông được thờ ở Đền Củi (Đền Chợ Củi), xã Xuân Hồng, huyện Nghi Xuân, Hà Tĩnh, di tích quốc gia từ năm 1993, và Đền Ông Hoàng Mười ở huyện Hưng Nguyên, Nghệ An, hai bên bờ sông Lam',
  ],
  // Chầu Lục Cung Nương — 17/11. Nguồn: oancotam.com "Truyền thuyết về Chầu Lục Cung Nương", muahoabachhop.com "Sự tích Chầu Lục Cung Nương"
  nguon_chaulu: 'oancotam.com, "Truyền thuyết về Chầu Lục Cung Nương"',
  chaulu: [
    'Tương truyền Chầu Lục Cung Nương là tiên nữ trên thiên đình, lỡ tay làm rơi chén ngọc nên bị đày xuống trần, giáng sinh vào nhà tù trưởng người Nùng ở xứ Lạng',
    'Mãn hạn, Chầu được hiển thánh, trông coi núi rừng vùng Chín Tư (Hữu Lũng, Lạng Sơn), thương dân, giúp dân trồng trọt và ban lộc buôn bán',
    'Đền chính của Chầu là Lục Cung Linh Từ (đền Chín Tư), xã Hòa Lạc, huyện Hữu Lũng, Lạng Sơn; tiệc chính là ngày 10 tháng 5 âm lịch'
  ],
  // Cô Chín Sòng Sơn (Cô Chín Giếng) — tích của Cô, không phải tích đền Sòng. 17/11 anh Linh sửa. Nguồn: Vietnam Airlines - cẩm nang du lịch "Đền Cô Chín Thanh Hóa"
  nguon_cochin: 'Vietnam Airlines, cẩm nang du lịch "Đền Cô Chín Thanh Hóa"',
  cochin: [
    'Tương truyền Cô Chín là Cửu Thiên Huyền Nữ, con gái thứ chín của Ngọc Hoàng, giáng trần làm cô gái bán nước bên cổng làng Ba Dội',
    'Cô nổi tiếng giỏi xem bói, chữa bệnh, cứu giúp dân lành; dân làng thấy linh ứng nên lập đền thờ Cô ở Chín Giếng (Bỉm Sơn, Thanh Hóa)',
    'Hằng năm có lễ rước Thánh Mẫu từ đền Sòng Sơn sang đền Cô Chín Giếng, tái hiện tích "chị đến thăm em"; tiệc chính của Cô là mùng 9 tháng 9 âm lịch',
  ],
};
