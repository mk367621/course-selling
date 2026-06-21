import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
  email: { type: String, unique: true }, // Make email unique to avoid duplicate entries
  password: String,
});

// Define the Admin schema with email, password, firstName, and lastName fields
const adminSchema = new Schema({
  email: { type: String, unique: true }, // Make email unique to avoid duplicate entries
  password: String,
});

// Define the Course schema with title, description, price, imageUrl, and creatorId fields
const courseSchema = new Schema({
  title: String,
  price: Number,

  creatorId: ObjectId,
});

// Define the Purchase schema with userId and courseId fields
const purchaseSchema = new Schema({
  userId: ObjectId,
  courseId: ObjectId,
});

// Create models for User, Admin, Course, and Purchase using the respective schemas
export const userModel = mongoose.model("user", userSchema);
export const adminModel = mongoose.model("admin", adminSchema);
export const courseModel = mongoose.model("course", courseSchema);
export const purchaseModel = mongoose.model("purchase", purchaseSchema);
