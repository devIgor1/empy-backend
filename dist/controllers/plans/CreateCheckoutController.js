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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCheckoutController = void 0;
const CreateCheckoutService_1 = require("../../services/plans/CreateCheckoutService");
const statusCheckoutMessage_1 = require("../../utils/statusCheckoutMessage");
class CreateCheckoutController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { planId, cycle } = req.params;
            const { namePublic, monthlyPrice, annualPrice, cardNumber } = req.body;
            const validFakeCard = "4111 1111 1111 1111";
            if (cardNumber !== validFakeCard) {
                return res.status(400).json({
                    success: false,
                    error: "Atenção: o cartão fornecido é inválido.",
                });
            }
            const amount = cycle === "mensal" ? monthlyPrice : annualPrice;
            const billingCycle = cycle === "mensal" ? "MONTHLY" : "ANNUAL";
            const service = new CreateCheckoutService_1.CreatePurchaseService();
            const purchase = yield service.execute({
                planId,
                amount,
                billingCycle,
                customerName: namePublic,
            });
            const success = purchase.status === "PAID";
            const message = (0, statusCheckoutMessage_1.getStatusMessage)(purchase.status);
            return res.status(201).json({
                success,
                status: purchase.status,
                message,
                data: purchase,
            });
        });
    }
}
exports.CreateCheckoutController = CreateCheckoutController;
