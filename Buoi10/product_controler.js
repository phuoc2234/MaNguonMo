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

const Product = require("../model/product");

class ProductController {
  static async create(req, res) { // dùng để xử lý form tạo sản phẩm mới
    let { name, description, price } = req.body;
    try {
      let product = await Product.create({
        name,
        description,
        price,
      });
      res.redirect("/products");
    } catch (error) {
      res.render("product_new")
    }
    res.render("/products_new");
  }

  static async new(req, res) {  // dùng để render qua trang tạo sản phẩm mới
    res.render("product_new");//dùng để render qua trang tạo sản phẩm mới
  }

  static async index(req, res) {
    console.log(req.query.q);
    let q= req.query.q ;
    let products ;
    let page=parseInt( req.query.page);
    let skip =(page-1)*5;
    console.log(page);
    
    if(q){
      products = await Product.find({name: {$regex: q, $options: "i"}});
    }
    else{
      products = await Product.find().skip(skip).limit(5);
    }
  
    res.render("product", { products });
  }

  static async delete (req, res) {
    console.log(req.params.id);
    let id = req.params.id;
    let product = await Product.deleteOne({_id: id});
    res .redirect("/products");
  }

  static async edit(req, res) {
    try {
      const id = req.params.id;
      const product = await Product.findById(id);
      if (!product) {
        return res.redirect("/products");
      }
      res.render("product_edit", { product });
    } catch (error) {
      console.error(error);
      res.redirect("/products");
    }
  }

  static async update(req, res) {
    try {
      const id = req.params.id;
      const { name, description, price } = req.body;
      
      await Product.findByIdAndUpdate(id, {
        name,
        description,
        price
      });
      
      res.redirect("/products");
    } catch (error) {
      console.error(error);
      res.redirect("/products");
    }
  }
}

module.exports = ProductController;
