import express from "express";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";
import {
  getAllCategories,
  getAdminCategories,
  newCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryController.js";
const router = express.Router();

router.use(express.json());

router.route("/category/all").get(getAllCategories);
router
  .route("/admin/category/all")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminCategories);
router
  .route("/admin/category/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newCategory);
router
  .route("/admin/category/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateCategory)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCategory);

export default router;
