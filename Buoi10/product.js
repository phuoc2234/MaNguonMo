const express = require("express");
const ProductController = require("../controllers/product_controler");

const router = express.Router();

router.get("/", ProductController.index);
router.get("/new", ProductController.new); // dùng để render qua trang tạo sản phẩm mới
router.get("/delete/:id", ProductController.delete);
router.post("/create", ProductController.create); // dùng để xử lý form tạo sản phẩm mới
router.get("/edit/:id", ProductController.edit); // route để hiển thị form sửa
router.post("/update/:id", ProductController.update); // route để xử lý form sửa

module.exports = router;
