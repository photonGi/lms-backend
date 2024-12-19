import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // Create a new user object without sensitive fields
  const userWithoutSensitiveInfo = { ...user._doc };
  const fieldsToRemove = [
    "password",
    "enrolledCourses",
    "role",
    "updatedAt",
    "createdAt",
  ];

  fieldsToRemove.forEach((field) => {
    delete userWithoutSensitiveInfo[field];
  });

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message,
      user: userWithoutSensitiveInfo,
    });
};
