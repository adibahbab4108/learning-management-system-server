import Course from "../models/course.model.js";

//Add New Course
export const addCourse = async (req, res) => {
  try {
    const courseData  = req.body;
    console.log(courseData);
    // const educatorEmail = req.params;
    res.json({ success: true, message: "API kaj kortese" });
    // const parsedCourseData = await JSON.parse(courseData);
    // parsedCourseData.educator = educatorEmail;
    // const newCourse = await Course.create(parsedCourseData);
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
