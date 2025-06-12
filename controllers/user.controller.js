import Stripe from "stripe";
import User from "../models/user.model.js";
import { Purchase } from "../models/Purchase.js";
import Course from "../models/course.model.js";

export const createUser = async (req, res) => {
  const { uid, name, email, picture } = req.user;
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
export const updateRoleToEducator = async (req, res) => {
  try {
    const { email } = req.params;

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
      message: error.message,
    });
  }
};
export const getUserDetails = async (req, res) => {
  try {
    const { email } = req.user;
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
export const userEnrolledCourses = async (req, res) => {
  try {
    const { uid } = req.user;
    const user = await User.findById(uid).populate("enrolledCourses");
    res.json({ success: true, enrolledCourses: user.enrolledCourses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//PURCHASE
export const purchaseCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const { origin } = req.headers;
    const { uid } = req.user;
    const userData = await User.findById(uid);
    const courseData = await Course.findById(courseId);

    if (!userData || !courseData)
      return res.json({ success: false, message: "Data Not Found" });
    const purchaseData = {
      courseId: courseData._id,
      userId: uid,
      amount: (
        courseData.coursePrice *
        (1 - courseData.discount / 100)
      ).toFixed(2),
    };
    const newPurchase = await Purchase.create(purchaseData);

    // Strpe gateway Initialize
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    const currency = process.env.CURRENCY.toLowerCase();

    //Creating line items for stripe
    const line_items = [
      {
        price_data: {
          currency,
          product_data: {
            name: courseData.courseTitle,
          },
          unit_amount: Math.floor(newPurchase.amount) * 100,
        },
        quantity: 1,
      },
    ];
    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/loading/my-enrollments`,
      cancel_url: `${origin}`,
      line_items: line_items,
      mode: "payment",
      metadata: {
        purchaseId: newPurchase._id.toString(),
      },
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
