const express = require("express");
const router = express.Router();
const { Goal } = require("./models");
const { authenticateToken } = require("./authMiddleware");
const aiService = require("./services/aiService");

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

// Create a new goal with AI-powered personalized suggestions
router.post("/", async (req, res) => {
  try {
    const { goal } = req.body;

    if (!goal) {
      return res.status(400).json({ error: "Goal is required" });
    }

    // Generate personalized suggestions using AI service
    const suggestions = await aiService.generatePersonalizedSuggestions(
      req.user.userId,
      goal
    );

    // Extract tags from goal analysis
    const tags = [];
    const analysis = suggestions.analysis.goalAnalysis;
    
    if (analysis.stress > 0) tags.push("stress");
    if (analysis.sleep > 0) tags.push("sleep");
    if (analysis.depression > 0) tags.push("depression");
    if (analysis.anxiety > 0) tags.push("anxiety");
    if (analysis.confidence > 0) tags.push("confidence");

    const newGoal = new Goal({
      userId: req.user.userId,
      goal,
      suggestions: {
        exercise: suggestions.exercise,
        appAction: suggestions.appAction,
        message: suggestions.message
      },
      tags,
    });

    await newGoal.save();

    console.log(`📝 New AI-powered goal created: ${goal} for user ${req.user.userId}`);
    console.log(`🤖 AI Analysis: Primary concern - ${suggestions.analysis.primaryConcern}`);
    
    res.status(201).json({ 
      goal: newGoal,
      aiAnalysis: suggestions.analysis
    });
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
