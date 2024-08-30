const bcrypt = require('bcrypt');
const Admin = require('../models/adminSchema.js');
const Sclass = require('../models/sclassSchema.js');
const Student = require('../models/studentSchema.js');
const Teacher = require('../models/teacherSchema.js');
const Subject = require('../models/subjectSchema.js');
const Notice = require('../models/noticeSchema.js');
const Complain = require('../models/complainSchema.js');

// Admin Registration
const adminRegister = async (req, res) => {
    try {
        // Check if the email or school name already exists
        const existingAdminByEmail = await Admin.findOne({ email: req.body.email });
        const existingSchool = await Admin.findOne({ schoolName: req.body.schoolName });

        if (existingAdminByEmail) {
            return res.status(400).send({ message: 'Email already exists' });
        }
        if (existingSchool) {
            return res.status(400).send({ message: 'School name already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        // Create and save the new admin
        const admin = new Admin({ ...req.body, password: hashedPass });
        const result = await admin.save();
        result.password = undefined; // Remove password from the result
        res.status(201).send(result);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

// Admin Login
const adminLogIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate request
        if (!email || !password) {
            return res.status(400).send({ message: "Email and password are required" });
        }

        // Find the admin
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).send({ message: "User not found" });
        }

        // Validate password
        const validated = await bcrypt.compare(password, admin.password);
        if (!validated) {
            return res.status(401).send({ message: "Invalid password" });
        }

        admin.password = undefined; // Remove password from the result
        res.status(200).send(admin);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

// Get Admin Details
const getAdminDetail = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).send({ message: "No admin found" });
        }

        admin.password = undefined; // Remove password from the result
        res.status(200).send(admin);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

// Uncomment and refine as needed for future use
// const deleteAdmin = async (req, res) => {
//     try {
//         const result = await Admin.findByIdAndDelete(req.params.id);
//         await Sclass.deleteMany({ school: req.params.id });
//         await Student.deleteMany({ school: req.params.id });
//         await Teacher.deleteMany({ school: req.params.id });
//         await Subject.deleteMany({ school: req.params.id });
//         await Notice.deleteMany({ school: req.params.id });
//         await Complain.deleteMany({ school: req.params.id });
//         res.status(200).send(result);
//     } catch (err) {
//         res.status(500).json({ message: 'Internal Server Error', error: err.message });
//     }
// };

// const updateAdmin = async (req, res) => {
//     try {
//         if (req.body.password) {
//             const salt = await bcrypt.genSalt(10);
//             req.body.password = await bcrypt.hash(req.body.password, salt);
//         }
//         const result = await Admin.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
//         result.password = undefined;
//         res.status(200).send(result);
//     } catch (err) {
//         res.status(500).json({ message: 'Internal Server Error', error: err.message });
//     }
// };

module.exports = { adminRegister, adminLogIn, getAdminDetail /*, deleteAdmin, updateAdmin*/ };
