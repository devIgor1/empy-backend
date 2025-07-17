"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomPlanSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.CreateCustomPlanSchema = zod_1.default.object({
    basePlanId: zod_1.default.literal("2"),
    namePublic: zod_1.default.string(),
    nameInternal: zod_1.default.string().optional(),
    discount: zod_1.default.number().min(0).max(100).optional(),
    monthlyPrice: zod_1.default.number(),
    annualPrice: zod_1.default.number(),
});
