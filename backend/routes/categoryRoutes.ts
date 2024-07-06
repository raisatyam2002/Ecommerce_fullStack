import express from "express";
import { isAdmin, requireSignin } from "../middleware/authMiddleware";
import {
  categoryController,
  updateCategoryController,
  getAllCategoryController,
  singleCategoryConroller,
  deleteCategoryController,
} from "../controllers/categoryController";
import { Request, Response } from "express";
const router = express.Router();

//create cateegory
router.post("/createCategory", requireSignin, isAdmin, categoryController);

//update category
router.put(
  "/update-category/:id",
  requireSignin,
  isAdmin,
  updateCategoryController
);
router.get("/get-category", getAllCategoryController);
router.get("/single-category/:slug", singleCategoryConroller);
router.get("/", (req: Request, res: Response) => {
  res.send("hi");
});
router.delete(
  "/delete-category/:id",
  requireSignin,
  isAdmin,
  deleteCategoryController
);

export default router;
