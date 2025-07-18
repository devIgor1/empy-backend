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
exports.GetCurrentPlanController = void 0;
const GetSignedPlanService_1 = require("../../services/plans/GetSignedPlanService");
class GetCurrentPlanController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customerId = "local-user";
                const service = new GetSignedPlanService_1.GetSignedPlanService();
                const currentPlan = yield service.execute(customerId);
                return res.status(200).json(currentPlan);
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(404).json({ error: error.message });
                }
                console.error(error);
                return res.status(500).json({ error: "Erro interno ao buscar plano" });
            }
        });
    }
}
exports.GetCurrentPlanController = GetCurrentPlanController;
