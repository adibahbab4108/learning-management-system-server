import User from "../models/user.model";

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, photoURL, creationTime } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    //METHOD 1
    const newUser = new User({
      firstName,
      lastName,
      email,
      photoURL,
      creationTime,
    });
    await newUser.save();

    //METHOD 2
    // const NewUser = {
    //   firstName,
    //   lastName,
    //   email,
    //   photoURL,
    //   creationTime,
    // };
    // await User.create(NewUser);

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while registering user." });
  }
};
