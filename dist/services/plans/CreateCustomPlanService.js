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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomPlanService = void 0;
const uuid_1 = require("uuid");
const prisma_1 = __importDefault(require("../../prisma"));
const frontendBaseUrl = (_a = process.env.FRONTEND_BASE_URL) !== null && _a !== void 0 ? _a : "http://localhost:5173";
class CreateCustomPlanService {
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const basePlan = yield prisma_1.default.plan.findUnique({
                where: { id: data.basePlanId },
            });
            if (!basePlan) {
                throw new Error("Plano base não encontrado");
            }
            const id = (0, uuid_1.v4)();
            const newPlan = yield prisma_1.default.plan.create({
                data: {
                    id,
                    publicName: data.namePublic,
                    internalName: data.nameInternal,
                    monthlyPrice: data.monthlyPrice,
                    annualPrice: data.annualPrice,
                    discount: data.discount,
                    isCustom: true,
                    isActive: true,
                    isRecommended: false,
                    offlineCredits: basePlan.offlineCredits,
                    onlineCredits: basePlan.onlineCredits,
                    paymentLink: `${frontendBaseUrl}/?custom=${id}`,
                },
            });
            return newPlan;
        });
    }
}
exports.CreateCustomPlanService = CreateCustomPlanService;
