import express from "express";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";
import {
  uploadCatBaner,
  deleteCatBaner,
  getAllCatBaners,
  getCatBanerDetails,
} from "../controllers/catBanerController.js";
const router = express.Router();

router.use(express.json());

router.route("/catbaners").get(getAllCatBaners);

router
  .route("/admin/catbaner/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCatBaner);

router
  .route("/admin/catbaner/:category")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getCatBanerDetails);

router
  .route("/admin/catbaner/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), uploadCatBaner);

export default router;
