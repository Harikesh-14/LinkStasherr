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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const custom_link_1 = __importDefault(require("../models/custom-link"));
const router = (0, express_1.Router)();
const secret = process.env.JWT_SECRET;
router.use((0, cookie_parser_1.default)());
// add a new custom link
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.status(401).json({ message: 'Token not found' });
            return;
        }
        jsonwebtoken_1.default.verify(token, secret, {}, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }
            const { url, modifiedUrl } = req.body;
            if (!url || !modifiedUrl) {
                res.status(400).json({ message: 'Please enter both original and custom URL' });
                return;
            }
            const info = decoded;
            const newCustomLink = yield custom_link_1.default.create({
                url,
                modifiedUrl,
                user: info.id,
            });
            res.status(201).json(newCustomLink);
        }));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
}));
// get all custom links by user id
router.get('/get-all/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const customLinks = yield custom_link_1.default.find({ user: userId });
        res.status(200).json(customLinks);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}));
// get a original link by custom link
router.get('/get/:customLink', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customLink } = req.params;
    try {
        const originalLink = yield custom_link_1.default.findOne({ modifiedUrl: customLink });
        if (!originalLink) {
            res.status(404).json({ message: 'Link not found' });
            return;
        }
        res.status(200).json(originalLink);
        // Update the click count
        yield custom_link_1.default.findByIdAndUpdate(originalLink._id, { click: originalLink.click + 1 });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}));
// delete a custom link by id
router.delete('/delete/:linkId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { linkId } = req.params;
        // Optionally, verify user ownership of the link
        const deletedLink = yield custom_link_1.default.findByIdAndDelete(linkId);
        if (!deletedLink) {
            res.status(404).json({ message: 'Link not found' });
            return;
        }
        res.status(200).json({ message: 'Link deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}));
exports.default = router;
