# Lộ trình phát hành ứng dụng E104A-H2

## Quyết định kỹ thuật giai đoạn đầu
Giữ React + Vite hiện có, bổ sung PWA và triển khai bằng GitHub Pages. Đây là đường đi ngắn nhất để có biểu tượng cài trên Windows, Android và iPhone mà không phải viết lại giao diện.

## Các bước tiếp theo
1. Hoàn thiện giao diện thật, bỏ dữ liệu demo.
2. Hoàn thiện và kiểm thử backend Apps Script hoặc thay backend bằng dịch vụ API phù hợp.
3. Xác thực người dùng, phân quyền quản trị và bảo vệ API.
4. Đồng bộ ngân hàng câu hỏi, kết quả, lịch sử và thống kê.
5. Xây dựng lưu trữ cục bộ có mã phiên bản để hỗ trợ ngoại tuyến.
6. Đóng gói Windows bằng Tauri hoặc Electron.
7. Đóng gói Android/iOS bằng Capacitor hoặc chuyển Flutter nếu cần trải nghiệm native đầy đủ.

## Không được coi là hoàn thành khi
- API chưa kết nối thật.
- Ngân hàng câu hỏi còn là dữ liệu mẫu.
- Kết quả chưa được backend xác nhận.
- Chức năng chấm điểm và thời hạn bài thi chưa được kiểm thử.
