import express from "express";
import { deleteUser, forgotPassword, getAllUsers, getSingleUser, getUserDetails, loginUser, logoutUser, registerUser, resetPassword, updatePassword, updateProfile, updateUserRole } from "../controllers/userControllers.js";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/password/forgot",forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/logout",logoutUser);
router.get("/me",isAuthenticated,getUserDetails);
router.put("/password/update",isAuthenticated,updatePassword);
router.put("/me/update",isAuthenticated,updateProfile);
router.get("/admin/users",isAuthenticated,authorizeRoles("admin"),getAllUsers);
router.get("/admin/user/:id",isAuthenticated,authorizeRoles("admin"),getSingleUser);
router.put("/admin/user/:id",isAuthenticated,authorizeRoles("admin"),updateUserRole);
router.delete("/admin/user/:id",isAuthenticated,authorizeRoles("admin"),deleteUser);
export default router;