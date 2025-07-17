"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatusMessage = void 0;
const getStatusMessage = (status) => {
    switch (status) {
        case "PAID":
            return "Pagamento aprovado com sucesso!";
        case "DECLINED_NO_LIMIT":
            return "Pagamento recusado por falta de limite no cartão.";
        case "NOT_AUTHORIZED":
            return "Pagamento não autorizado pelo emissor.";
        default:
            return "Ocorreu um erro no pagamento.";
    }
};
exports.getStatusMessage = getStatusMessage;
