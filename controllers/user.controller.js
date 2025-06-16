import Stripe from "stripe";
import User from "../models/user.model.js";
import { Purchase } from "../models/purchase.model.js";
import Course from "../models/course.model.js";
import { courseProgres } from "../models/courseProgress.model.js";

export const createUser = async (req, res) => {
  const { uid, name, email, picture } = req.user;

  res.cookie("token", req.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000, //need to login again after 1 day
  });
  
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        success: true,
        message: "user already exists. continue with previous data ",
      });
    }

    const NewUser = {
      _id: uid,
      name,
      email,
      imageUrl: picture,
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
export const updateRoleToEducator = async (req, res) => {
  try {
    const { email } = req.user;
    const { role } = req.body;

    console.log(email, role);

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { role },
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

    res.status(200).json({ success: true, userDetails });
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

//Update User Course Progress
export const updateUserCourseProgress = async (req, res) => {
  try {
    const { uid } = req.user;
    const { courseId, lectureId } = req.body;
    const progressData = await courseProgres.findOne({ uid, courseId });

    if (progressData) {
      if (progressData.lectureCompleted.includes(lectureId)) {
        return res.json({
          success: true,
          message: "Lecture already completed",
        });
      }
      progressData.lectureCompleted.push(lectureId);
      await progressData.save();
    } else {
      await courseProgres.create({
        userId: uid,
        courseId,
        lectureCompleted: [lectureId],
      });
    }
    res.json({ success: true, message: "Progress Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getUserCourseProgress = async (req, res) => {
  try {
    const { uid } = req.user;
    const { courseId } = req.body;
    const progressData = await courseProgres.findOne({ uid, courseId });

    res.json({ success: true, progressData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const addUserRating = async (req, res) => {
  const { uid } = req.user;
  const { courseId, rating } = req.body;

  if (!courseId || !uid || !rating || rating < 1 || rating > 5)
    return res.json({ success: false, message: "Invalid Details" });

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.json({ success: false, message: "Course not found" });
    }

    const user = await User.findById(uid);
    if (!user || !user.enrolledCourses.includes(courseId)) {
      return res.json({
        success: false,
        message: "User has not purchased this course.",
      });
    }

    const existingRatingIndex = course.courseRatings.findIndex(
      (r) => r.userId === uid
    );

    if (existingRatingIndex > -1)
      course.courseRatings[existingRatingIndex].rating = rating;
    else course.courseRatings.push({ uid, rating });

    await course.save();

    return res.json({ success: true, message: "Rating added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
