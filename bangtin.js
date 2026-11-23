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
    'Nơi thờ chính của Cô Đôi Thượng Ngàn có nhiều tích, chưa xác định chính xác; Cô được phối thờ ở các đền, phủ thờ Mẫu Thượng Ngàn',
    'Thực hành tín ngưỡng thờ Mẫu Tam phủ của người Việt đã được UNESCO ghi danh là Di sản văn hóa phi vật thể đại diện của nhân loại',
    'Tín ngưỡng thờ Mẫu Tam Tứ Phủ là sự kết hợp giữa tín ngưỡng bản địa của người Việt với một số yếu tố của Đạo giáo và Phật giáo',
  ],
// Cô Bơ Thoải Cung (Cô Bơ Bông) — 17/11. Nguồn: VinWonders "Đền Cô Bơ Thanh Hóa"
  nguon_cobo: 'VinWonders, "Đền Cô Bơ Thanh Hóa"',
  cobo: [
    'Tương truyền Cô Bơ là con gái Vua Thủy Tề, vâng lệnh cha xuống trần giúp đời, mãn hạn được xe loan rước về Thủy Cung',
    'Dân gian tin Cô hay hiển linh ở ngã ba sông, phù hộ thuyền bè qua lại thuận buồm xuôi gió, nên giá Cô có điệu chèo thuyền',
    'Cô còn được gọi là Cô Bơ Bông, Cô Bơ Thác Hàn; đền Cô ở bên sông Lèn, nơi sông Mã tách dòng, xã Tống Sơn, Thanh Hóa'
  ],
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
  // 19/11 19:10 anh Linh: sự tích các giá mới trên /g
  nguon_tamtoa: 'Báo Nhân Dân (nhandan.vn); Vietcetera; Báo Lào Cai, "Linh thiêng đền Mẫu Đông Cuông"',
  tamtoa: [
    'Tam Tòa Thánh Mẫu là ba vị Thánh Mẫu đứng đầu điện thờ: Mẫu Thượng Thiên cai quản miền trời, Mẫu Thượng Ngàn cai quản núi rừng, Mẫu Thoải cai quản sông nước',
    'Thánh Mẫu được tôn thờ như người mẹ che chở, ban phúc lộc, sức khỏe và bình an cho con nhang đệ tử',
    'Thực hành tín ngưỡng thờ Mẫu Tam phủ của người Việt đã được UNESCO ghi danh là Di sản văn hóa phi vật thể đại diện của nhân loại',
    'Nơi thờ: Phủ Dày (Vụ Bản, Nam Định cũ) là trung tâm thờ Mẫu lớn nhất; Mẫu Thượng Ngàn được thờ chính ở đền Bắc Lệ (Lạng Sơn), đền Đông Cuông (Yên Bái cũ)',
    'Riêng nơi thờ chính của Mẫu Thoải có nhiều tích, chưa xác định chính xác; Mẫu được phối thờ ở các đền, phủ thờ Mẫu khắp nơi',
  ],
  nguon_chuanh: 'tinnguongthomauvietnam.com, "Chúa Đệ Nhị Nguyệt Hồ"',
  chuanh: [
    'Chúa Đệ Nhị Nguyệt Hồ là vị thứ hai trong Tam vị Chúa Mường, còn gọi là Chúa Bói Nguyệt Hồ hay Nguyệt Nga Công chúa',
    'Tương truyền năm 14 tuổi bà được Quỷ Cốc Tiên Sinh nhận làm con nuôi, truyền dạy chiêm tinh, bói toán; danh tiếng bà đến tai nhà vua',
    'Đền Nguyệt Hồ (Từ Linh Nguyệt Hồ) ở xã Hương Vĩ, huyện Yên Thế, Bắc Giang; khánh tiệc hằng năm ngày 15 tháng Hai âm lịch',
  ],
  nguon_cosau: 'chonthieng.com, "Cô Sáu Sơn Trang"',
  cosau: [
    'Cô Sáu Sơn Trang, còn gọi là Cô Sáu Lục Cung, là vị Thánh Cô thứ sáu trong hàng Tứ phủ Thánh Cô',
    'Tương truyền cô là tiên nữ thương dân ốm đau nên xin giáng trần, sinh vào một gia đình người Nùng ở Hữu Lũng, Lạng Sơn',
    'Cô nổi tiếng giỏi chữa bệnh, thường vào rừng sâu hái thuốc quý cứu người',
    'Cung thờ cô ở cạnh đền Chầu Lục tại Lục Cung Chín Tư (Hữu Lũng, Lạng Sơn); khánh tiệc ngày 10 tháng Năm âm lịch',
  ],
  nguon_chuanp: 'Báo Quốc tế (baoquocte.vn); Sun Paradise Land, "Đền Bà Chúa Năm Phương Hải Phòng"',
  chuanp: [
    'Theo GS.TS Ngô Đức Thịnh, Chúa Bà Năm Phương vốn là tiên nữ trên Thiên Đình giáng trần',
    'Bà giáng sinh vào nhà họ Vũ ở vùng Cửa Cấm Giang, đất Gia Viên, nay thuộc Hải Phòng',
    'Về trời, bà được giao cai quản năm phương trời đất nên được tôn xưng là Bà Chúa Quận Năm Phương; bà khuyên dân chăm làm ăn, trừng trị kẻ ngang ngược',
    'Khánh tiệc Chúa Bà Năm Phương ngày 16 tháng Sáu âm lịch, lễ ở Hải Phòng đặc sắc hơn cả',
    'Nơi thờ: có nhiều tích, chưa xác định đền chính. Ở Hải Phòng bà được thờ tại đền Cấm, đền Tiên Nga (phố Lê Lợi), đền Cây Đa 13 Gốc, phường Ngô Quyền',
  ],
  nguon_chualm: 'phuday.com, "Tam vị Chúa Mường là những ai?"',
  chualm: [
    'Chúa Lê Mại Đại Vương thuộc hàng Tam vị Chúa Mường, gắn với miền thượng ngàn',
    'Theo một quan điểm được đồng thầy Trần Văn Hải nêu, ngài là Sơn Trang Đệ Nhất, cai quản sơn lâm',
    'Tương truyền Lâm Cung Thánh Mẫu hiện thân ở Đông Cuông được vua Lê Lợi sắc phong là Lê Mại Đại Vương',
    'Về Chúa Lê Mại có nhiều tích truyện và nhiều quan điểm khác nhau trong giới đồng đền, chưa thống nhất',
    'Nơi thờ chính cũng có nhiều tích, chưa xác định chính xác; tích của ngài gắn với vùng Đông Cuông (Yên Bái cũ), ngài thường được phối thờ ở các đền, phủ thờ Mẫu',
  ],
  nguon_chaudn: 'oancotam.com, "Sự tích, đền thờ và bản văn Chầu Đệ Nhị Thượng Ngàn"',
  chaudn: [
    'Chầu Đệ Nhị Thượng Ngàn là vị Chầu thứ hai trong Thập nhị Chầu Bà, cai quản sơn lâm thượng ngàn',
    'Tương truyền bà là Đông Quang Công Chúa, ở lại Đông Cuông dạy dân lập bản, trồng trọt, chăn nuôi, chữa bệnh',
    'Bà phù trợ thuyền bè qua sông Thao, cai quản 36 động sơn trang',
    'Đền chính là đền Đông Cuông (Văn Yên, Yên Bái cũ); tiệc Chầu ngày 2 tháng Mười Một âm lịch',
  ],
  nguon_chuatb: 'Báo Pháp luật Việt Nam, "Chốn thiêng Thác Bờ trên dòng Đà Giang"',
  chuatb: [
    'Theo truyền thuyết, Bà Chúa Thác Bờ là tiên nữ hóa thân thành cô gái Mường tên Đinh Thị Vân',
    'Bà dạy dân làm nương rẫy, đan lưới bắt cá, và góp công tiếp tế lương thực cho vua Lê Lợi cùng quân sĩ vượt thác sông Đà dẹp loạn Đèo Cát Hãn',
    'Tương truyền thuyền bà đi qua đâu thì thác nước nơi đó trở nên hiền hòa',
    'Đền Chúa Thác Bờ ở sườn núi Chủa, xã Ngòi Hoa, huyện Tân Lạc (Hòa Bình cũ), gần Động Thác Bờ',
  ],
  nguon_quannhat: 'oancotam.com, "Quan Đệ Nhất Thượng Thiên - Sự tích, đền thờ"',
  quannhat: [
    'Quan Lớn Đệ Nhất Thượng Thiên đứng đầu Ngũ vị Tôn Quan trong hệ Tứ Phủ, cai quản cõi Thượng Thiên (miền trời)',
    'Đền thờ chính là đền Đồng Bằng, thôn Đồng Phúc, xã An Lễ, huyện Quỳnh Phụ, Thái Bình',
    'Lễ đản sinh của Quan ngày 10 tháng Giêng, lễ đản nhật ngày 24 tháng Tám âm lịch',
  ],
  nguon_quannhi: 'phuday.com, "Quan lớn Đệ Nhị Giám Sát"',
  quannhi: [
    'Quan Lớn Đệ Nhị Giám Sát, còn gọi là Đệ Nhị Thượng Ngàn, đứng thứ hai trong Ngũ vị Tôn Quan, được giao giám sát, cai quản miền sơn lâm thượng ngàn',
    'Tương truyền ngài là con trai thứ hai của Vua Cha Bát Hải Động Đình; khi dân gặp hạn hán cầu đảo, ngài ban mưa thuận gió hòa',
    'Khi ngự đồng, ngài mặc áo xanh thêu rồng, thường múa kiếm',
    'Nơi thờ: có nhiều tích, chưa xác định đền chính. Ngài được thờ ở đền Quan Giám (Hữu Lũng, Lạng Sơn), đền Quan ở Phố Cát (Thanh Hóa), một đền ở Thái Bình gần đền Đồng Bằng, và ở ban Công Đồng các đền phủ',
    'Khánh tiệc của ngài vào tháng Mười Một âm lịch (tài liệu ghi ngày 10 hoặc 11, chưa thống nhất)',
  ],
  nguon_quantu: 'Tín ngưỡng Tứ Phủ (tư liệu dân gian, bản văn chầu); chưa có nguồn báo chí chính thống',
  quantu: [
    'Quan Lớn Đệ Tứ, còn gọi là Quan Đệ Tứ Khâm Sai, đứng thứ tư trong Ngũ vị Tôn Quan của hệ thống Tứ Phủ',
    'Tương truyền ngài là quan khâm sai, thay mặt Vua Cha đi tuần tra, xét việc thiện ác khắp các miền',
    'Khi ngự đồng, ngài thường mặc áo màu vàng, phong thái nho nhã, uy nghiêm',
    'Nơi thờ: có nhiều tích, chưa xác định đền chính. Ngài được phối thờ ở ban Công Đồng các đền phủ; ở Mỏ Hạc Linh Từ (Nghệ An) có dâng văn hầu Quan Đệ Tứ',
  ],
  nguon_quantam: 'Báo Pháp luật Việt Nam, "Huyền tích về Quan Lớn Đệ Tam và ngôi đền thiêng bên bờ Lục Đầu"',
  quantam: [
    'Quan Lớn Đệ Tam là vị thần đứng đầu Thoải phủ (sông nước), tương truyền là con trai thứ ba của Vua Cha Bát Hải Động Đình',
    'Tương truyền Ông là vị tướng thời Hùng Vương, thống lĩnh quân thủy bộ, hy sinh trong một trận đánh; dân lập đền thờ khắp vùng sông nước',
    'Đền Lảnh Giang (Hà Nam) và đền Xích Đằng (Hưng Yên) là nơi thờ chính; tháng Sáu âm lịch là "tháng tiệc Thoải phủ"',
  ],
  nguon_quanngu: 'VOV2; Báo Văn Hóa (baovanhoa.vn)',
  quanngu: [
    'Quan Lớn Đệ Ngũ Tuần Tranh là vị thần sông nước, tương truyền là hoàng tử thứ năm của Vua Thủy Tề, được giao cai quản ngã ba sông Tranh',
    'Vì một mối tình, Ông bị đày lên biên giới phía Bắc; để minh oan, Ông gieo mình xuống sông Kỳ Cùng (Lạng Sơn), thi hài trôi về bến đò Tranh',
    'Dân lập đền thờ vì Ông phù trợ người buôn thuyền, bán bè. Đền Tranh ở xã Đồng Tâm, huyện Ninh Giang, Hải Dương, di tích quốc gia năm 2009',
    'Lễ hội đền Tranh khai hội mùng 10 tháng Hai âm lịch; lễ trọng ngày 14 tháng Hai, tương truyền là ngày sinh của Quan Lớn; ngày 25 tháng Năm có lễ Tiệc Quan',
  ],
  nguon_ongbo: 'Tín ngưỡng Tứ Phủ (tư liệu dân gian, bản văn chầu); chưa có nguồn báo chí chính thống',
  ongbo: [
    'Ông Hoàng Bơ, còn gọi là Quan Hoàng Bơ Thủy Phủ, là vị Ông Hoàng thuộc Thoải phủ (miền sông nước) trong tín ngưỡng Tứ Phủ',
    'Tương truyền ngài coi sóc vùng sông nước, phù hộ người đi thuyền, đánh cá, buôn bán trên sông',
    'Khi ngự đồng, ngài mặc áo trắng thêu rồng, thắt đai vàng cam, có điệu chèo thuyền',
    'Nơi thờ: có nhiều tích, chưa xác định đền chính. Ngài được phối thờ ở ban Công Đồng các đền phủ',
  ],
  nguon_cobe2: 'Tín ngưỡng Tứ Phủ (tư liệu dân gian, bản văn chầu); chưa có nguồn báo chí chính thống',
  cobe2: [
    'Cô Bé Thượng Ngàn là vị Thánh Cô nhỏ tuổi nhất, thuộc Thượng Ngàn (miền núi rừng), theo hầu Mẫu Thượng Ngàn',
    'Tương truyền Cô là người con gái miền núi, hồn nhiên, tinh nghịch, hay giúp người đi rừng, hái thuốc',
    'Khi ngự đồng, Cô mặc áo chàm, váy thổ cẩm, đội khăn hoa; múa mồi, tung tiền, tung quả hoa rồi ngồi nghe văn',
    'Nơi thờ: có nhiều tích, chưa xác định đền chính. Cô được thờ ở nhiều đền Thượng Ngàn vùng Lạng Sơn, Yên Bái, Tuyên Quang và ở ban Công Đồng các đền phủ',
  ],
  nguon_caube: 'chonthieng.com, "Cậu Bé Bản Đền"',
  caube: [
    'Cậu Bé Bản Đền là vị Thánh Cậu coi sóc bản đền, bản điện, thuộc hàng Tứ Phủ Thánh Cậu, màu sắc đại diện là xanh',
    'Cậu thường hầu cận các Quan Hoàng hoặc ngự tại một bản đền; được thờ ở Lầu Cậu trong các đền, phủ thờ Mẫu',
    'Ngày tiệc của Cậu là mùng 7 tháng Ba âm lịch hằng năm',
    'Nơi thờ: Cậu không có một đền chính được xác định; có nhiều tích khác nhau, Cậu được thờ ở Lầu Cậu của hầu hết các đền, phủ thờ Mẫu',
  ],
};
window.BANG_TIN.codoi2 = window.BANG_TIN.codoi; /* /g dùng Cô Đôi bản mới (id codoi2) */
