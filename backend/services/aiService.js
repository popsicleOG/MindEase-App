const { Mood, Goal } = require('../models');

class AIService {
  constructor() {
    // Define mood categories and their characteristics
    this.moodCategories = {
      '😊': { category: 'happy', energy: 'high', valence: 'positive' },
      '🙂': { category: 'content', energy: 'medium', valence: 'positive' },
      '😐': { category: 'neutral', energy: 'medium', valence: 'neutral' },
      '😔': { category: 'sad', energy: 'low', valence: 'negative' },
      '😣': { category: 'distressed', energy: 'low', valence: 'negative' }
    };

    // Define suggestion templates based on patterns
    this.suggestionTemplates = {
      stress: {
        exercise: [
          "Try a 4-7-8 breathing exercise: Inhale for 4, hold for 7, exhale for 8. Repeat 5 times.",
          "Progressive muscle relaxation: Tense each muscle group for 5 seconds, then relax completely.",
          "Take a 10-minute walk outside and focus on 3 things you can see, hear, and feel.",
          "Practice box breathing: Inhale 4, hold 4, exhale 4, hold 4. Repeat for 5 minutes."
        ],
        appAction: [
          "Log your mood to track stress patterns and identify triggers.",
          "Use the mindfulness tab for a 5-minute guided meditation.",
          "Check your mood history to see what helps you feel better.",
          "Set a daily mindfulness goal in your profile."
        ],
        message: [
          "Stress is temporary. You're doing great by taking steps to manage it.",
          "Remember, it's okay to take breaks. Your mental health matters.",
          "You're building resilience with each mindful moment.",
          "Small steps lead to big changes. Keep going!"
        ]
      },
      sleep: {
        exercise: [
          "Try a body scan meditation: Focus on each part of your body from toes to head.",
          "Practice 4-7-8 breathing: Inhale 4, hold 7, exhale 8. Repeat 10 times.",
          "Write down 3 things you're grateful for before bed.",
          "Create a calming bedtime routine with dim lighting and quiet activities."
        ],
        appAction: [
          "Use the mindfulness tab for sleep-focused meditation.",
          "Log your mood to track sleep patterns and triggers.",
          "Set a consistent bedtime reminder in your profile.",
          "Review your mood history to identify sleep-affecting factors."
        ],
        message: [
          "Good sleep is a foundation for mental health. You're taking important steps.",
          "Your body and mind need rest. You deserve peaceful sleep.",
          "Building healthy sleep habits takes time. Be patient with yourself.",
          "Quality sleep will help you feel better tomorrow."
        ]
      },
      depression: {
        exercise: [
          "Start with a simple 3-minute meditation focusing on your breath.",
          "Take a short walk outside, even just around the block.",
          "Write down one small thing you can accomplish today.",
          "Practice self-compassion: Treat yourself like you would a good friend."
        ],
        appAction: [
          "Log your mood daily to build awareness of your emotional patterns.",
          "Use the community tab to connect with others on similar journeys.",
          "Check your mood history to celebrate small improvements.",
          "Set achievable daily goals in your profile."
        ],
        message: [
          "Every step forward, no matter how small, is progress.",
          "You're not alone in this journey. Reach out when you need support.",
          "Depression lies. You are stronger than you think.",
          "It's okay to not be okay. Healing takes time."
        ]
      },
      anxiety: {
        exercise: [
          "Ground yourself with the 5-4-3-2-1 technique: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.",
          "Try square breathing: Inhale 4, hold 4, exhale 4, hold 4.",
          "Focus on your senses: What do you see, hear, feel right now?",
          "Practice the butterfly hug: Cross your arms and tap your shoulders alternately."
        ],
        appAction: [
          "Log your mood to identify anxiety triggers and patterns.",
          "Use the mindfulness tab for anxiety-specific exercises.",
          "Track your anxiety levels throughout the day.",
          "Review your mood history to see what helps calm you."
        ],
        message: [
          "Anxiety is temporary. This feeling will pass.",
          "You're safe right now. Focus on your breath.",
          "It's okay to feel anxious. You're handling it well.",
          "You have the tools to manage this. Trust yourself."
        ]
      },
      confidence: {
        exercise: [
          "Write down 3 things you did well today, no matter how small.",
          "Practice power poses: Stand tall with hands on hips for 2 minutes.",
          "Create a list of your strengths and achievements.",
          "Practice positive self-talk: Replace negative thoughts with kind ones."
        ],
        appAction: [
          "Use the community tab to connect with others on similar journeys.",
          "Log your mood to track confidence patterns.",
          "Set small, achievable goals and celebrate each win.",
          "Review your mood history to see your progress."
        ],
        message: [
          "You are capable of more than you know.",
          "Confidence grows with practice. You're building it every day.",
          "Your worth isn't determined by your mood. You matter.",
          "You have unique strengths. Celebrate them!"
        ]
      }
    };
  }

