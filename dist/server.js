"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_express2 = __toESM(require("express"));

// src/routes/index.ts
var import_express = require("express");

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/plans/ListPlansService.ts
var ListPlansService = class {
  async execute() {
    const plans = await prisma_default.plan.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        monthlyPrice: "asc"
      }
    });
    return plans;
  }
};

// src/controllers/plans/ListPlansController.ts
var ListPlansController = class {
  async handle(req, res) {
    const listPlansService = new ListPlansService();
    const plans = await listPlansService.execute();
    return res.json(plans);
  }
};

// src/services/plans/CreateCustomPlanService.ts
var import_uuid = require("uuid");
var frontendBaseUrl = process.env.FRONTEND_BASE_URL ?? "http://localhost:5173";
var CreateCustomPlanService = class {
  async execute(data) {
    const basePlan = await prisma_default.plan.findUnique({
      where: { id: data.basePlanId }
    });
    if (!basePlan) {
      throw new Error("Plano base n\xE3o encontrado");
    }
    const id = (0, import_uuid.v4)();
    const newPlan = await prisma_default.plan.create({
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
        paymentLink: `${frontendBaseUrl}/?custom=${id}`
      }
    });
    return newPlan;
  }
};

// src/controllers/plans/CreateCustomPlanController.ts
var CreateCustomPlanController = class {
  async handle(req, res) {
    try {
      const {
        basePlanId,
        namePublic,
        nameInternal,
        monthlyPrice,
        annualPrice,
        discount
      } = req.body;
      const service = new CreateCustomPlanService();
      const plan = await service.execute({
        basePlanId,
        namePublic,
        nameInternal,
        monthlyPrice,
        annualPrice,
        discount
      });
      return res.status(201).json(plan);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};

// src/services/plans/CreateCheckoutService.ts
var import_uuid2 = require("uuid");

// src/utils/paymentSimulator.ts
var step = 0;
function simulatePayment() {
  const flow = [
    "PAID",
    // 1. Standard
    "DECLINED_NO_LIMIT",
    // 2. Pro
    "PAID",
    // 3. Pro
    "NOT_AUTHORIZED",
    // 4. Standard
    "PAID"
    // 5. Standard
  ];
  const status = flow[step] || "PAID";
  step++;
  return status;
}

// src/services/plans/CreateCheckoutService.ts
var CreatePurchaseService = class {
  async execute({
    planId,
    amount,
    billingCycle,
    customerName
  }) {
    const status = simulatePayment();
    const newPurchase = {
      id: (0, import_uuid2.v4)(),
      customerId: "local-user",
      customerName,
      planId,
      amount,
      billingCycle,
      status,
      createdAt: /* @__PURE__ */ new Date()
    };
    await prisma_default.purchase.create({
      data: newPurchase
    });
    return newPurchase;
  }
};

// src/utils/statusCheckoutMessage.ts
var getStatusMessage = (status) => {
  switch (status) {
    case "PAID":
      return "Pagamento aprovado com sucesso!";
    case "DECLINED_NO_LIMIT":
      return "Pagamento recusado por falta de limite no cart\xE3o.";
    case "NOT_AUTHORIZED":
      return "Pagamento n\xE3o autorizado pelo emissor.";
    default:
      return "Ocorreu um erro no pagamento.";
  }
};

// src/controllers/plans/CreateCheckoutController.ts
var CreateCheckoutController = class {
  async handle(req, res) {
    const { planId, cycle } = req.params;
    const { namePublic, monthlyPrice, annualPrice, cardNumber } = req.body;
    const validFakeCard = "4111 1111 1111 1111";
    if (cardNumber !== validFakeCard) {
      return res.status(400).json({
        success: false,
        error: "Aten\xE7\xE3o: o cart\xE3o fornecido \xE9 inv\xE1lido."
      });
    }
    const amount = cycle === "mensal" ? monthlyPrice : annualPrice;
    const billingCycle = cycle === "mensal" ? "MONTHLY" : "ANNUAL";
    const service = new CreatePurchaseService();
    const purchase = await service.execute({
      planId,
      amount,
      billingCycle,
      customerName: namePublic
    });
    const success = purchase.status === "PAID";
    const message = getStatusMessage(purchase.status);
    return res.status(201).json({
      success,
      status: purchase.status,
      message,
      data: purchase
    });
  }
};

// src/services/plans/GetPlanByIdService.ts
var GetPlanByIdService = class {
  async execute(id) {
    const plan = await prisma_default.plan.findUnique({
      where: { id }
    });
    return plan;
  }
};

// src/controllers/plans/GetPlanByIdController.ts
var GetPlanByIdController = class {
  async handle(req, res) {
    const { id } = req.params;
    const service = new GetPlanByIdService();
    const plan = await service.execute(id);
    if (!plan) {
      return res.status(404).json({ error: "Plano n\xE3o encontrado" });
    }
    return res.json(plan);
  }
};

// src/services/plans/GetSignedPlanService.ts
var GetSignedPlanService = class {
  async execute(customerId) {
    const purchase = await prisma_default.purchase.findFirst({
      where: { customerId },
      orderBy: { createdAt: "desc" },
      include: { plan: true }
    });
    if (!purchase) {
      throw new Error("Nenhum plano encontrado.");
    }
    return purchase;
  }
};

// src/controllers/plans/GetCurrentPlanController.ts
var GetCurrentPlanController = class {
  async handle(req, res) {
    try {
      const customerId = "local-user";
      const service = new GetSignedPlanService();
      const currentPlan = await service.execute(customerId);
      return res.status(200).json(currentPlan);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message });
      }
      console.error(error);
      return res.status(500).json({ error: "Erro interno ao buscar plano" });
    }
  }
};

// src/services/purchases/ListPurchasesService.ts
var ListPurchasesService = class {
  async execute() {
    const purchases = await prisma_default.purchase.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        createdAt: true,
        plan: {
          select: { publicName: true }
        },
        amount: true,
        status: true
      }
    });
    return purchases;
  }
};

// src/controllers/purchases/ListPurchasesController.ts
var GetAllPurchasesController = class {
  async handle(req, res) {
    const service = new ListPurchasesService();
    const purchases = await service.execute();
    return res.json(purchases);
  }
};

// src/routes/index.ts
var router = (0, import_express.Router)();
router.get("/plans", new ListPlansController().handle);
router.get("/plans/:id", new GetPlanByIdController().handle);
router.post("/plans/custom", new CreateCustomPlanController().handle);
router.post("/checkout/:planId/:cycle", new CreateCheckoutController().handle);
router.get("/my-plan", new GetCurrentPlanController().handle);
router.get("/purchases", new GetAllPurchasesController().handle);

// src/server.ts
var import_cors = __toESM(require("cors"));
var app = (0, import_express2.default)();
app.use(import_express2.default.json());
app.use((0, import_cors.default)());
app.use(router);
app.use((err, req, res, next) => {
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message });
  }
  return res.status(500).json({ message: "Internal Server Error" });
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
