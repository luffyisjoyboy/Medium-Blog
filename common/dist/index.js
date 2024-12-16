"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInput = exports.createBlogInput = exports.singinInput = exports.singupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.singupInput = zod_1.default.object({
    email: zod_1.default.string(),
    password: zod_1.default.string(),
    name: zod_1.default.string().optional()
});
exports.singinInput = zod_1.default.object({
    email: zod_1.default.string(),
    password: zod_1.default.string(),
});
exports.createBlogInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string()
});
exports.updateBlogInput = zod_1.default.object({
    id: zod_1.default.string(),
    title: zod_1.default.string(),
    content: zod_1.default.string()
});
