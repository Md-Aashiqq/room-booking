import Room from "../Model/Room.mjs";

export const getAllRooms = async (req, res) => {
  try {
    const Rooms = await Room.find({});

    res
      .status(200)
      .json({ msg: "Sucess", data: Rooms, resultLenght: Rooms.length });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Fails" });
  }
};

export const addRoom = async (req, res) => {
  console.log(req.body);
  try {
    const data = req.body;

    const room = await Room.create(data);

    res.status(201).json({ msg: "Sucess", data: room });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Fails" });
  }
};

export const getRoombyId = async (req, res) => {
  const id = req.params.id;

  try {
    const room = await Room.findById(id);

    res.status(200).json({ room });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Fails" });
  }
};
