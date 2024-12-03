"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_1 = __importDefault(require("../models/user"));
const authenticate_1 = __importDefault(require("../middlewares/authenticate"));
const router = (0, express_1.Router)();
const salt = bcryptjs_1.default.genSaltSync(10);
const secret = process.env.JWT_SECRET;
router.use((0, cookie_parser_1.default)());
// add a new user
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    try {
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        const hashedPassword = bcryptjs_1.default.hashSync(password, salt);
        const newUser = yield user_1.default.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}));
// login
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const isExistingUser = yield user_1.default.findOne({ email });
        if (!isExistingUser) {
            res.status(400).json({ message: "User not found" });
            return;
        }
        const passOk = bcryptjs_1.default.compareSync(password, isExistingUser.password);
        if (!passOk) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const tokenPayload = {
            id: isExistingUser._id,
            firstName: isExistingUser.firstName,
            lastName: isExistingUser.lastName,
            email: isExistingUser.email,
            message: "User logged in successfully",
        };
        const token = jsonwebtoken_1.default.sign(tokenPayload, secret, {});
        res.cookie("token", token, { httpOnly: true, secure: true }).json(tokenPayload);
    }
    catch (err) {
        console.error('Internal server error:', err);
        res.status(500).json({ message: "Internal server error" });
    }
}));
// get user profile
router.get('/profile', authenticate_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    res.json(req.user);
}));
// to check if the user is logged in
router.get('/check-login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    if (!token) {
        res.status(401).json({
            authenticated: false,
            message: 'Unauthorized'
        });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        res.json({
            authenticated: true,
            user: decoded
        });
    }
    catch (error) {
        res.status(401).json({
            authenticated: false,
            message: 'Invalid or expired token'
        });
    }
}));
// update first name
router.put('/update/firstName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName } = req.body;
    const { token } = req.cookies;
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    jsonwebtoken_1.default.verify(token, secret, {}, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.error('JWT verification error:', err);
            return res.status(401).json({ error: 'Unauthorized' });
        }
        try {
            const info = decoded;
            const updatedUser = yield user_1.default.findByIdAndUpdate(info.id, { firstName }, { new: true });
            if (!updatedUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(updatedUser);
        }
        catch (error) {
            console.error('Internal server error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }));
}));
// update last name
router.put('/update/lastName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lastName } = req.body;
    const { token } = req.cookies;
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    jsonwebtoken_1.default.verify(token, secret, {}, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.error('JWT verification error:', err);
            return res.status(401).json({ error: 'Unauthorized' });
        }
        try {
            const info = decoded;
            const updatedUser = yield user_1.default.findByIdAndUpdate(info.id, { lastName }, { new: true });
            if (!updatedUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(updatedUser);
        }
        catch (error) {
            console.error('Internal server error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }));
}));
// update email
router.put('/update/email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const { token } = req.cookies;
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    jsonwebtoken_1.default.verify(token, secret, {}, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.error('JWT verification error:', err);
            return res.status(401).json({ error: 'Unauthorized' });
        }
        try {
            const info = decoded;
            const updatedUser = yield user_1.default.findByIdAndUpdate(info.id, { email }, { new: true });
            if (!updatedUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(updatedUser);
        }
        catch (error) {
            console.error('Internal server error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }));
}));
// update password
router.put('/update/password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { currentPassword, newPassword } = req.body;
    const { token } = req.cookies;
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    jsonwebtoken_1.default.verify(token, secret, {}, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.error('JWT verification error:', err);
            return res.status(401).json({ error: 'Unauthorized' });
        }
        try {
            const info = decoded;
            const user = yield user_1.default.findById(info.id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            const passOk = bcryptjs_1.default.compareSync(currentPassword, user.password);
            if (!passOk) {
                res.status(400).json({ message: 'Invalid credentials' });
                return;
            }
            const hashedPassword = bcryptjs_1.default.hashSync(newPassword, salt);
            const updatedUser = yield user_1.default.findByIdAndUpdate(info.id, { password: hashedPassword }, { new: true });
            res.json(updatedUser);
        }
        catch (error) {
            console.error('Internal server error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }));
}));
// logout
router.post('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('token').json({ message: 'User logged out successfully' });
}));
exports.default = router;
