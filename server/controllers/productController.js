const productPool = require("../models/productsDB");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      sku,
      description,
      category,
      price,
      fit_type,
      fabric_info,
      model_measurements,
      status,
    } = req.body;
    const result = await productPool.query(
      "INSERT INTO products (name, sku, description, category, price, fit_type, fabric_info, model_measurements, status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
      [
        name,
        sku,
        description,
        category,
        price,
        fit_type,
        fabric_info,
        model_measurements,
        status,
      ]
    );
    if (result) {
      return res.status(200).json({
        success: true,
        product: result.rows[0],
        message: "product Added Succesfully",
      });
    }
  } catch (error) {
    if (error.code === "23505") {
      return res
        .status(400)
        .json({ success: false, message: "SKU must be unique" });
    }
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const getProducts = async (req, res) => {
  const result = await productPool.query("SELECT *FROM products");
  if (result) {
    return res.status(200).json({
      success: true,
      message: "Products Fetched!",
      result: result.rows,
    });
  }
};

const getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await productPool.query(
      "SELECT *FROM products WHERE id = $1",
      [id]
    );
    if (result) {
      return res.status(200).json({
        success: true,
        message: "Product fetched",
        result: result.rows[0],
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      name,
      sku,
      description,
      category,
      price,
      fit_type,
      fabric_info,
      model_measurements,
      status,
    } = req.body;
    const result = await productPool.query(
      `UPDATE products 
       SET name=$1, sku=$2, description=$3, category=$4, price=$5, 
       fit_type=$6, fabric_info=$7, model_measurements=$8, status=$9 
       WHERE id=$10 
       RETURNING *`,
      [
        name,
        sku,
        description,
        category,
        price,
        fit_type,
        fabric_info,
        model_measurements,
        status,
        id,
      ]
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await productPool.query(
      "UPDATE products SET status='deleted' WHERE id=$1 RETURNING *",
      [id]
    );
    if (result) {
      return res.status(200).json({
        success: true,
        message: "Product deleted successfully(not complete Delete)",
        product: result.rows[0],
      });
    }
  } catch (error) {
        return res.status(500).json({
        message: error,
    });
  }
};

module.exports = { addProduct,getProducts,getProduct,updateProduct,deleteProduct };
