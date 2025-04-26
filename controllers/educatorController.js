export const updateRoleToEducator = async (req, res) => {
  try {
    const userData = req.body;

    console.log("Received user data:", userData);

    res.status(200).send("Received Data");
  } catch (error) {
    console.error("Error in updateRoleToEducator:", error);
    res.status(500).send("Internal Server Error");
  }
};
