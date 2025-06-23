const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('./models');
const router = express.Router();

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

// GET user profile
router.get('/', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        console.log('📥 GET profile - User data being returned:', {
            id: user._id,
            emergencyContact: user.emergencyContact,
            fullUser: user
        });
        
        res.status(200).json({ message: 'User profile retrieved successfully', user });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Server error while fetching profile' });
    }
});

// PUT update user profile
router.put('/', authenticateToken, async (req, res) => {
    try {
        const {
            name, age, gender, emergencyContact, timezone, language,
            privacySettings, notificationPreferences
        } = req.body;

        console.log('🔍 Profile update request received:');
        console.log('  - Name:', name);
        console.log('  - Age:', age);
        console.log('  - Gender:', gender);
        console.log('  - Emergency Contact:', emergencyContact);
        console.log('  - Timezone:', timezone);
        console.log('  - Language:', language);

        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (age !== undefined) updateData.age = age;
        if (gender !== undefined) updateData.gender = gender;
        if (emergencyContact !== undefined) updateData.emergencyContact = emergencyContact;
        if (timezone !== undefined) updateData.timezone = timezone;
        if (language !== undefined) updateData.language = language;
        if (privacySettings !== undefined) updateData.privacySettings = privacySettings;
        if (notificationPreferences !== undefined) updateData.notificationPreferences = notificationPreferences;

        console.log('📝 Update data to be saved:', updateData);

        const user = await User.findByIdAndUpdate(
            req.user.userId,
            updateData,
            { new: true, select: '-password' }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('✅ User updated successfully:', {
            id: user._id,
            emergencyContact: user.emergencyContact
        });

        // Double-check the saved data by fetching it again
        const savedUser = await User.findById(req.user.userId).select('-password');
        console.log('🔍 Double-checking saved user data:', {
            id: savedUser._id,
            emergencyContact: savedUser.emergencyContact,
            fullUser: savedUser
        });

        res.json({ message: 'Profile updated successfully', user: savedUser });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Server error while updating profile' });
    }
});

module.exports = router; 