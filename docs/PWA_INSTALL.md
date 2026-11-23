# Cài E104A-H2 như ứng dụng

## Mục tiêu hiện tại
Repository đang dùng React + Vite. Bước PWA giúp cài giao diện web lên màn hình chính trên thiết bị hỗ trợ, không yêu cầu viết lại ngay bằng Flutter.

## GitHub Pages
1. Mở Settings → Pages.
2. Chọn Deploy from a branch hoặc cấu hình GitHub Actions.
3. Build ứng dụng bằng `npm ci` và `npm run build`.
4. Cấu hình Vite base path phù hợp nếu website chạy tại đường dẫn dạng `https://e104a.github.io/E104A-H2/`.
5. Chỉ thử cài PWA sau khi website được phục vụ qua HTTPS.

## Cài trên máy tính
Mở website bằng trình duyệt hỗ trợ cài ứng dụng (ví dụ Chrome hoặc Edge), chọn biểu tượng Cài đặt trên thanh địa chỉ hoặc menu trình duyệt.

## Cài trên Android
Mở website qua Chrome, chọn menu ⋮ → Cài đặt ứng dụng / Add to Home screen.

## iPhone
Mở website bằng Safari → Chia sẻ → Add to Home Screen.

## Giới hạn quan trọng
- Service worker chỉ lưu bộ khung giao diện; không tự tải hay lưu ngân hàng câu hỏi đầy đủ.
- Không thể thi offline đầy đủ khi backend chưa đồng bộ dữ liệu và chưa có cơ chế lưu an toàn trên thiết bị.
- Kết quả thi chỉ được coi là đã lưu khi backend xác nhận.
- Việc phát hành file Windows .exe hoặc Android APK là bước đóng gói riêng, cần thêm kiểm thử và cấu hình ký ứng dụng.
