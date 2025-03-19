const express = require('express');
const path = require('path');
const bookingRoutes = require('./routes/bookingRouters'); // Đảm bảo file này tồn tại

const app = express();

// Cấu hình EJS làm template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware xử lý dữ liệu từ form
app.use(express.urlencoded({ extended: true }));

// Chỉ định thư mục chứa file tĩnh (CSS, hình ảnh)
app.use(express.static(path.join(__dirname, 'public')));

// Sử dụng routes cho phần đặt chỗ
app.use('/bookings', bookingRoutes);

// Trang chủ sẽ chuyển hướng đến danh sách đặt chỗ
app.get('/', (req, res) => {
    res.redirect('/bookings');
});

// Khởi động server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});
