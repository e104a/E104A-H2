# E104A-H2 — Hệ thống ôn tập và thi trắc nghiệm

Ứng dụng web responsive mới, độc lập với các hệ thống E104A trước đây. Giao diện hiện chạy trên dữ liệu demo, chưa kết nối backend thật.

## Chạy trên máy
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Website hiện có
- Tổng quan
- Luyện tập theo môn: câu hỏi theo thứ tự nguồn, kiểm tra đáp án và giải thích
- Thi thử: hiện cảnh báo khi ngân hàng demo chưa đủ 30 câu
- Lịch sử (chờ backend)
- Quản trị ngân hàng demo
- Responsive desktop/mobile
- Avatar app: `avatar.svg`

## Quy tắc nghiệp vụ mục tiêu
- Luyện tập: toàn bộ câu hỏi theo đúng thứ tự nguồn, phương án A/B/C/D giữ nguyên, giải thích sau trả lời.
- Thi: 30 câu ngẫu nhiên, 30 phút, nộp một lần, tự chấm.
- Thống kê: lượt thi, điểm, tỷ lệ đúng và lịch sử.
- Backend/Database: Google Apps Script mới + Google Sheets mới (chưa kết nối).

## GitHub Pages
Repository đã có workflow build/deploy ở `.github/workflows/pages.yml`. Sau khi bật Pages trong Settings → Pages và chọn GitHub Actions, các lần push lên `main` sẽ chạy quy trình build/deploy.

## Demo
Ngân hàng hiện chỉ có vài câu minh họa; không sử dụng làm dữ liệu ôn thi chính thức.