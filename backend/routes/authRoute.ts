import express from "express";
import {
  loginController,
  registerController,
  testController,
} from "../controllers/authController";
import { requireSignin, isAdmin } from "../middleware/authMiddleware";
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/test", requireSignin, isAdmin, testController);
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});
export default router;
