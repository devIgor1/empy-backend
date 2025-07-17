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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomPlanService = void 0;
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
const frontendBaseUrl = (_a = process.env.FRONTEND_BASE_URL) !== null && _a !== void 0 ? _a : "http://localhost:5173";
class CreateCustomPlanService {
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const basePlan = yield prisma.plan.findUnique({
                where: { id: data.basePlanId },
            });
            if (!basePlan) {
                throw new Error("Plano base não encontrado");
            }
            const id = (0, uuid_1.v4)();
            const newPlan = yield prisma.plan.create({
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
