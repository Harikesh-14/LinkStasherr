"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const linkSchema = new mongoose_1.Schema({
    url: {
        type: String,
        required: true
    },
    modifiedUrl: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
const linkModel = (0, mongoose_1.model)('link', linkSchema);
exports.default = linkModel;
