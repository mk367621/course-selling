import { Router } from "express";
const userRoute = Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { USER_JWT } from "../config.js";
import { purchaseModel, userModel, courseModel } from "../db.js";
import { userMiddleware } from "../middleware/userMiddleware.js";

userRoute.post("/signup", async function (req, res) {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists...",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      email,
      password: hashPassword,
    });
    return res.status(200).json({
      message: "User created successfully...",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

userRoute.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found...",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status().json({
        message: "Invalid credentials..",
      });
    }
    const token = jwt.sign({ id: user._id }, USER_JWT);
    return res.status(200).json({
      message: "token generated successfully.",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

userRoute.post(
  "/purchase/:courseId",
  userMiddleware,
  async function (req, res) {
    const courseId = req.params.courseId;
    try {
      const course = await courseModel.findById(courseId);
      if (!course) {
        return res.status(400).json({
          message: "Course not found",
        });
      }
      const existingPurchase = await purchaseModel.findOne({
        userId: req.userId,
        courseId,
      });
      if (existingPurchase) {
        return res.status(400).json({
          message: "Course already purchased.",
        });
      }
      const purchase = await purchaseModel.create({
        userId: req.userId,
        courseId,
      });
      return res.status(201).json({
        message: "Course purchased successfully",
        purchase,
        course_purchased: course.title,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  },
);

userRoute.get("/purchases", userMiddleware, async function (req, res) {
  try {
    const purchases = await purchaseModel.find({
      userId: req.userId,
    });
    const courseIds = purchases.map((purchase) => purchase.courseId);
    const courses = await courseModel.find({
      _id: {
        $in: courseIds,
      },
    });

    // send purchased course details to the user
    return res.status(200).json({
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

export default userRoute;
