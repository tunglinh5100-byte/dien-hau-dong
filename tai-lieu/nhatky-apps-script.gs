// Nhật ký tương tác live Hầu Đồng -> Google Sheet
// Cách cài (1 lần, khoảng 3 phút):
// 1. Mở https://script.google.com -> Dự án mới -> xoá hết, dán toàn bộ file này -> Lưu.
// 2. Chọn hàm "caiDat" -> bấm Chạy -> cấp quyền. Trong Nhật ký thực thi sẽ hiện link Google Sheet vừa tạo.
// 3. Triển khai -> Tuỳ chọn triển khai mới -> loại "Ứng dụng web":
//      Thực thi với tư cách: Tôi · Người có quyền truy cập: Bất kỳ ai -> Triển khai.
// 4. Sao chép "URL ứng dụng web" (dạng https://script.google.com/macros/s/.../exec) gửi lại cho Claude.

const COT = ['id', 'thoiGian', 'phien', 'trang', 'loai', 'userId', 'taiKhoan', 'tenHienThi', 'noiDung', 'soLuong',
  'tenQua', 'kimCuong', 'quanHe', 'giaDangHau', 'soNguoiXem', 'anhDaiDien'];
const TIEU_DE = ['ID', 'Thời gian', 'Phiên live', 'Trang', 'Loại', 'User ID', 'Tài khoản (@)', 'Tên hiển thị', 'Nội dung bình luận',
  'Số lượng', 'Tên quà', 'Kim cương', 'Quan hệ', 'Giá đang hầu', 'Số người xem', 'Ảnh đại diện (link có hạn)'];

function bangTinh_() {
  const pr = PropertiesService.getScriptProperties();
  let id = pr.getProperty('SHEET_ID'), ss;
  if (id) { try { ss = SpreadsheetApp.openById(id); } catch (e) { ss = null; } }
  if (!ss) {
    ss = SpreadsheetApp.create('Nhật ký tương tác live Hầu Đồng');
    pr.setProperty('SHEET_ID', ss.getId());
  }
  let sh = ss.getSheetByName('NhatKy');
  if (!sh) {
    sh = ss.getSheets()[0]; sh.setName('NhatKy');
    sh.getRange(1, 1, 1, TIEU_DE.length).setValues([TIEU_DE]).setFontWeight('bold');
    sh.setFrozenRows(1); sh.getRange('A:P').setNumberFormat('@');
  }
  return sh;
}

function caiDat() { const sh = bangTinh_(); Logger.log('Google Sheet: ' + sh.getParent().getUrl()); }

function doPost(e) {
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    const ds = JSON.parse(e.postData.contents || '[]');
    if (!Array.isArray(ds) || !ds.length) return ContentService.createTextOutput('rong');
    const sh = bangTinh_();
    const rows = ds.slice(0, 1000).map(r => COT.map(k => { const v = r[k] == null ? '' : String(r[k]).slice(0, 500);
      return /^[=+\-@]/.test(v) ? "'" + v : v; })); // giữ nguyên chữ, không để Sheet hiểu thành công thức
    sh.getRange(sh.getLastRow() + 1, 1, rows.length, COT.length).setValues(rows);
    return ContentService.createTextOutput('ok ' + rows.length);
  } finally { lock.releaseLock(); }
}

function doGet() { return ContentService.createTextOutput('Nhat ky live Hau Dong: dang chay'); }
