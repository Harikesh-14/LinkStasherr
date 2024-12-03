"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const customLinkSchema = new mongoose_1.Schema({
    url: {
        type: String,
        required: true,
    },
    modifiedUrl: {
        type: String,
        required: true,
    },
    click: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
    },
}, {
    timestamps: true,
});
const customLinkModel = (0, mongoose_1.model)('customLink', customLinkSchema);
exports.default = customLinkModel;
