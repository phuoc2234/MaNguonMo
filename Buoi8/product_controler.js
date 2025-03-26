const categories = [
  {
    id: 1,
    name: "Điện thoại",
    description: "Các dòng điện thoại thông minh và phụ kiện",
  },
  {
    id: 2,
    name: "Laptop",
    description: "Laptop các hãng khác nhau",
  },
  {
    id: 3,
    name: "Phụ kiện",
    description: "Tai nghe, sạc, cáp,...",
  },
];

const products = require("../model/products");


class ProductController {
  static async index(req, res) {
    const categoryId = req.query.category;
    let filteredProducts = products;
    
    if (categoryId) {
      filteredProducts = products.filter(p => p.category_id === parseInt(categoryId));
    }

    // Thêm tên danh mục vào mỗi sản phẩm
    const productsWithCategory = filteredProducts.map(product => {
      const category = categories.find(c => c.id === product.category_id);
      return {
        ...product,
        category_name: category ? category.name : 'Không có danh mục'
      };
    });

    res.render("product", {
      categories: categories,
      products: productsWithCategory,
      selectedCategory: categoryId
    });
  }
}

module.exports = ProductController;
