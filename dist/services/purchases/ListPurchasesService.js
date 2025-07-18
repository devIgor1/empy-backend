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
exports.ListPurchasesService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListPurchasesService {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const purchases = yield prisma_1.default.purchase.findMany({
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    createdAt: true,
                    plan: {
                        select: { publicName: true },
                    },
                    amount: true,
                    status: true,
                },
            });
            return purchases;
        });
    }
}
exports.ListPurchasesService = ListPurchasesService;
