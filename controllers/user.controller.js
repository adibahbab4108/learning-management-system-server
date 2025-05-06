import User from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const { uid, fullName, email, photoURL, role, creationTime } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    //METHOD 2
    const NewUser = {
      _id: uid,
      name: fullName,
      email,
      imageUrl: photoURL,
      role,
      creationTime,
    };
    await User.create(NewUser);

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
export const updateRoleToEducator = (req, res) => {
  const { email } = req.params;
  res.json({status:true, message:"Updated to Educator!"})
};
