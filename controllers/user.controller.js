import User from "../models/user.model.js";

export const createUser = async (req, res) => {
  const { uid, name, email, picture } = req.user;
  console.log(name, email);
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });

    const NewUser = {
      _id: uid,
      name,
      email,
      imageUrl: picture,
    };

    if (!existingUser) {
      await User.create(NewUser);
    }

    res.cookie("token", req.token, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 1000,
    });

    res
      .status(201)
      .json({ success: true, message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while registering user.",
    });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const { email } = req.params;
    const userDetails = await User.findOne({ email });
    if (!userDetails) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: userDetails });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateRoleToEducator = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email);
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { role: "educator" },
      { new: true } // Returns the updated document
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "Updated to Educator!",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