  // Analyze text content for emotional patterns
  analyzeText(text) {
    const lowerText = text.toLowerCase();
    const analysis = {
      stress: 0,
      sleep: 0,
      depression: 0,
      anxiety: 0,
      confidence: 0,
      positive: 0,
      negative: 0,
      social: 0,
      work: 0,
      health: 0
    };

    // Stress indicators
    if (lowerText.includes('stress') || lowerText.includes('overwhelm') || lowerText.includes('pressure')) {
      analysis.stress += 2;
    }
    if (lowerText.includes('busy') || lowerText.includes('rushed') || lowerText.includes('deadline')) {
      analysis.stress += 1;
    }

    // Sleep indicators
    if (lowerText.includes('sleep') || lowerText.includes('tired') || lowerText.includes('exhausted')) {
      analysis.sleep += 2;
    }
    if (lowerText.includes('insomnia') || lowerText.includes('restless') || lowerText.includes('awake')) {
      analysis.sleep += 2;
    }

    // Depression indicators
    if (lowerText.includes('sad') || lowerText.includes('depressed') || lowerText.includes('hopeless')) {
      analysis.depression += 2;
    }
    if (lowerText.includes('worthless') || lowerText.includes('useless') || lowerText.includes('failure')) {
      analysis.depression += 2;
    }

    // Anxiety indicators
    if (lowerText.includes('anxiety') || lowerText.includes('worried') || lowerText.includes('nervous') || lowerText.includes('anxious')) {
      analysis.anxiety += 2;
    }
    if (lowerText.includes('panic') || lowerText.includes('fear') || lowerText.includes('scared')) {
      analysis.anxiety += 2;
    }

    // Confidence indicators
    if (lowerText.includes('confident') || lowerText.includes('proud') || lowerText.includes('achievement')) {
      analysis.confidence += 2;
    }
    if (lowerText.includes('doubt') || lowerText.includes('insecure') || lowerText.includes('uncertain')) {
      analysis.confidence -= 1;
    }

    // Positive/negative sentiment
    const positiveWords = ['happy', 'good', 'great', 'excellent', 'wonderful', 'amazing', 'love', 'joy', 'excited'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'angry', 'frustrated', 'disappointed', 'upset'];

    positiveWords.forEach(word => {
      if (lowerText.includes(word)) analysis.positive += 1;
    });

    negativeWords.forEach(word => {
      if (lowerText.includes(word)) analysis.negative += 1;
    });

    // Social indicators
    if (lowerText.includes('friend') || lowerText.includes('family') || lowerText.includes('social')) {
      analysis.social += 1;
    }

    // Work indicators
    if (lowerText.includes('work') || lowerText.includes('job') || lowerText.includes('career')) {
      analysis.work += 1;
    }

    // Health indicators
    if (lowerText.includes('health') || lowerText.includes('sick') || lowerText.includes('pain')) {
      analysis.health += 1;
    }

    return analysis;
  }

  // Get user's mood history for pattern analysis
  async getUserMoodPatterns(userId, limit = 10) {
    try {
      const recentMoods = await Mood.find({ userId })
        .sort({ createdAt: -1 })
        .limit(limit);

      const patterns = {
        moodTrend: 'stable',
        commonMoods: {},
        stressLevel: 'low',
        sleepIssues: false,
        socialActivity: 'moderate'
      };

      if (recentMoods.length === 0) {
        return patterns;
      }

      // Analyze mood trends
      const moodValues = recentMoods.map(mood => {
        const moodData = this.moodCategories[mood.mood];
        return moodData ? moodData.valence : 'neutral';
      });

      const positiveCount = moodValues.filter(v => v === 'positive').length;
      const negativeCount = moodValues.filter(v => v === 'negative').length;

      if (negativeCount > positiveCount * 1.5) {
        patterns.moodTrend = 'declining';
      } else if (positiveCount > negativeCount * 1.5) {
        patterns.moodTrend = 'improving';
      }

      // Count common moods
      recentMoods.forEach(mood => {
        patterns.commonMoods[mood.mood] = (patterns.commonMoods[mood.mood] || 0) + 1;
      });

      // Analyze for stress and sleep patterns
      const textAnalysis = recentMoods.map(mood => this.analyzeText(mood.journal));
      const avgStress = textAnalysis.reduce((sum, analysis) => sum + analysis.stress, 0) / textAnalysis.length;
      const avgSleep = textAnalysis.reduce((sum, analysis) => sum + analysis.sleep, 0) / textAnalysis.length;

      if (avgStress > 1.5) patterns.stressLevel = 'high';
      else if (avgStress > 0.5) patterns.stressLevel = 'moderate';

      if (avgSleep > 1) patterns.sleepIssues = true;

      return patterns;
    } catch (error) {
      console.error('Error analyzing mood patterns:', error);
      return { moodTrend: 'stable', commonMoods: {}, stressLevel: 'low', sleepIssues: false, socialActivity: 'moderate' };
    }
  }

