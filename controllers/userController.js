export const registerUser = async (req, res) => {
  try {
    const { name, email, photoURL, creationTime, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const newUser = new User({
      name,
      email,
      photoURL,
      creationTime,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while registering user." });
  }
};
