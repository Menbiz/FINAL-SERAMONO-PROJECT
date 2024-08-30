const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createAdmin, getAdmin } = require('../controllers/admin-controller.js');

// Route to create an admin
router.post('/create', async (req, res) => {
    const { username, password } = req.body;

    // Ensure that you only allow one admin creation or handle it as per your logic
    try {
        // Check if admin already exists
        const existingAdmin = await getAdmin(username);
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the admin
        await createAdmin({ username, password: hashedPassword });

        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating admin', error });
    }
});

module.exports = router;
