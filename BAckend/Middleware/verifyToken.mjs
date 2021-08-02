import jwt from "jsonwebtoken";

export const authToken = async (req, res, next) => {
  console.log(req.headers);
  const token = req.headers.authorization.split(" ")[1];

  if (token === null || token === undefined)
    return res.status(401).json({ msg: "please provided the token" });
  console.log(token);
  try {
    const decode = jwt.verify(token, "Secert");

    if (!decode) {
      return res.status(400).json({ msg: "Invaild Token" });
    } else {
      console.log(decode);
      req.user = decode.data;
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "TOken Expried Please login Again" });
  }
};
