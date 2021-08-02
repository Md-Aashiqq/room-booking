import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51JJB80SDRpM2Qwe5fVgsYWusxDliFuu0rvPxFJq0ZI1qp4fNwrUFO2B8AEd9d9RSN29Y0rRtfnRG9A3UFfwh5J2g00FFCYhj8U"
);

import Room from "../Model/Room.mjs";
import Booking from "../Model/Booking.mjs";

export const getCheckoutSession = async (req, res, next) => {
  // 1) Get the currently booked tour
  const room = await Room.findById(req.params.roomId);
  console.log(room);
  console.log(req.query);
  // 2) Create checkout session

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      // success_url: `${req.protocol}://${req.get('host')}/my-tours/?tour=${
      //   req.params.tourId
      // }&user=${req.user.id}&price=${tour.price}`,
      success_url: `${req.protocol}://${req.get(
        "host"
      )}/booking/mytours/?room=${req.params.roomId}&user=${
        req.user._id
      }&price=${room.price}&roomNo=${req.query.room}`,
      //   cancel_url: `${req.protocol}://${req.get("host")}/}`,
      // success_url: "http://sitename.com/checkout-success",
      cancel_url: "http://sitename.com/checkout-cancel",
      customer_email: req.user.email,
      client_reference_id: req.params.roomId,
      mode: "payment",
      line_items: [
        {
          name: `${room.name} Tour`,
          description: room.summary,
          images: [`${room.imagesURL}`],
          amount: room.price * 100,
          currency: "inr",
          quantity: 1,
        },
      ],
    });

    console.log(session);
    // 3) Create session as response
    res.status(200).json({
      status: "success",
      session,
    });
  } catch (e) {
    console.log(e);
  }
};

export const createBookingCheckout = async (req, res, next) => {
  // This is only TEMPORARY, because it's UNSECURE: everyone can make bookings without paying

  console.log("asdasd ", req.query);
  try {
    const { room, user, price, roomNo } = req.query;

    if (!room && !user && !price) return next();
    await Booking.create({ room, user, price });

    const query = { _id: room, "avalRooms.no": roomNo };

    const ro = await Room.find(query);
    console.log(ro);
    let q = `avalRooms.ocp`;
    console.log(q);
    const updateDocument = {
      $set: { "avalRooms.$.ocp": "true" },
    };

    const result = await Room.updateOne(query, updateDocument);
    console.log(result);
    // const bookings = await Booking.find({ user: req.user.id });

    // 2) Find tours with the returned IDs
    //  const tourIDs = bookings.map((el) => el.room);
    //  console.log(tourIDs);
    //  const tours = await Room.find({ _id: { $in: tourIDs } });
    //  console.log(tours);

    //  res.status(200).json({
    //    title: "My Tours",
    //    tours,
    //  });

    res.redirect("http://localhost:3000/");
  } catch (e) {
    console.log(e);
  }
};

export const getMyTours = async (req, res, next) => {
  try {
    // 1) Find all bookings

    console.log(req.user._id);
    const bookings = await Booking.find({ user: req.user._id });

    console.log(bookings);
    // 2) Find tours with the returned IDs
    const tourIDs = bookings.map((el) => el.room);
    console.log(tourIDs);
    const tours = await Room.find({ _id: { $in: tourIDs } });
    console.log(tours);

    res.status(200).json({
      title: "My Tours",
      tours,
    });
  } catch (e) {
    console.log(e);
  }
};
