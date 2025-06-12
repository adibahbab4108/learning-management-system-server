import Course from "../models/course.model.js";
import { Purchase } from "../models/Purchase.js";
import User from "../models/user.model.js";

//Add New Course
export const addCourse = async (req, res) => {
  try {
    const {
      courseTitle,
      descriptionHTML,
      courseThumbnail,
      coursePrice,
      discount,
      userEmail, // educator email or ID // replace with jwt leter
    } = req.body;

    // Create a new course instance.
    // We use this way if we need to
    // modify the fieldname
    const newCourse = new Course({
      courseTitle,
      courseDescription: descriptionHTML,
      courseThumbnail,
      coursePrice,
      discount,
      educator: userEmail,
    });

    // Save to DB
    const savedCourse = await newCourse.save();

    res.status(201).json({
      success: true,
      message: "Course Added Successfully",
      course: savedCourse,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getEducatorCourses = async (req, res) => {
  try {
    const { email } = req.user;
    const courses = await Course.find({ educator: email });
    res.json({ success: true, courses });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
export const educatorDashboardData = async (req, res) => {
  try {
    const { email } = req.query; // replace with jwt leter
    const courses = await Course.find({ educator: email });
    const totalCourses = courses.length;
    const courseIds = courses.map((course) => course._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    });

    const totalEarnings = purchases.reduce(
      (sum, purchase) => sum + purchase.amount,
      0
    );

    const enrolledStudentsData = [];

    for (const course of courses) {
      const students = await User.find(
        {
          _id: { $in: course.enrolledStudents },
        },
        { name: 1, imageUrl: 1 } //projection - return only name and imageUrl
      );
      students.forEach((student) => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student,
        });
      });
    }

    res.json({
      success: true,
      dashboardData: {
        totalEarnings,
        enrolledStudentsData,
        totalCourses,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//Get enrolled Students Data with Purchase Data
export const getEnrolledStudentsData = async (req, res) => {
  try {
    const { email } = req.user;
    const courses = await Course.find({ educator: email });
    const courseIds = courses.map((course) => course._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    })
      .populate("userId", "name imageUrl")
      .populate("courseId", "courseTitle");

    const enrolledStudents = purchases.map((purchase) => ({
      student: purchase.userId,
      courseTitle: purchase.courseId.courseTitle,
      purchase: purchase.createdAt,
    }));

    res.json({ success: true, enrolledStudents });
  } catch (error) {}
};
