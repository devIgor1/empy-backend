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
const index_1 = __importDefault(require("./index"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const frontendBaseUrl = (_a = process.env.FRONTEND_BASE_URL) !== null && _a !== void 0 ? _a : "http://localhost:5173";
        const discountRate = 2 / 12; // 16,67%
        const plans = [
            {
                id: "1",
                publicName: "Light",
                monthlyPrice: 157.0,
                offlineCredits: 2,
                onlineCredits: "20",
                isRecommended: false,
            },
            {
                id: "2",
                publicName: "Standard",
                monthlyPrice: 249.5,
                offlineCredits: 10,
                onlineCredits: "30",
                isRecommended: true,
            },
            {
                id: "3",
                publicName: "Pro",
                monthlyPrice: 347.0,
                offlineCredits: 30,
                onlineCredits: "UNLIMITED",
                isRecommended: false,
            },
        ];
        for (const plan of plans) {
            const annualPrice = +(plan.monthlyPrice * 12 * (1 - discountRate)).toFixed(2);
            yield index_1.default.plan.create({
                data: {
                    id: plan.id,
                    publicName: plan.publicName,
                    internalName: plan.publicName.toLowerCase(),
                    monthlyPrice: plan.monthlyPrice,
                    annualPrice,
                    discount: Number((discountRate * 100).toFixed(2)),
                    isCustom: false,
                    offlineCredits: plan.offlineCredits,
                    onlineCredits: plan.onlineCredits,
                    isActive: true,
                    isRecommended: plan.isRecommended,
                    paymentLink: `${frontendBaseUrl}/?custom=${plan.id}`,
                },
            });
        }
        console.log("Seed completed!");
    });
}
seed()
    .catch((err) => console.error("Seed failed", err))
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield index_1.default.$disconnect();
}));
