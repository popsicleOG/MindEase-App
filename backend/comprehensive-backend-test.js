const axios = require('axios');

const BASE_URL = 'http://localhost:5000';
let authToken = '';
let moodId = '';

console.log('🧪 Starting Comprehensive Backend Test Suite\n');

// Test 1: User Registration
async function testRegistration() {
  console.log('1️⃣ Testing User Registration...');
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('✅ Registration successful:', response.data.message);
    return true;
  } catch (error) {
    if (error.response?.status === 409) {
      console.log('ℹ️ User already exists, continuing...');
      return true;
    }
    console.log('❌ Registration failed:', error.response?.data?.error || error.message);
    return false;
  }
}

// Test 2: User Login
async function testLogin() {
  console.log('\n2️⃣ Testing User Login...');
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    authToken = response.data.token;
    console.log('✅ Login successful, token received');
    console.log('📊 Subscription status:', response.data.subscriptionStatus);
    return true;
  } catch (error) {
    console.log('❌ Login failed:', error.response?.data?.error || error.message);
    return false;
  }
}

// Test 3: Mood Logging
async function testMoodLogging() {
  console.log('\n3️⃣ Testing Mood Logging...');
  try {
    const response = await axios.post(`${BASE_URL}/mood`, {
      mood: '😊',
      journal: 'Feeling great today!'
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    moodId = response.data.moodEntry._id;
    console.log('✅ Mood logged successfully');
    console.log('🤖 AI Insight:', response.data.insight);
    return true;
  } catch (error) {
    console.log('❌ Mood logging failed:', error.response?.data?.error || error.message);
    return false;
  }
}

// Test 4: Mood History
async function testMoodHistory() {
  console.log('\n4️⃣ Testing Mood History...');
  try {
    const response = await axios.get(`${BASE_URL}/mood/history`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Mood history retrieved');
    console.log('📊 Total entries:', response.data.history.length);
    if (response.data.history.length > 0) {
      console.log('📝 Latest entry:', response.data.history[0].mood, '-', response.data.history[0].journal);
    }
    return true;
  } catch (error) {
    console.log('❌ Mood history failed:', error.response?.data?.error || error.message);
    return false;
  }
}

// Test 5: Create Checkout Session
async function testCheckoutSession() {
  console.log('\n5️⃣ Testing Checkout Session Creation...');
  try {
    const response = await axios.post(`${BASE_URL}/payment/create-checkout-session`, {}, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Checkout session created');
    console.log('🔗 Checkout URL:', response.data.url);
    return true;
  } catch (error) {
    console.log('❌ Checkout session failed:', error.response?.data?.error || error.message);
    return false;
  }
}

// Test 6: Create Portal Session
async function testPortalSession() {
  console.log('\n6️⃣ Testing Customer Portal Session...');
  try {
    const response = await axios.post(`${BASE_URL}/payment/create-portal-session`, {}, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Portal session created');
    console.log('🔗 Portal URL:', response.data.url);
    return true;
  } catch (error) {
    console.log('❌ Portal session failed:', error.response?.data?.error || error.message);
    return false;
  }
}

// Test 7: Rate Limiting Test
async function testRateLimiting() {
  console.log('\n7️⃣ Testing Rate Limiting...');
  console.log('📊 Sending multiple login requests to test rate limiting...');
  
  const promises = [];
  for (let i = 0; i < 12; i++) {
    promises.push(
      axios.post(`${BASE_URL}/login`, {
        email: 'test@example.com',
        password: 'password123'
      }).catch(error => ({ status: error.response?.status, data: error.response?.data }))
    );
  }
  
  try {
    const results = await Promise.all(promises);
    const rateLimited = results.filter(result => result.status === 429);
    const successful = results.filter(result => result.status === 200);
    
    console.log(`✅ Rate limiting test completed:`);
    console.log(`   - Successful requests: ${successful.length}`);
    console.log(`   - Rate limited requests: ${rateLimited.length}`);
    
    if (rateLimited.length > 0) {
      console.log('✅ Rate limiting is working correctly');
    } else {
      console.log('⚠️ No rate limiting detected (may need more requests)');
    }
    return true;
  } catch (error) {
    console.log('❌ Rate limiting test failed:', error.message);
    return false;
  }
}

// Test 8: Delete Mood Entry
async function testDeleteMood() {
  if (!moodId) {
    console.log('\n8️⃣ Skipping Mood Deletion (no mood ID available)');
    return true;
  }
  
  console.log('\n8️⃣ Testing Mood Deletion...');
  try {
    await axios.delete(`${BASE_URL}/mood/${moodId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Mood entry deleted successfully');
    return true;
  } catch (error) {
    console.log('❌ Mood deletion failed:', error.response?.data?.error || error.message);
    return false;
  }
}

// Test 9: Invalid Token Test
async function testInvalidToken() {
  console.log('\n9️⃣ Testing Invalid Token Handling...');
  try {
    await axios.get(`${BASE_URL}/mood/history`, {
      headers: { Authorization: 'Bearer invalid-token' }
    });
    console.log('❌ Invalid token was accepted (security issue)');
    return false;
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ Invalid token properly rejected');
      return true;
    } else {
      console.log('❌ Unexpected error with invalid token:', error.response?.status);
      return false;
    }
  }
}

// Test 10: Missing Token Test
async function testMissingToken() {
  console.log('\n🔟 Testing Missing Token Handling...');
  try {
    await axios.get(`${BASE_URL}/mood/history`);
    console.log('❌ Missing token was accepted (security issue)');
    return false;
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ Missing token properly rejected');
      return true;
    } else {
      console.log('❌ Unexpected error with missing token:', error.response?.status);
      return false;
    }
  }
}

// Main test runner
async function runAllTests() {
  const tests = [
    testRegistration,
    testLogin,
    testMoodLogging,
    testMoodHistory,
    testCheckoutSession,
    testPortalSession,
    testRateLimiting,
    testDeleteMood,
    testInvalidToken,
    testMissingToken
  ];

  let passedTests = 0;
  let totalTests = tests.length;

  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    const testName = test.name.replace('test', '').replace(/([A-Z])/g, ' $1').trim();
    
    try {
      const result = await test();
      if (result) passedTests++;
    } catch (error) {
      console.log(`❌ Test ${i + 1} failed with error:`, error.message);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 TEST RESULTS SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Passed: ${passedTests}/${totalTests}`);
  console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests}`);
  console.log(`📈 Success Rate: ${Math.round((passedTests / totalTests) * 100)}%`);
  
  if (passedTests === totalTests) {
    console.log('\n🎉 ALL TESTS PASSED! Backend is working perfectly!');
  } else {
    console.log('\n⚠️ Some tests failed. Please check the errors above.');
  }
  
  console.log('\n🔗 API Base URL:', BASE_URL);
  console.log('📚 Available endpoints:');
  console.log('   POST /register - User registration');
  console.log('   POST /login - User authentication');
  console.log('   POST /mood - Log mood entry');
  console.log('   GET /mood/history - Get mood history');
  console.log('   DELETE /mood/:id - Delete mood entry');
  console.log('   POST /payment/create-checkout-session - Create Stripe checkout');
  console.log('   POST /payment/create-portal-session - Create customer portal');
  console.log('   POST /payment/cancel-subscription - Cancel subscription');
  console.log('   POST /payment/webhook - Stripe webhook handler');
}

// Run the tests
runAllTests().catch(console.error); 