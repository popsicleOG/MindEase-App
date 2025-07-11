import { API_BASE_URL, API_TIMEOUT, ENDPOINTS, buildURL, getAuthHeaders } from '../src/config/api';

describe('API Configuration', () => {
  test('API_BASE_URL should be defined', () => {
    expect(API_BASE_URL).toBeDefined();
    expect(typeof API_BASE_URL).toBe('string');
  });

  test('API_TIMEOUT should be defined', () => {
    expect(API_TIMEOUT).toBeDefined();
    expect(typeof API_TIMEOUT).toBe('number');
  });

  test('ENDPOINTS should contain all required endpoints', () => {
    expect(ENDPOINTS.AUTH).toBe('/auth');
    expect(ENDPOINTS.REGISTER).toBe('/register');
    expect(ENDPOINTS.LOGIN).toBe('/login');
    expect(ENDPOINTS.USER_PROFILE).toBe('/user');
    expect(ENDPOINTS.HEALTH_CHECK).toBe('/health');
    expect(ENDPOINTS.MOOD_LOG).toBe('/mood');
    expect(ENDPOINTS.MOOD_HISTORY).toBe('/mood/history');
    expect(ENDPOINTS.GOALS).toBe('/goals');
    expect(ENDPOINTS.GOAL_STATS).toBe('/goals/stats');
  });

  test('buildURL should construct correct URLs', () => {
    const testEndpoint = '/test';
    const expectedURL = `${API_BASE_URL}${testEndpoint}`;
    expect(buildURL(testEndpoint)).toBe(expectedURL);
  });

  test('getAuthHeaders should return correct headers', () => {
    const testToken = 'test-token-123';
    const headers = getAuthHeaders(testToken);
    
    expect(headers).toEqual({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${testToken}`,
    });
  });

  test('ENDPOINTS with parameters should be functions', () => {
    expect(typeof ENDPOINTS.MOOD_DELETE).toBe('function');
    expect(typeof ENDPOINTS.GOAL_FEEDBACK).toBe('function');
    expect(typeof ENDPOINTS.GOAL_COMPLETE).toBe('function');
    expect(typeof ENDPOINTS.GOAL_DELETE).toBe('function');
  });

  test('ENDPOINTS functions should return correct paths', () => {
    const testId = '123456';
    expect(ENDPOINTS.MOOD_DELETE(testId)).toBe(`/mood/${testId}`);
    expect(ENDPOINTS.GOAL_FEEDBACK(testId)).toBe(`/goals/${testId}/feedback`);
    expect(ENDPOINTS.GOAL_COMPLETE(testId)).toBe(`/goals/${testId}/complete`);
    expect(ENDPOINTS.GOAL_DELETE(testId)).toBe(`/goals/${testId}`);
  });
}); 