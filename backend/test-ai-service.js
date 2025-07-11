const aiService = require('./services/aiService');

async function testAIService() {
  console.log('🧪 Testing AI Service...\n');

  // Test 1: Text Analysis
  console.log('1️⃣ Testing Text Analysis:');
  const testTexts = [
    "I'm feeling really stressed about work deadlines and I can't sleep properly",
    "I'm so happy today! Had a great time with friends and feel confident",
    "I feel sad and hopeless, nothing seems to work out for me",
    "I'm anxious about the presentation tomorrow, my heart is racing",
    "I'm tired and exhausted, can't seem to get enough rest"
  ];

  testTexts.forEach((text, index) => {
    const analysis = aiService.analyzeText(text);
    console.log(`Text ${index + 1}: "${text.substring(0, 50)}..."`);
    console.log(`Analysis:`, analysis);
    console.log('');
  });

  // Test 2: Mood Pattern Analysis (mock data)
  console.log('2️⃣ Testing Mood Pattern Analysis:');
  const mockPatterns = await aiService.getUserMoodPatterns('test-user-id');
  console.log('Mock Patterns:', mockPatterns);
  console.log('');

  // Test 3: Personalized Suggestions
  console.log('3️⃣ Testing Personalized Suggestions:');
  const testGoals = [
    "I want to reduce my stress levels",
    "I need help with my sleep problems",
    "I'm feeling depressed and need support",
    "I want to build my confidence",
    "I'm anxious about everything"
  ];

  for (const goal of testGoals) {
    console.log(`Goal: "${goal}"`);
    const suggestions = await aiService.generatePersonalizedSuggestions('test-user-id', goal);
    console.log(`Primary Concern: ${suggestions.analysis.primaryConcern}`);
    console.log(`Exercise: ${suggestions.exercise}`);
    console.log(`App Action: ${suggestions.appAction}`);
    console.log(`Message: ${suggestions.message}`);
    console.log('');
  }

  // Test 4: Mood Insights
  console.log('4️⃣ Testing Mood Insights:');
  const testMoods = [
    { mood: '😣', journal: 'I feel overwhelmed with stress and can\'t sleep' },
    { mood: '😊', journal: 'Had a wonderful day with friends, feeling great!' },
    { mood: '😔', journal: 'I feel sad and hopeless about everything' },
    { mood: '😐', journal: 'Just feeling okay today, nothing special' }
  ];

  for (const testMood of testMoods) {
    const insight = await aiService.generateMoodInsight('test-user-id', testMood.mood, testMood.journal);
    console.log(`Mood: ${testMood.mood}, Journal: "${testMood.journal}"`);
    console.log(`Insight: ${insight}`);
    console.log('');
  }

  console.log('✅ AI Service tests completed!');
}

// Run the test
testAIService().catch(console.error); 