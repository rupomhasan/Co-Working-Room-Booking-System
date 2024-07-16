import { Router } from "express";

import validationRequest from "../../middleware/validationRequest";
import { userValidationSchema } from "../User/user.validation";
import { loginValidationSchema } from "./auth.validation";
import { authController } from "./auth.controller";

const router = Router();
router.post(
  "/signup",
  validationRequest(userValidationSchema),
  authController.singUp,
);

router.post(
  "/login",
  validationRequest(loginValidationSchema),
  authController.login,
);

export const AuthRoutes = router;
