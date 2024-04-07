import express from "express";
import { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getAllReviews, deleteReviews, getAdminProducts } from "../controllers/productController.js";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/admin/product/new",isAuthenticated,authorizeRoles("admin"),createProduct);
router.get("/products",getAllProducts);
router.put("/admin/product/:id",isAuthenticated,authorizeRoles("admin"),updateProduct);
router.delete("/admin/product/:id",isAuthenticated,authorizeRoles("admin"),deleteProduct);
router.get("/product/:id",getProductDetails);
router.put("/review",isAuthenticated,createProductReview);
router.get("/reviews",getAllReviews);
router.delete("/reviews",isAuthenticated,deleteReviews);
router.get("/admin/products",isAuthenticated,authorizeRoles("admin"),getAdminProducts);
export default router;