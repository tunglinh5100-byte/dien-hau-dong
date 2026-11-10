// Sự tích hiển thị trong bảng bên trái màn hình live, chữ tự cuộn lên như máy nhắc chữ, hết lại quay về đầu.
// Anh sửa nội dung ngay trên GitHub: mỗi câu đặt trong dấu nháy đơn, cuối câu có dấu phẩy.
// Đang ngự giá nào thì bảng chỉ hiện sự tích của giá đó. Mục "chung" chỉ dùng khi giá chưa có nội dung riêng.
window.BANG_TIN = {
  chung: [
    'Tín ngưỡng thờ Mẫu Tam phủ của người Việt được UNESCO ghi danh là Di sản văn hóa phi vật thể đại diện của nhân loại năm 2016',
    'Tứ phủ gồm Thiên phủ (miền trời), Địa phủ (miền đất), Thoải phủ (miền sông nước) và Nhạc phủ (miền núi rừng)',
    'Hầu đồng là nghi lễ chính của Đạo Mẫu: thanh đồng lần lượt hóa thân các giá Thánh, có cung văn hát chầu văn đi cùng',
    'Hát chầu văn là lối hát thờ, vừa thỉnh mời các vị Thánh giáng, vừa ca ngợi công đức các vị',
    'Các hàng Thánh trong Tứ phủ: Thánh Mẫu, Quan Lớn, Chầu Bà, Ông Hoàng, Thánh Cô, Thánh Cậu',
    'Mẫu Liễu Hạnh là một trong Tứ bất tử của tín ngưỡng dân gian Việt Nam',
    'Lộc Thánh ban là món quà tượng trưng cho may mắn, bình an, con nhang thường mang về chia cho gia đình',
  ],
  ongbay: [
    'Ông Hoàng Bảy là danh tướng thời cuối nhà Lê, được thờ chính tại đền Bảo Hà (xã Bảo Hà, huyện Bảo Yên, tỉnh Lào Cai), dân gian gọi là Ông Bảy Bảo Hà',
    'Thời ấy giặc thường xuyên cướp phá các châu thuộc phủ Quy Hóa. Triều đình cử Ông dẫn quân ngược sông Hồng đánh đuổi giặc',
    'Ông lập căn cứ lớn ở Bảo Hà, rèn luyện binh sĩ người các dân tộc địa phương, chỉ huy quân thủy bộ dẹp giặc, giữ yên vùng đất nay là Yên Bái và Lào Cai',
    'Trong một trận đánh không cân sức, Ông anh dũng hy sinh. Nhân dân trong vùng an táng Ông và lập đền thờ tại Bảo Hà',
    'Các vua triều Nguyễn là Minh Mạng và Thiệu Trị đều có sắc phong cho Ông. Đền được phong là đền thờ Thần vệ quốc',
    'Ngày giỗ Ông là 17 tháng 7 âm lịch. Lễ hội đền Bảo Hà được công nhận là Di sản văn hóa phi vật thể quốc gia năm 2016',
    'Khi giáng đồng, Ông Bảy mặc áo lam, múa hèo oai phong, rồi ngồi nghe văn, hút thuốc, thưởng thức và ban lộc cho con nhang',
    'Ông nổi tiếng hào sảng, nên nhiều người về đền Bảo Hà cầu tài lộc, buôn bán hanh thông',
  ],
  codoi: [
    'Cô Đôi Thượng Ngàn thuộc hàng Thánh Cô trong Tứ phủ, là vị Thánh Cô miền núi rừng (Nhạc phủ), theo hầu cận Mẫu Thượng Ngàn',
    'Khi giáng đồng, Cô Đôi mặc áo xanh lá thêu kim tuyến, khăn vấn xanh cài hoa, đeo kiềng và vòng tay',
    'Cô múa mồi, múa quạt, múa tay không, đi xuyến hướng lên ban Công Đồng, rồi quay xuống tung lộc cho con nhang',
    'Lộc Cô ban gồm tiền, quả, hoa, là lộc tượng trưng cho may mắn, bình an, con nhang thường mang về chia cho gia đình',
  ],
  cobo: [
    'Cô Bơ Thoải Cung thuộc hàng Thánh Cô miền sông nước (Thoải phủ), khi giáng đồng mặc áo trắng',
  ],
};
