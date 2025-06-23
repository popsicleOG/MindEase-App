const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { Mood } = require('./models');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { mood, journal } = req.body;
    const userId = req.user.userId;
    if (!mood || !journal) return res.status(400).json({ error: 'Mood and journal required' });
    const moodEntry = new Mood({ userId, mood, journal });
    await moodEntry.save();
    
    let insight = 'Keep logging to see trends!';
    if (journal && typeof journal === 'string' && journal.toLowerCase().includes('stress')) {
      insight = 'You mentioned stress. Try a breathing exercise.';
    }

    res.status(201).json({ message: 'Mood logged successfully', moodEntry, insight });
  } catch (error) {
    console.error('Error logging mood:', error);
    res.status(500).json({ error: 'Server error while logging mood' });
  }
});

router.get('/history', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { startDate, endDate } = req.query;
    const query = { userId };
    if (startDate && endDate) {
      query.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    const moodHistory = await Mood.find(query).sort({ timestamp: -1 }).limit(50);
    res.status(200).json({ message: 'Mood history retrieved successfully', history: moodHistory });
  } catch (error) {
    console.error('Error retrieving mood history:', error);
    res.status(500).json({ error: 'Server error while retrieving mood history' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const moodId = req.params.id;
    const moodEntry = await Mood.findOne({ _id: moodId, userId });
    if (!moodEntry) return res.status(404).json({ error: 'Mood entry not found or unauthorized' });
    await Mood.deleteOne({ _id: moodId });
    res.status(200).json({ message: 'Mood entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting mood entry:', error);
    res.status(500).json({ error: 'Server error while deleting mood entry' });
  }
});

module.exports = router; 