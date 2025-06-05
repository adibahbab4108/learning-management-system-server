import Course from "../models/course.model.js";

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
    // We use this way if we need to modify the fieldname
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
    const { email } = req.query; // replace with jwt leter
    const courses = await Course.find({ educator: email });
    res.json({ success: true, courses });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
