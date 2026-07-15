import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import userModel from "../models/user.model.js";
import redis from "../../../shared/redis/redis.js";

async function signIn(req, res) {
  const { token } = req.body;
  const auth = await getAuth(app);

  if (!token) {
    return res.status(400).json({ error: "Invalid token" });
  }

  try {
    // Decode the ID token and get the user information
    const decodedToken = await auth.verifyIdToken(token);

    const { user_id } = decodedToken;

    if (!user_id) {
      return res.status(400).json({ error: "Invalid user id" });
    }

    // Check if the user exists in the database
    const user = await userModel.findOne({ fireBaseId: user_id });

    if (!user) {
      // Create the User
      const { name, email, picture } = decodedToken;
      const newUser = await userModel.create({
        fireBaseId: user_id,
        email: email,
        name: name,
        avatar: picture,
      });

      const sessionID = crypto.randomUUID();
    //   console.log(sessionID);

      res.cookie("sessionID", sessionID, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      await redis.set(
        `sessionId-${sessionID}`,
        JSON.stringify({
          fireBaseId: newUser.fireBaseId,
          email: newUser.email,
          name: newUser.name,
          avatar: newUser.avatar,
        }),
        "EX",
        24 * 60 * 60 * 1000,
      );

      return res.status(201).json({
        message: "User Created successfully",
        user: newUser,
      });
    }

    const sessionID = crypto.randomUUID();
    // console.log(sessionID);

    res.cookie("sessionID", sessionID, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    await redis.set(
      `sessionId-${sessionID}`,
      JSON.stringify({
        fireBaseId: user.fireBaseId,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      }),
      "EX",
      24 * 60 * 60 * 1000,
    );

    return res.status(200).json({
      message: "User login successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function signOut(req, res) {
  try {
    const sessionID = req.cookies.sessionID;
    // console.error(req.cookies);
    // console.error(req.cookies.sessionID);
    // console.error(req.headers);
    // console.error(req.cookies);
    await redis.del(`sessionId-${sessionID}`);
    return res.status(200).json({
      message: "User logout successfully",
    });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export default { signIn, signOut };
