import Course from "../models/course.model";

//Add New Course
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;
    const educatorId = "x";
    if (!imageFile) {
      return res.json({ success: false, message: "Thumbnail Not Attached" });
    }
    const parsedCourseData = await JSON.parse(courseData);
    parsedCourseData.educator = educatorId;
    const newCourse = await Course.create(parsedCourseData);
  } catch (error) {}
};
