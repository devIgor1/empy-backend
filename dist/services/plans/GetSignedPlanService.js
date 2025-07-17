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
exports.GetSignedPlanService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetSignedPlanService {
    execute(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const purchase = yield prisma_1.default.purchase.findFirst({
                where: { customerId },
                orderBy: { createdAt: "desc" },
                include: { plan: true },
            });
            if (!purchase) {
                throw new Error("Nenhum plano encontrado.");
            }
            return purchase;
        });
    }
}
exports.GetSignedPlanService = GetSignedPlanService;
