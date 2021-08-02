import { Router } from "express";
import { getMyTours } from "../Controller/BookingController.mjs";
import { createBookingCheckout } from "../Controller/BookingController.mjs";

import { getCheckoutSession } from "../Controller/BookingController.mjs";
import { authToken } from "../Middleware/verifyToken.mjs";

const router = Router();

router.route("/checkout-session/:roomId").get(authToken, getCheckoutSession);
router.get("/mytours", createBookingCheckout);
router.route("/myroom").get(authToken, getMyTours);
const BookingRoute = router;

export default BookingRoute;
