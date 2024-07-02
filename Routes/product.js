import express from "express";
import {
  addProduct,
  getAllProducts,
  home,
  getProductById,
  updateById,
  deleteById,
  getProductByUserId,
} from "../Controllers/product.js";
import { isAuthenticated } from "../Middlewares/Auth.js";

const router = express.Router();

// add product
// @method - post
// @route - /api/product/add
router.post("/add", isAuthenticated, addProduct);

// get all products
// @method - get
// @route - /api/product/get
router.get("/get", getAllProducts);


// get product by user Id
// @method - get
// @route - /api/product/:id
router.get("/user",isAuthenticated, getProductByUserId);

// get product by Id
// @method - get
// @route - /api/product/:id
router.get("/:id", getProductById);


// update product by Id
// @method - put
// @route - /api/product/:id
router.put("/:id", isAuthenticated, updateById);

// delete product by Id
// @method - delete
// @route - /api/product/:id
router.delete("/:id", isAuthenticated, deleteById);

// home
// @method - get
// @route - /api/product/home
router.get("/home", home);

export default router;
