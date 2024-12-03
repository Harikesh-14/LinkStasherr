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
const links_1 = __importDefault(require("../models/links"));
const router = (0, express_1.Router)();
// add a new link
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url, modifiedUrl } = req.body;
        const newLink = yield links_1.default.create({
            url,
            modifiedUrl
        });
        res.status(201).json(newLink);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}));
// get url by modifiedUrl
router.get('/get/:link', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const link = yield links_1.default.findOne({ modifiedUrl: req.params.link });
        if (!link) {
            res.status(404).json({ message: 'Link not found' });
            return;
        }
        res.status(200).json(link);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}));
exports.default = router;
