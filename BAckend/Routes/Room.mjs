import { Router } from "express";
import { getRoombyId } from "../Controller/RoomController.mjs";
import { getAllRooms, addRoom } from "../Controller/RoomController.mjs";

const router = Router();

router.route("/").get(getAllRooms);
router.route("/:id").get(getRoombyId);
router.route("/").post(addRoom);

const RoomRoute = router;

export default RoomRoute;
