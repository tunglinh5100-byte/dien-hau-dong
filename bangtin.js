// Sự tích hiển thị trong bảng bên trái màn hình live, chữ tự cuộn lên như máy nhắc chữ, hết lại quay về đầu.
// Đang ngự giá nào thì bảng chỉ hiện sự tích của giá đó. Giá chưa có nội dung riêng thì hiện mục "chung".
// Toàn bộ nội dung lấy từ Báo Nhân Dân (nhandan.vn); dòng "Nguồn" tự hiện ở cuối bảng.
// Anh sửa ngay trên GitHub: mỗi câu đặt trong dấu nháy đơn, cuối câu có dấu phẩy.
window.BANG_TIN = {
  nguon: 'Báo Nhân Dân (nhandan.vn)',
  // Bài: "Thực hành nghi lễ tín ngưỡng thờ Mẫu Tam phủ của người Việt" - nhandan.vn/trinh-dien-thuc-hanh-nghi-le-tin-nguong-tho-mau-tam-phu-cua-nguoi-viet-post864851.html
  chung: [
    'Thực hành tín ngưỡng thờ Mẫu Tam phủ của người Việt đã được UNESCO ghi danh là Di sản văn hóa phi vật thể đại diện của nhân loại',
    'Tín ngưỡng thờ Mẫu Tam phủ là sự kết hợp giữa tín ngưỡng bản địa của người Việt với một số yếu tố của Đạo giáo và Phật giáo',
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
    'Tín ngưỡng thờ Mẫu Tam phủ là sự kết hợp giữa tín ngưỡng bản địa của người Việt với một số yếu tố của Đạo giáo và Phật giáo',
  ],
  // Cô Bơ: chưa tìm được bài Nhân Dân nên để trống, bảng sẽ hiện mục "chung"
  cobo: [],
};
