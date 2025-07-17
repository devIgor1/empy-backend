"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulatePayment = simulatePayment;
let step = 0;
function simulatePayment() {
    const flow = [
        "PAID", // 1. Standard
        "DECLINED_NO_LIMIT", // 2. Pro
        "PAID", // 3. Pro
        "NOT_AUTHORIZED", // 4. Standard
        "PAID", // 5. Standard
    ];
    const status = flow[step] || "PAID";
    step++;
    return status;
}
