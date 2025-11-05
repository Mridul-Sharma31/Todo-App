import {Router} from "express"
import {logoutUser, refreshAccessToken, registerUser,getUserProfile,changeCurrentPassword} from "../controllers/user.controller.js"
import { loginUser } from "../controllers/user.controller.js";
import {verifyJWT} from "../middlewares/authMiddleware.js"

const router = new Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/refreshToken").post(refreshAccessToken);

//* secured routes
router.route("/logout").post(verifyJWT,logoutUser);

router.route("/me").get(verifyJWT,getUserProfile);

router.route("/change-password").post(verifyJWT,changeCurrentPassword);

export default router;