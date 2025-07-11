const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subscriptionStatus: { type: String, default: "free" },
    name: { type: String, default: "" },
    age: { type: Number, min: 1, max: 120 },
    gender: { type: String, default: "" },
    emergencyContact: {
      name: { type: String, default: "" },
      relationship: { type: String, default: "" },
      phone: { type: String, default: "" },
    },
    timezone: { type: String, default: "UTC" },
    language: { type: String, default: "en" },
    privacySettings: {
      shareAnonymousData: { type: Boolean, default: false },
    },
    notificationPreferences: {
      moodReminders: { type: Boolean, default: true },
      mindfulnessReminders: { type: Boolean, default: true },
      weeklyInsights: { type: Boolean, default: true },
    },
    stripeCustomerId: { type: String },
    stripeSubscriptionId: { type: String },
  },
  { timestamps: true },
);

// Mood Schema
const moodSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mood: { type: String, required: true },
    journal: { type: String, required: true },
    insight: { type: String, default: "" },
  },
  { timestamps: true },
);

// Goal Schema
const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    goal: { type: String, required: true },
    suggestions: {
      exercise: { type: String, required: true },
      appAction: { type: String, required: true },
      message: { type: String, required: true },
    },
    feedback: {
      exerciseRating: { type: Number, min: 0, max: 1 }, // 0 = thumbs down, 1 = thumbs up
      appActionRating: { type: Number, min: 0, max: 1 },
      overallHelpful: { type: Boolean, default: null }, // null = no feedback yet
      notes: { type: String, default: "" },
    },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date },
    tags: [{ type: String }], // For categorizing goals (stress, sleep, depression, etc.)
  },
  { timestamps: true },
);

// Export models
const User = mongoose.model("User", userSchema);
const Mood = mongoose.model("Mood", moodSchema);
const Goal = mongoose.model("Goal", goalSchema);

module.exports = { User, Mood, Goal };
