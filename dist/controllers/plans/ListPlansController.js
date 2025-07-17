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
exports.ListPlansController = void 0;
const ListPlansService_1 = require("../../services/plans/ListPlansService");
class ListPlansController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listPlansService = new ListPlansService_1.ListPlansService();
            const plans = yield listPlansService.execute();
            return res.json(plans);
        });
    }
}
exports.ListPlansController = ListPlansController;
