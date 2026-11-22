# E104A-H2 — Hệ thống ôn tập và thi trắc nghiệm

Dự án mới, độc lập với các hệ thống E104A trước đây.

## Kiến trúc mục tiêu

- Frontend: ứng dụng web responsive, mã nguồn trong repository này.
- Backend: Google Apps Script mới, cung cấp API nghiệp vụ.
- Database: Google Sheets mới, lưu môn học, câu hỏi, lựa chọn, đáp án, giải thích và lịch sử thi.

## Quy tắc nghiệp vụ đã thống nhất

### Luyện tập
- Hiển thị toàn bộ câu hỏi theo đúng thứ tự nguồn.
- Giữ nguyên thứ tự các phương án A/B/C/D.
- Hiển thị giải thích sau khi người học trả lời.

### Thi
- Tạo đề gồm 30 câu hỏi ngẫu nhiên.
- Thời gian làm bài 30 phút.
- Nộp bài một lần và chấm điểm tự động.

### Thống kê
- Lưu lượt thi, điểm, tỷ lệ đúng và lịch sử làm bài.

## Cấu trúc thư mục

- `frontend/`: giao diện website.
- `backend/apps-script/`: mã nguồn Google Apps Script.
- `docs/`: kiến trúc, cấu trúc dữ liệu và hướng dẫn triển khai.

## Lưu ý tích hợp

Frontend và Apps Script phải được tích hợp qua một cơ chế API có xác thực và xử lý CORS phù hợp. Không nhúng ứng dụng bằng iframe. Không đưa khóa bí mật hoặc thông tin xác thực vào mã frontend công khai.

## Trạng thái

Khởi tạo repository và bộ khung dự án.