  // Generate personalized suggestions based on analysis
  async generatePersonalizedSuggestions(userId, goalText, moodEntry = null) {
    try {
      // Analyze the goal text
      const goalAnalysis = this.analyzeText(goalText);
      
      // Get user's mood patterns
      const patterns = await this.getUserMoodPatterns(userId);
      
      // Determine primary concern
      const concerns = [
        { type: 'stress', score: goalAnalysis.stress },
        { type: 'sleep', score: goalAnalysis.sleep },
        { type: 'depression', score: goalAnalysis.depression },
        { type: 'anxiety', score: goalAnalysis.anxiety },
        { type: 'confidence', score: goalAnalysis.confidence }
      ];

      concerns.sort((a, b) => b.score - a.score);
      const primaryConcern = concerns[0].type;

      // Get templates for the primary concern
      const templates = this.suggestionTemplates[primaryConcern];
      if (!templates) {
        // Fallback to general templates
        return this.getGeneralSuggestions(patterns);
      }

      // Personalize based on patterns
      let exerciseIndex = 0;
      let appActionIndex = 0;
      let messageIndex = 0;

      // Adjust suggestions based on mood trends
      if (patterns.moodTrend === 'declining') {
        messageIndex = 1; // More encouraging message
      } else if (patterns.moodTrend === 'improving') {
        messageIndex = 0; // Celebratory message
      }

      // Adjust for stress level
      if (patterns.stressLevel === 'high') {
        exerciseIndex = 1; // More intensive stress relief
      }

      // Adjust for sleep issues
      if (patterns.sleepIssues) {
        appActionIndex = 1; // Sleep-focused app action
      }

      // Ensure indices are within bounds
      exerciseIndex = exerciseIndex % templates.exercise.length;
      appActionIndex = appActionIndex % templates.appAction.length;
      messageIndex = messageIndex % templates.message.length;

      return {
        exercise: templates.exercise[exerciseIndex],
        appAction: templates.appAction[appActionIndex],
        message: templates.message[messageIndex],
        analysis: {
          primaryConcern,
          patterns,
          goalAnalysis
        }
      };
    } catch (error) {
      console.error('Error generating personalized suggestions:', error);
      return this.getGeneralSuggestions();
    }
  }

  // Generate mood insights based on entry
  async generateMoodInsight(userId, mood, journal) {
    try {
      const analysis = this.analyzeText(journal);
      const patterns = await this.getUserMoodPatterns(userId);
      
      let insight = "Keep logging to see trends!";

      // Generate insights based on analysis
      if (analysis.stress > 1) {
        insight = "I notice you're feeling stressed. Remember to take breaks and practice self-care. Consider trying a quick breathing exercise.";
      } else if (analysis.sleep > 1) {
        insight = "Sleep is crucial for mental health. Try establishing a calming bedtime routine and avoid screens before bed.";
      } else if (analysis.depression > 1) {
        insight = "It's okay to not be okay. Consider reaching out to someone you trust, and remember that this feeling is temporary.";
      } else if (analysis.anxiety > 1) {
        insight = "Anxiety can be overwhelming. Try grounding yourself by focusing on your senses - what can you see, hear, and feel right now?";
      } else if (analysis.positive > analysis.negative) {
        insight = "Great to see you're feeling positive! Keep up the good work and remember to celebrate these moments.";
      } else if (patterns.moodTrend === 'declining') {
        insight = "I've noticed your mood has been challenging lately. Remember, it's okay to ask for help. You're not alone in this.";
      } else if (patterns.moodTrend === 'improving') {
        insight = "I can see your mood is improving! Keep up the great work with your mental health practices.";
      }

      return insight;
    } catch (error) {
      console.error('Error generating mood insight:', error);
      return "Keep logging to see trends!";
    }
  }

  // Get general suggestions as fallback
  getGeneralSuggestions(patterns = {}) {
    return {
      exercise: "Start with a simple 3-minute meditation: Sit comfortably and focus on your breath.",
      appAction: "Log your mood daily to build awareness of your emotional patterns.",
      message: "Every goal starts with a single step. You've got this!",
      analysis: {
        primaryConcern: 'general',
        patterns,
        goalAnalysis: {}
      }
    };
  }
}

module.exports = new AIService(); 