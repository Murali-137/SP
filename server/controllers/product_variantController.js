const productPool = require("../models/productsDB");

const addProductVariant = async (req, res) => {
  try {
    const {
      product_id,
      size,
      color,
      chest,
      length,
      shoulder,
      arm_length,
      stretch_percent,
      stock_q,
    } = req.body;
    const result = await productPool.query(
      `INSERT INTO product_variant 
            (product_id, size, color, chest, length, shoulder, arm_length, stretch_percent, stock_q)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING *`,
      [
        product_id,
        size,
        color,
        chest,
        length,
        shoulder,
        arm_length,
        stretch_percent,
        stock_q,
      ]
    );
    if (result) {
      return res.status(200).json({
        sucess: true,
        message: "Variant added successfully",
        variant: result.rows[0],
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

const getProductVariants = async (req, res) => {
  try {
    const result = await productPool.query("SELECT * FROM product_variant");

    if (result) {
      return res.status(200).json({
        success: true,
        variants: result.rows,
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

const getProductVariant = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await productPool.query(
      "SELECT * FROM product_variant WHERE product_id = $1",
      [id]
    );

    return res.status(200).json({
      success: true,
      variant: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

const updateProductVariant = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      size,
      color,
      chest,
      length,
      shoulder,
      arm_length,
      stretch_percent,
      stock_q,
    } = req.body;

    const result = await productPool.query(
      `UPDATE product_variant
       SET size=$1, color=$2, chest=$3, length=$4, shoulder=$5,
           arm_length=$6, stretch_percent=$7, stock_q=$8
       WHERE id=$9
       RETURNING *`,
      [
        size,
        color,
        chest,
        length,
        shoulder,
        arm_length,
        stretch_percent,
        stock_q,
        id,
      ]
    );

    return res.status(200).json({
      success: true,
      message: "Variant Updated",
      variant: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

const delProductVariant = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await productPool.query(
      "DELETE FROM product_variant WHERE id=$1",
      [id]
    );
    if (result.rows.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Variant Deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

module.exports = {
  addProductVariant,
  getProductVariant,
  getProductVariants,
  updateProductVariant,
  delProductVariant,
};
