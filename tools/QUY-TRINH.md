# Quy trình xử lý góp ý của Quỳnh (chạy tự động)

Dành cho phiên Claude chạy theo lịch (hoặc bất kỳ ai sửa giá hầu). Đọc hết trước khi sửa.

## Trang và file
- `index.html` = trang chính. `/g` (live) mở `index.html?live=1&...&qg=1`.
- `cb.html` = bản sao để `/tn` (link thử, `?qd=1`) dùng. **Luôn giữ `cb.html` giống hệt `index.html`**: sửa `index.html` rồi `cp index.html cb.html`.
- Giá mới chưa duyệt chỉ hiện trên /tn: `ds.push` của giá đó dùng `if (QD_THU)`. Khi anh Linh cho lên /g mới đổi thành `if (QD_THU || QG)`, thêm id vào mảng `TT`, regex trong `qOn`, danh sách tải sẵn `QG ? [...]`, và bỏ `tnonly` ở nút trên `dk.html`.
- `dk.html` = điều khiển live /g. `dk.html?tn=1` (link ngắn `/dktn`) = điều khiển /tn, kênh ntfy riêng.
- `tn/index.html` = danh sách giá trên /tn (tham số `ds=`), thứ tự giá.
- Một phiên khác cũng sửa `index.html` (trải nghiệm người xem, đố mã…). **Luôn `git pull --rebase` trước khi sửa và trước khi push**, không ghi đè phần của họ.

## Cấu hình một giá dạng clip (QM)
`QM.<khoá> = { id, LAP, AU, SRC, LICH, BUOC, K, TF, DAU, DEM, RATE, XF, XFV, NOI }`, `QX.<id> = '<khoá>'`.
- `AU`: tên khoá → file nhạc. `LICH`: mỗi dòng `[bước, khoáNhạc, giâyĐầu, giâyCuối, clip, kiểu, '', cues, [giâyClip,'tien'|'qua'], lặpTừ, 'giu']`.
- Hai bước liên tiếp dùng **cùng khoá nhạc** và giây nối tiếp nhau thì nhạc chạy liền, không tắt bật (cách làm của Cô Bé: nối các đoạn văn liền nhau thành 1 file `*_noi_*.mp3`).
- `BUOC`: tên bước trên thanh tiến trình = **đúng cột A (QUY TRÌNH) của tab kịch bản** trong sheet "Kịch bản giá hầu".
- `XF`: giây nhạc gối khi đổi file; `XFV`: giây hình hoà; `NOI: 1`: bài mới vào nhanh (0,3 giây).
- `TF`/`DAU`: vị trí, cỡ nhân vật; tính bằng `tools/m3.py` + `tools/tf.py` (đứng cao 390, ngồi 305).
- Mã dâng: `MA_GIA` (id → số mã) theo tab "Mã dâng"; mã mới thêm vào `MA_HANG`, `MA_TEN`, `MA_THU_TU`.
- Sự tích: `bangtin.js` (khoá = id giá), tăng `?v=` khi sửa.

## Clip của Tú
- Tải từ Drive (thư mục `Cô Bé (cbe)`, `Hoàng Bơ (hbo)`…), tách nền: `python3 tools/qkey.py nguồn.mp4 đích.mp4 [pp] nomat lung can [rot=độ] [t0= t1=]`
  - `pp` lặp tới–lui; `lung` giữ vải xanh lá đậm (đai lưng) không bị tách mất; `can` cân giữa khung; `rot` dựng thẳng người bị nghiêng.
  - Chạy tối đa 2 lệnh cùng lúc (tốn RAM).
- Clip mới thì tăng `?v=` trong `SRC` để trình duyệt tải lại.

## Kiểm tra trước khi đẩy
1. Cú pháp: tách các khối `<script>` của index.html ra file rồi `node --check`.
2. Chạy thử: `npx -y http-server -p 8767 -s -c-1` trong thư mục repo (phải có hỗ trợ tua nhạc), rồi `node tools/thu-gia.js <id> <bước1,bước2,…>` và xem ảnh chụp; với nhạc nối thì `node tools/thu-noi-nhac.js`.
3. `cp index.html cb.html`, commit (ghi rõ "theo góp ý Quỳnh …"), `git pull --rebase`, push, chờ GitHub Pages chạy xong (`gh api repos/tunglinh5100-byte/dien-hau-dong/actions/runs`).

## Quy tắc
- Cô đồng luôn quay lưng về camera, hướng lên ban Công Đồng; clip có đoạn quay mặt ra thì không dùng.
- File của Quỳnh/Tú không tải hoặc không dùng được: báo anh Linh, không tự thay file khác.
- Email cho Quỳnh/Tú ký "Tường Vy (trợ lý của anh Linh)", xưng "em", gọi "Quỳnh".
- Không xoá cột trong sheet chung.
