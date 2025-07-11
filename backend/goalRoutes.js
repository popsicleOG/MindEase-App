const express = require("express");
const router = express.Router();
const { Goal } = require("./models");
const { authenticateToken } = require("./authMiddleware");

// Apply authentication middleware to all goal routes
router.use(authenticateToken);

// Get all goals for a user
router.get("/", async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ goals });
  } catch (error) {
    console.error("Error fetching goals:", error);
    res.status(500).json({ error: "Failed to fetch goals" });
  }
});

// Create a new goal with suggestions
router.post("/", async (req, res) => {
  try {
    const { goal } = req.body;

    if (!goal) {
      return res.status(400).json({ error: "Goal is required" });
    }

    const goalLower = goal.toLowerCase();
    let suggestions = {
      exercise: "",
      appAction: "",
      message: "",
    };

    // AI-like suggestions based on goal keywords
    if (goalLower.includes("stress") || goalLower.includes("anxiety")) {
      suggestions.exercise =
        "Try a 5-minute breathing exercise: Inhale for 4 counts, hold for 4, exhale for 6. Repeat 10 times.";
      suggestions.appAction =
        "Log your mood to track stress patterns and identify triggers.";
      suggestions.message =
        "Stress management is a journey. Start with small, consistent practices.";
    } else if (goalLower.includes("sleep") || goalLower.includes("insomnia")) {
      suggestions.exercise =
        "Progressive muscle relaxation: Tense each muscle group for 5 seconds, then relax completely.";
      suggestions.appAction =
        "Use the mindfulness tab for guided meditation before bed.";
      suggestions.message = "Good sleep hygiene starts with a calm mind.";
    } else if (goalLower.includes("depression") || goalLower.includes("sad")) {
      suggestions.exercise =
        "Take a 10-minute walk outside. Focus on 3 things you can see, hear, and feel.";
      suggestions.appAction =
        "Check your mood history to see patterns and celebrate small wins.";
      suggestions.message =
        "Every step forward, no matter how small, is progress.";
    } else if (
      goalLower.includes("focus") ||
      goalLower.includes("concentration")
    ) {
      suggestions.exercise =
        "Mindful observation: Pick an object and study it for 2 minutes, noticing every detail.";
      suggestions.appAction =
        "Set a daily mindfulness goal in your profile and track your progress.";
      suggestions.message =
        "Focus is like a muscle - it gets stronger with practice.";
    } else if (
      goalLower.includes("confidence") ||
      goalLower.includes("self-esteem")
    ) {
      suggestions.exercise =
        "Write down 3 things you did well today, no matter how small.";
      suggestions.appAction =
        "Use the community tab to connect with others on similar journeys.";
      suggestions.message = "You are capable of more than you know.";
    } else {
      suggestions.exercise =
        "Start with a simple 3-minute meditation: Sit comfortably and focus on your breath.";
      suggestions.appAction =
        "Log your mood daily to build awareness of your emotional patterns.";
      suggestions.message =
        "Every goal starts with a single step. You've got this!";
    }

    // Extract tags from goal
    const tags = [];
    if (goalLower.includes("stress") || goalLower.includes("anxiety"))
      tags.push("stress");
    if (goalLower.includes("sleep") || goalLower.includes("insomnia"))
      tags.push("sleep");
    if (goalLower.includes("depression") || goalLower.includes("sad"))
      tags.push("depression");
    if (goalLower.includes("focus") || goalLower.includes("concentration"))
      tags.push("focus");
    if (goalLower.includes("confidence") || goalLower.includes("self-esteem"))
      tags.push("confidence");

    const newGoal = new Goal({
      userId: req.user.userId,
      goal,
      suggestions,
      tags,
    });

    await newGoal.save();

    console.log(`📝 New goal created: ${goal} for user ${req.user.userId}`);
    res.status(201).json({ goal: newGoal });
  } catch (error) {
    console.error("Error creating goal:", error);
    res.status(500).json({ error: "Failed to create goal" });
  }
});

// Update goal feedback
router.put("/:goalId/feedback", async (req, res) => {
  try {
    const { goalId } = req.params;
    const { exerciseRating, appActionRating, overallHelpful, notes } = req.body;

    const goal = await Goal.findOne({ _id: goalId, userId: req.user.userId });

    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    // Update feedback
    if (exerciseRating !== undefined)
      goal.feedback.exerciseRating = exerciseRating;
    if (appActionRating !== undefined)
      goal.feedback.appActionRating = appActionRating;
    if (overallHelpful !== undefined)
      goal.feedback.overallHelpful = overallHelpful;
    if (notes !== undefined) goal.feedback.notes = notes;

    await goal.save();

    console.log(`👍 Goal feedback updated for goal ${goalId}`);
    res.json({ goal });
  } catch (error) {
    console.error("Error updating goal feedback:", error);
    res.status(500).json({ error: "Failed to update feedback" });
  }
});

// Mark goal as completed
router.put("/:goalId/complete", async (req, res) => {
  try {
    const { goalId } = req.params;
    const { completed } = req.body;

    const goal = await Goal.findOne({ _id: goalId, userId: req.user.userId });

    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    goal.completed = completed;
    goal.completedAt = completed ? new Date() : null;

    await goal.save();

    console.log(
      `✅ Goal ${completed ? "completed" : "uncompleted"}: ${goalId}`,
    );
    res.json({ goal });
  } catch (error) {
    console.error("Error updating goal completion:", error);
    res.status(500).json({ error: "Failed to update goal completion" });
  }
});

// Delete a goal
router.delete("/:goalId", async (req, res) => {
  try {
    const { goalId } = req.params;

    const goal = await Goal.findOneAndDelete({
      _id: goalId,
      userId: req.user.userId,
    });

    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    console.log(`🗑️ Goal deleted: ${goalId}`);
    res.json({ message: "Goal deleted successfully" });
  } catch (error) {
    console.error("Error deleting goal:", error);
    res.status(500).json({ error: "Failed to delete goal" });
  }
});

// Get goal statistics
router.get("/stats", async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.userId });

    const stats = {
      total: goals.length,
      completed: goals.filter((g) => g.completed).length,
      withFeedback: goals.filter((g) => g.feedback.overallHelpful !== null)
        .length,
      positiveFeedback: goals.filter((g) => g.feedback.overallHelpful === true)
        .length,
      tags: {},
    };

    // Count goals by tags
    goals.forEach((goal) => {
      goal.tags.forEach((tag) => {
        stats.tags[tag] = (stats.tags[tag] || 0) + 1;
      });
    });

    res.json({ stats });
  } catch (error) {
    console.error("Error fetching goal stats:", error);
    res.status(500).json({ error: "Failed to fetch goal statistics" });
  }
});

module.exports = router;
