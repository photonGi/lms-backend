import { Course } from "../models/course.model.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        status: false,
        message: "Course title and category is required.",
      });
    }

    const course = await Course.create({
      courseTitle,
      category,
      create: req.id,
    });

    return res.status(201).json({
      status: true,
      message: "Course created successfully.",
      course,
    });
  } catch (error) {
    console.log("Course creation error:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to create course",
    });
  }
};
