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
exports.CreatePurchaseService = void 0;
const uuid_1 = require("uuid");
const paymentSimulator_1 = require("../../utils/paymentSimulator");
const prisma_1 = __importDefault(require("../../prisma"));
class CreatePurchaseService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ planId, amount, billingCycle, customerName, }) {
            const status = (0, paymentSimulator_1.simulatePayment)();
            const newPurchase = {
                id: (0, uuid_1.v4)(),
                customerId: "local-user",
                customerName,
                planId,
                amount,
                billingCycle,
                status,
                createdAt: new Date(),
            };
            yield prisma_1.default.purchase.create({
                data: newPurchase,
            });
            return newPurchase;
        });
    }
}
exports.CreatePurchaseService = CreatePurchaseService;
