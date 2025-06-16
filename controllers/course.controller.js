import Course from "../models/course.model.js";
import User from "../models/user.model.js";

//get all courses
export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.aggregate([
      { $match: { isPublished: true } },
      { $project: { courseContent: 0, enrolledStudents: 0 } },
      //issue: educator reference is needed to show along with course, work later
    ]);
    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Get Course by Id
export const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const courseData = await Course.findById(id).populate('educator');
    
    //Remove lectureUrl if isPreview is free
    courseData.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
        if (!lecture.isPreviewFree) {
          lecture.lectureUrl = "";
        }
      });
    });
    res.json({ success: true, courseData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
