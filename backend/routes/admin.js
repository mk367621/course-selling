import { Router } from "express";
const adminRoute = Router();
import { adminModel, courseModel } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ADMIN_JWT } from "../config.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

adminRoute.post("/signup", async function (req, res) {
  const { email, password } = req.body;

  try {
    const existingAdmin = await adminModel.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await adminModel.create({
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "Signup successful!",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

adminRoute.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const admin = await adminModel.findOne({ email });

  if (!admin) {
    return res.status(403).json({
      message: "Invalid credentials",
    });
  }

  const passwordMatch = await bcrypt.compare(password, admin.password);

  if (!passwordMatch) {
    return res.status(403).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign({ id: admin._id }, ADMIN_JWT);

  res.json({
    message: "Login successful",
    token,
  });
});

adminRoute.post("/course", adminMiddleware, async function (req, res) {
  const { title, price } = req.body;
  try {
    const course = await courseModel.create({
      title,
      price,
      creatorId: req.adminId,
    });
    return res.status(200).json({
      message: "Course created successfully...",
      courseid: course._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create course",
    });
  }
});

adminRoute.get("/course/bulk", adminMiddleware, async function (req, res) {
  try {
    const course = await courseModel.find({
      creatorId: req.adminId,
    });

    return res.status(200).json({
      course,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "failed to fetch courses",
    });
  }
});

adminRoute.get("/course/:id", adminMiddleware, async function (req, res) {
  try {
    const course = await courseModel.findOne({
      _id: req.params.id,
      creatorId: req.adminId,
    });
    if (!course) {
      return res.json({
        message: " COurse not found!!!",
      });
    }
    return res.status(200).json({
      course,
    });
  } catch (error) {
    return res.status(500).json({
      err: error.message,
    });
  }
});

adminRoute.put(
  "/update-course/:id",
  adminMiddleware,
  async function (req, res) {
    const { title, price } = req.body;
    try {
      const updatedCourse = await courseModel.findOneAndUpdate(
        {
          _id: req.params.id,
          creatorId: req.adminId,
        },
        {
          title,
          price,
        },
        {
          new: true,
        },
      );
      if (!updatedCourse) {
        return res.status(404).json({
          message: "Course not found",
        });
      }

      return res.json({
        message: "Course updated successfully",
        course: updatedCourse,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
);

adminRoute.delete("/course/:id", adminMiddleware, async function (req, res) {
  try {
    const deleteCourse = await courseModel.findOneAndDelete({
      _id: req.params.id,
      creatorId: req.adminId,
    });
    if (!deleteCourse) {
      return res.status(400).json({
        message: "there is no such course...",
      });
    }
    return res.status(200).json({
      message: "Course deleted successfully",
      deleted_course: deleteCourse,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

export default adminRoute;
