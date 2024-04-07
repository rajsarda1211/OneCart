import express from "express";
import { deleteOrder, getAllOrders, myOrder, newOrder, singleOrder, updateOrder } from "../controllers/orderControllers.js";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/order/new",isAuthenticated,newOrder);
router.get("/order/:id",isAuthenticated,singleOrder);
router.get("/orders/me",isAuthenticated,myOrder);
router.get("/admin/orders",isAuthenticated,authorizeRoles("admin"),getAllOrders);
router.put("/admin/order/:id",isAuthenticated,authorizeRoles("admin"),updateOrder);
router.delete("/admin/order/:id",isAuthenticated,authorizeRoles("admin"),deleteOrder);

export default router;