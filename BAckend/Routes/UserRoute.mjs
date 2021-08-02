import { Router } from "express";
import { login } from "../Controller/AuthController.mjs";
import { signup } from "../Controller/AuthController.mjs";

const router = Router();

router.route("/login").post(login);
router.route("/signup").post(signup);

const UserRoute = router;

export default UserRoute;
